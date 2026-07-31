const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../api/local-digital-brain-access.js');
const { resetRateLimits } = handler._test;

const ORIGINAL_ENV = { ...process.env };
const ORIGINAL_FETCH = global.fetch;

function syntheticEmail() {
  return ['reader', 'example.test'].join('@');
}

function applyEnvironment(overrides = {}) {
  Object.assign(process.env, {
    RESEND_API_KEY: 'test-key',
    LOCAL_DIGITAL_BRAIN_LEAD_TO: ['guide-access', 'example.test'].join('@'),
    LOCAL_DIGITAL_BRAIN_LEAD_FROM: ['MJC Guide <guide', 'example.test>'].join('@'),
    LOCAL_DIGITAL_BRAIN_IDEMPOTENCY_SALT: 'test-only-idempotency-salt',
    LOCAL_DIGITAL_BRAIN_ALLOWED_ORIGINS: 'https://preview.example.test',
    LOCAL_DIGITAL_BRAIN_RATE_LIMIT_MAX: '5',
    LOCAL_DIGITAL_BRAIN_RATE_LIMIT_WINDOW_MS: '600000',
    LOCAL_DIGITAL_BRAIN_PROVIDER_TIMEOUT_MS: '1000',
    LOCAL_DIGITAL_BRAIN_ACCESS_TTL_DAYS: '30',
    ...overrides
  });
}

function request(body, overrides = {}) {
  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://preview.example.test',
      'x-forwarded-for': overrides.address || '192.0.2.10',
      ...(overrides.headers || {})
    },
    body,
    socket: { remoteAddress: overrides.address || '192.0.2.10' },
    ...overrides.request
  };
}

function response() {
  const headers = new Map();
  let payload;
  return {
    statusCode: 200,
    setHeader(name, value) { headers.set(name.toLowerCase(), String(value)); },
    getHeader(name) { return headers.get(name.toLowerCase()); },
    end(value) { payload = JSON.parse(value); },
    json(value) { payload = value; return value; },
    result() { return { statusCode: this.statusCode, headers, payload }; }
  };
}

async function invoke(body, overrides = {}) {
  const res = response();
  await handler(request(body, overrides), res);
  return res.result();
}

test.beforeEach(() => {
  resetRateLimits();
  applyEnvironment();
  global.fetch = async () => ({ ok: true, status: 200, json: async () => ({ id: 'receipt-test-001' }) });
});

test.afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
  global.fetch = ORIGINAL_FETCH;
  resetRateLimits();
});

test('rejects empty and malformed email values with accessible client-safe codes', async () => {
  for (const value of ['', 'missing-domain', 'person@localhost', 'person @example.test']) {
    const result = await invoke({ email: value, website: '' });
    assert.equal(result.statusCode, 422);
    assert.deepEqual(result.payload, { ok: false, code: 'INVALID_EMAIL' });
  }
});

test('delivers a valid lead before returning a bounded unlock expiration', async () => {
  let providerRequest;
  global.fetch = async (url, options) => {
    providerRequest = { url, options };
    return { ok: true, status: 200, json: async () => ({ id: 'receipt-test-002' }) };
  };
  const email = syntheticEmail();
  const result = await invoke({ email, website: '' });
  assert.equal(result.statusCode, 200);
  assert.equal(result.payload.ok, true);
  assert.equal(result.payload.code, 'ACCESS_GRANTED');
  assert.ok(Date.parse(result.payload.accessExpiresAt) > Date.now());
  assert.deepEqual(result.payload.receipt, { provider: 'resend', id: 'receipt-test-002' });
  assert.equal(providerRequest.url, 'https://api.resend.com/emails');
  assert.match(providerRequest.options.headers.Authorization, /^Bearer /);
  assert.match(providerRequest.options.headers['Idempotency-Key'], /^local-digital-brain\//);
  assert.equal(JSON.parse(providerRequest.options.body).text.includes(email), true);
  assert.equal(JSON.stringify(result.payload).includes(email), false);
});

test('does not grant access when the provider rejects delivery', async () => {
  global.fetch = async () => ({ ok: false, status: 503, json: async () => ({ message: 'unavailable' }) });
  const result = await invoke({ email: syntheticEmail(), website: '' });
  assert.equal(result.statusCode, 502);
  assert.deepEqual(result.payload, { ok: false, code: 'LEAD_DELIVERY_FAILED' });
});

test('fails visibly on provider timeout', async () => {
  applyEnvironment({ LOCAL_DIGITAL_BRAIN_PROVIDER_TIMEOUT_MS: '5' });
  global.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => {
      const error = new Error('aborted');
      error.name = 'AbortError';
      reject(error);
    });
  });
  const result = await invoke({ email: syntheticEmail(), website: '' });
  assert.equal(result.statusCode, 502);
  assert.deepEqual(result.payload, { ok: false, code: 'LEAD_DESTINATION_TIMEOUT' });
});

test('uses the same provider idempotency key and payload for duplicate same-day submissions', async () => {
  const keys = [];
  const bodies = [];
  global.fetch = async (_url, options) => {
    keys.push(options.headers['Idempotency-Key']);
    bodies.push(options.body);
    return { ok: true, status: 200, json: async () => ({ id: 'receipt-test-duplicate' }) };
  };
  const first = await invoke({ email: syntheticEmail(), website: '' }, { address: '192.0.2.20' });
  const second = await invoke({ email: syntheticEmail(), website: '' }, { address: '192.0.2.20' });
  assert.equal(first.statusCode, 200);
  assert.equal(second.statusCode, 200);
  assert.equal(keys.length, 2);
  assert.equal(keys[0], keys[1]);
  assert.equal(bodies[0], bodies[1]);
});

test('rate limits repeated submissions before provider delivery', async () => {
  applyEnvironment({ LOCAL_DIGITAL_BRAIN_RATE_LIMIT_MAX: '2' });
  let deliveries = 0;
  global.fetch = async () => {
    deliveries += 1;
    return { ok: true, status: 200, json: async () => ({ id: `receipt-${deliveries}` }) };
  };
  assert.equal((await invoke({ email: syntheticEmail(), website: '' }, { address: '192.0.2.30' })).statusCode, 200);
  assert.equal((await invoke({ email: syntheticEmail(), website: '' }, { address: '192.0.2.30' })).statusCode, 200);
  const limited = await invoke({ email: syntheticEmail(), website: '' }, { address: '192.0.2.30' });
  assert.equal(limited.statusCode, 429);
  assert.equal(limited.payload.code, 'RATE_LIMITED');
  assert.ok(Number(limited.headers.get('retry-after')) >= 1);
  assert.equal(deliveries, 2);
});

test('rejects honeypot submissions without contacting the provider', async () => {
  let called = false;
  global.fetch = async () => { called = true; throw new Error('unexpected'); };
  const result = await invoke({ email: syntheticEmail(), website: 'bot-filled' });
  assert.equal(result.statusCode, 422);
  assert.equal(result.payload.code, 'AUTOMATED_SUBMISSION_REJECTED');
  assert.equal(called, false);
});

test('rejects unapproved origins and missing provider configuration', async () => {
  const originRejected = await invoke(
    { email: syntheticEmail(), website: '' },
    { headers: { origin: 'https://unapproved.example.test' } }
  );
  assert.equal(originRejected.statusCode, 403);
  assert.equal(originRejected.payload.code, 'ORIGIN_NOT_ALLOWED');

  delete process.env.RESEND_API_KEY;
  const unavailable = await invoke({ email: syntheticEmail(), website: '' }, { address: '192.0.2.41' });
  assert.equal(unavailable.statusCode, 503);
  assert.equal(unavailable.payload.code, 'LEAD_DESTINATION_UNAVAILABLE');
});

test('rejects non-JSON and non-POST requests', async () => {
  const nonJson = response();
  await handler(request({ email: syntheticEmail() }, { headers: { 'content-type': 'text/plain' } }), nonJson);
  assert.equal(nonJson.result().statusCode, 415);

  const getResponse = response();
  await handler({ ...request({}), method: 'GET' }, getResponse);
  assert.equal(getResponse.result().statusCode, 405);
  assert.equal(getResponse.getHeader('allow'), 'POST');
});
