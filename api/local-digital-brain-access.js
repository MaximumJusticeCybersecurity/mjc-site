const { createHmac } = require('node:crypto');

const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_PROVIDER_TIMEOUT_MS = 8_000;
const DEFAULT_ACCESS_TTL_DAYS = 30;
const MAX_BODY_BYTES = 2_048;
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RATE_BUCKETS = new Map();

function setJsonHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  setJsonHeaders(res);
  for (const [name, value] of Object.entries(extraHeaders)) {
    res.setHeader(name, String(value));
  }
  res.statusCode = statusCode;
  const body = JSON.stringify(payload);
  if (typeof res.json === 'function') return res.json(payload);
  return res.end(body);
}

function readHeader(req, name) {
  const lower = name.toLowerCase();
  if (typeof req.get === 'function') return req.get(name) || '';
  const headers = req.headers || {};
  const value = headers[lower] ?? headers[name] ?? '';
  return Array.isArray(value) ? value[0] || '' : String(value || '');
}

function parsePositiveInteger(value, fallback, maximum) {
  const parsed = Number.parseInt(String(value || ''), 10);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > maximum) return fallback;
  return parsed;
}

function parseRequestBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    const serialized = JSON.stringify(req.body);
    if (Buffer.byteLength(serialized, 'utf8') > MAX_BODY_BYTES) {
      return { error: 'REQUEST_TOO_LARGE' };
    }
    return { value: req.body };
  }

  const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body || '');
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) return { error: 'REQUEST_TOO_LARGE' };
  try {
    return { value: raw ? JSON.parse(raw) : {} };
  } catch {
    return { error: 'INVALID_JSON' };
  }
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function isValidEmail(value) {
  const email = normalizeEmail(value);
  if (!email || email.length > 254 || /\s/.test(email)) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || !domain || domain.length > 253) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)) return false;
  const labels = domain.split('.');
  if (labels.length < 2) return false;
  return labels.every((label) => (
    label.length > 0 &&
    label.length <= 63 &&
    /^[a-z0-9-]+$/i.test(label) &&
    !label.startsWith('-') &&
    !label.endsWith('-')
  ));
}

function allowedOrigins(env = process.env) {
  const configured = String(env.LOCAL_DIGITAL_BRAIN_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const defaults = [
    'https://app.maximumjusticecybersecurity.com',
    'https://maximumjusticecybersecurity.com',
    'https://www.maximumjusticecybersecurity.com'
  ];
  if (env.VERCEL_URL) defaults.push(`https://${env.VERCEL_URL}`);
  return new Set([...defaults, ...configured]);
}

function isAllowedOrigin(origin, env = process.env) {
  if (!origin) return false;
  try {
    return allowedOrigins(env).has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function clientAddress(req) {
  const vercelForwarded = readHeader(req, 'x-vercel-forwarded-for').split(',')[0].trim();
  const forwarded = readHeader(req, 'x-forwarded-for').split(',')[0].trim();
  return vercelForwarded || forwarded || req.socket?.remoteAddress || 'unknown';
}

function pruneRateBuckets(now) {
  if (RATE_BUCKETS.size < 1_000) return;
  for (const [key, bucket] of RATE_BUCKETS) {
    if (bucket.resetAt <= now) RATE_BUCKETS.delete(key);
  }
  while (RATE_BUCKETS.size > 5_000) {
    RATE_BUCKETS.delete(RATE_BUCKETS.keys().next().value);
  }
}

function consumeRateLimit(key, now, env = process.env) {
  const maximum = parsePositiveInteger(
    env.LOCAL_DIGITAL_BRAIN_RATE_LIMIT_MAX,
    DEFAULT_RATE_LIMIT_MAX,
    100
  );
  const windowMs = parsePositiveInteger(
    env.LOCAL_DIGITAL_BRAIN_RATE_LIMIT_WINDOW_MS,
    DEFAULT_RATE_LIMIT_WINDOW_MS,
    24 * 60 * 60 * 1000
  );

  pruneRateBuckets(now);
  const current = RATE_BUCKETS.get(key);
  if (!current || current.resetAt <= now) {
    RATE_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maximum - 1, retryAfterSeconds: 0 };
  }
  if (current.count >= maximum) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    };
  }
  current.count += 1;
  return { allowed: true, remaining: maximum - current.count, retryAfterSeconds: 0 };
}

function requiredConfiguration(env = process.env) {
  const keys = [
    'RESEND_API_KEY',
    'LOCAL_DIGITAL_BRAIN_LEAD_TO',
    'LOCAL_DIGITAL_BRAIN_LEAD_FROM',
    'LOCAL_DIGITAL_BRAIN_IDEMPOTENCY_SALT'
  ];
  return keys.filter((key) => !String(env[key] || '').trim());
}

function dayKey(now) {
  return new Date(now).toISOString().slice(0, 10);
}

function idempotencyKey(email, now, env = process.env) {
  const digest = createHmac('sha256', env.LOCAL_DIGITAL_BRAIN_IDEMPOTENCY_SALT)
    .update(`${dayKey(now)}\n${email}`, 'utf8')
    .digest('hex');
  return `local-digital-brain/${dayKey(now)}/${digest}`;
}

function leadMessage(email, capturedDate) {
  return [
    'New Local Digital Brain Starter Guide access request',
    '',
    `Email: ${email}`,
    `Captured date (UTC): ${capturedDate}`,
    'Source: local-digital-brain-guide',
    '',
    'Purpose: provide guide access and understand guide usage.'
  ].join('\n');
}

async function deliverLead(email, now, env = process.env, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== 'function') throw new Error('FETCH_UNAVAILABLE');
  const timeoutMs = parsePositiveInteger(
    env.LOCAL_DIGITAL_BRAIN_PROVIDER_TIMEOUT_MS,
    DEFAULT_PROVIDER_TIMEOUT_MS,
    30_000
  );
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey(email, now, env)
      },
      body: JSON.stringify({
        from: env.LOCAL_DIGITAL_BRAIN_LEAD_FROM,
        to: [env.LOCAL_DIGITAL_BRAIN_LEAD_TO],
        subject: 'Local Digital Brain guide access request',
        text: leadMessage(email, dayKey(now))
      }),
      signal: controller.signal
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.id) {
      const error = new Error('LEAD_DELIVERY_FAILED');
      error.status = response.status;
      throw error;
    }
    return { provider: 'resend', receiptId: String(payload.id) };
  } finally {
    clearTimeout(timer);
  }
}

async function handler(req, res) {
  const now = Date.now();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED' });
  }

  const contentType = readHeader(req, 'content-type').toLowerCase();
  if (!contentType.includes('application/json')) {
    return sendJson(res, 415, { ok: false, code: 'JSON_REQUIRED' });
  }

  if (!isAllowedOrigin(readHeader(req, 'origin'))) {
    return sendJson(res, 403, { ok: false, code: 'ORIGIN_NOT_ALLOWED' });
  }

  const parsed = parseRequestBody(req);
  if (parsed.error) {
    const status = parsed.error === 'REQUEST_TOO_LARGE' ? 413 : 400;
    return sendJson(res, status, { ok: false, code: parsed.error });
  }

  const honeypot = String(parsed.value.website || '').trim();
  if (honeypot) {
    return sendJson(res, 422, { ok: false, code: 'AUTOMATED_SUBMISSION_REJECTED' });
  }

  const email = normalizeEmail(parsed.value.email);
  if (!isValidEmail(email)) {
    return sendJson(res, 422, { ok: false, code: 'INVALID_EMAIL' });
  }

  const rate = consumeRateLimit(clientAddress(req), now);
  res.setHeader('X-RateLimit-Remaining', String(rate.remaining));
  if (!rate.allowed) {
    return sendJson(
      res,
      429,
      { ok: false, code: 'RATE_LIMITED' },
      { 'Retry-After': rate.retryAfterSeconds }
    );
  }

  if (requiredConfiguration().length > 0) {
    return sendJson(res, 503, { ok: false, code: 'LEAD_DESTINATION_UNAVAILABLE' });
  }

  try {
    const receipt = await deliverLead(email, now);
    const ttlDays = parsePositiveInteger(
      process.env.LOCAL_DIGITAL_BRAIN_ACCESS_TTL_DAYS,
      DEFAULT_ACCESS_TTL_DAYS,
      365
    );
    return sendJson(res, 200, {
      ok: true,
      code: 'ACCESS_GRANTED',
      accessExpiresAt: new Date(now + ttlDays * 24 * 60 * 60 * 1000).toISOString(),
      receipt: { provider: receipt.provider, id: receipt.receiptId }
    });
  } catch (error) {
    const code = error?.name === 'AbortError' ? 'LEAD_DESTINATION_TIMEOUT' : 'LEAD_DELIVERY_FAILED';
    return sendJson(res, 502, { ok: false, code });
  }
}

module.exports = handler;
module.exports._test = {
  allowedOrigins,
  consumeRateLimit,
  deliverLead,
  idempotencyKey,
  isAllowedOrigin,
  isValidEmail,
  normalizeEmail,
  parseRequestBody,
  requiredConfiguration,
  resetRateLimits() {
    RATE_BUCKETS.clear();
  }
};
