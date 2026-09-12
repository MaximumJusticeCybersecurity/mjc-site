const { createHash, createHmac, createCipheriv, randomBytes } = require('node:crypto');

const OPEN_AT = Date.parse('2026-09-12T17:05:00-04:00');
const CLOSE_AT = Date.parse('2026-09-12T18:55:00-04:00');
const MAX_BALLOTS = 1000;
const CHEFS = [
  { id: 'marlon', name: 'Chef Marlon', dish: 'Oyster Tempura and Rice' },
  { id: 'kei', name: 'Chef Kei', dish: 'Pulled Mushrooms, Fries, and Mushroom Deviled Eggs' },
  { id: 'austin', name: 'Chef Austin', dish: "Hunan-Style Fried Lion's Mane and Shiitake Skewers over Shiitake Fried Rice" },
  { id: 'cameron', name: 'Chef Cameron', dish: "Lion's Mane Katsu with Miso Honey, Sweet Corn, and Sesame Scallion Rice" }
];

function configuration(env = process.env) {
  const url = String(env.TOP_CHEF_REDIS_REST_URL || env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL || '').replace(/\/$/, '');
  const token = String(env.TOP_CHEF_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN || '');
  const secret = String(env.TOP_CHEF_PII_SECRET || env.TOP_CHEF_VOTE_SALT || '');
  return { url, token, secret, ready: Boolean(url && token && secret) };
}

function contestState(now = Date.now(), ballots = 0) {
  if (ballots >= MAX_BALLOTS) return 'closed-full';
  if (now < OPEN_AT) return 'not-open';
  if (now >= CLOSE_AT) return 'closed-time';
  return 'open';
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function validEmail(value) {
  const email = normalizeEmail(value);
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanName(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 100);
}

function voterHash(email, secret) {
  return createHmac('sha256', secret).update(normalizeEmail(email)).digest('hex');
}

function deviceHash(deviceId, secret) {
  if (!deviceId) return '';
  return createHmac('sha256', secret).update(String(deviceId).slice(0, 200)).digest('hex');
}

function encryptPii(payload, secret) {
  const key = createHash('sha256').update(secret).digest();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString('base64url');
}

async function redis(command, env = process.env) {
  const cfg = configuration(env);
  if (!cfg.ready) throw new Error('STORE_NOT_CONFIGURED');
  const response = await fetch(cfg.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(5000)
  });
  if (!response.ok) throw new Error(`STORE_HTTP_${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(`STORE_ERROR:${payload.error}`);
  return payload.result;
}

async function readResults(env = process.env) {
  const result = await redis(['HMGET', 'topchef:2026:results',
    'ballots',
    'marlon_stars','marlon_votes',
    'kei_stars','kei_votes',
    'austin_stars','austin_votes',
    'cameron_stars','cameron_votes'
  ], env);
  const n = (v) => Number.parseInt(v || '0', 10) || 0;
  const ballots = n(result?.[0]);
  const chefResults = CHEFS.map((chef, index) => {
    const stars = n(result?.[1 + index * 2]);
    const votes = n(result?.[2 + index * 2]);
    return { ...chef, stars, votes, average: votes ? Number((stars / votes).toFixed(2)) : 0 };
  });
  return { ballots, chefs: chefResults };
}

const VOTE_SCRIPT = `
local max = tonumber(ARGV[1])
local ballots = tonumber(redis.call('HGET', KEYS[1], 'ballots') or '0')
if ballots >= max then return {'FULL', tostring(ballots)} end
if redis.call('EXISTS', KEYS[2]) == 1 then return {'DUPLICATE_EMAIL', tostring(ballots)} end
if KEYS[3] ~= '-' and redis.call('EXISTS', KEYS[3]) == 1 then return {'DUPLICATE_DEVICE', tostring(ballots)} end
redis.call('SET', KEYS[2], '1', 'EX', 7776000)
if KEYS[3] ~= '-' then redis.call('SET', KEYS[3], '1', 'EX', 7776000) end
redis.call('HSET', KEYS[4], ARGV[2], ARGV[3])
redis.call('EXPIRE', KEYS[4], 7776000)
redis.call('HINCRBY', KEYS[1], 'ballots', 1)
redis.call('HINCRBY', KEYS[1], 'marlon_stars', tonumber(ARGV[4]))
redis.call('HINCRBY', KEYS[1], 'marlon_votes', 1)
redis.call('HINCRBY', KEYS[1], 'kei_stars', tonumber(ARGV[5]))
redis.call('HINCRBY', KEYS[1], 'kei_votes', 1)
redis.call('HINCRBY', KEYS[1], 'austin_stars', tonumber(ARGV[6]))
redis.call('HINCRBY', KEYS[1], 'austin_votes', 1)
redis.call('HINCRBY', KEYS[1], 'cameron_stars', tonumber(ARGV[7]))
redis.call('HINCRBY', KEYS[1], 'cameron_votes', 1)
return {'OK', tostring(ballots + 1)}
`;

async function submitBallot({ name, email, deviceId, ratings }, env = process.env) {
  const cfg = configuration(env);
  if (!cfg.ready) throw new Error('STORE_NOT_CONFIGURED');
  const vh = voterHash(email, cfg.secret);
  const dh = deviceHash(deviceId, cfg.secret);
  const encrypted = encryptPii({ name, email: normalizeEmail(email), submittedAt: new Date().toISOString() }, cfg.secret);
  const keys = ['topchef:2026:results', `topchef:2026:voter:${vh}`, dh ? `topchef:2026:device:${dh}` : '-', 'topchef:2026:pii'];
  const args = [String(MAX_BALLOTS), vh, encrypted, ...CHEFS.map((chef) => String(ratings[chef.id]))];
  return redis(['EVAL', VOTE_SCRIPT, '4', ...keys, ...args], env);
}

module.exports = {
  CHEFS, OPEN_AT, CLOSE_AT, MAX_BALLOTS,
  configuration, contestState, normalizeEmail, validEmail, cleanName, readResults, submitBallot
};
