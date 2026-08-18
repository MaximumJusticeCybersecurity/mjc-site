import { mkdir, writeFile } from 'node:fs/promises';
import handlerModule from '../api/local-digital-brain-access.js';

const handler = handlerModule.default || handlerModule;
const email = ['evidence-reader', 'example.test'].join('@');
const syntheticProviderReceipt = 'synthetic-provider-receipt-001';
Object.assign(process.env, {
  RESEND_API_KEY: 'test-key',
  LOCAL_DIGITAL_BRAIN_LEAD_TO: ['guide-access', 'example.test'].join('@'),
  LOCAL_DIGITAL_BRAIN_LEAD_FROM: ['MJC Guide <guide', 'example.test>'].join('@'),
  LOCAL_DIGITAL_BRAIN_IDEMPOTENCY_SALT: 'test-only-idempotency-salt',
  LOCAL_DIGITAL_BRAIN_ALLOWED_ORIGINS: 'http://127.0.0.1:4173'
});

globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ id: syntheticProviderReceipt }) });
const req = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    origin: 'http://127.0.0.1:4173',
    'x-forwarded-for': '192.0.2.90'
  },
  body: { email, website: '' },
  socket: { remoteAddress: '192.0.2.90' }
};
let payload;
const headers = {};
const res = {
  statusCode: 200,
  setHeader(name, value) { headers[name] = String(value); },
  json(value) { payload = value; },
  end(value) { payload = JSON.parse(value); }
};
await handler(req, res);
const serializedResponse = JSON.stringify(payload);
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/local-digital-brain-capture-evidence.json', JSON.stringify({
  evidenceType: 'SYNTHETIC_PROVIDER_CONTRACT_TEST',
  submittedEmail: '[REDACTED]',
  accessGranted: res.statusCode === 200 && payload?.ok === true,
  responseContainsSubmittedEmail: serializedResponse.includes(email),
  responseContainsProviderReceipt: serializedResponse.includes(syntheticProviderReceipt),
  responseContainsProviderIdentity: serializedResponse.includes('resend'),
  liveProviderActivationRequiredBeforeRelease: true
}, null, 2));
