const { CHEFS, OPEN_AT, CLOSE_AT, MAX_BALLOTS, cleanName, contestState, validEmail, normalizeEmail, readResults, submitBallot, configuration } = require('./_top-chef-store');

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  return res.end(JSON.stringify(body));
}

function originAllowed(req) {
  const origin = String(req.headers?.origin || '');
  const allowed = new Set(['https://app.maximumjusticecybersecurity.com']);
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  return allowed.has(origin);
}

function bodyOf(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body || '');
  if (Buffer.byteLength(raw, 'utf8') > 4096) throw new Error('BODY_TOO_LARGE');
  return raw ? JSON.parse(raw) : {};
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED' });
  }
  if (!originAllowed(req)) return send(res, 403, { ok: false, code: 'ORIGIN_NOT_ALLOWED' });
  if (!configuration().ready) return send(res, 503, { ok: false, code: 'STORE_NOT_CONFIGURED' });

  try {
    const now = Date.now();
    const current = await readResults();
    const state = contestState(now, current.ballots);
    if (state !== 'open') return send(res, 409, { ok: false, code: state.toUpperCase().replaceAll('-', '_'), state });

    const body = bodyOf(req);
    if (String(body.website || '').trim()) return send(res, 422, { ok: false, code: 'AUTOMATED_SUBMISSION_REJECTED' });
    const name = cleanName(body.name);
    const email = normalizeEmail(body.email);
    if (name.length < 2) return send(res, 422, { ok: false, code: 'INVALID_NAME' });
    if (!validEmail(email)) return send(res, 422, { ok: false, code: 'INVALID_EMAIL' });

    const ratings = body.ratings || {};
    for (const chef of CHEFS) {
      if (!Number.isInteger(ratings[chef.id]) || ratings[chef.id] < 1 || ratings[chef.id] > 5) {
        return send(res, 422, { ok: false, code: 'ALL_RATINGS_REQUIRED' });
      }
    }

    const result = await submitBallot({ name, email, deviceId: String(body.deviceId || ''), ratings });
    const status = Array.isArray(result) ? String(result[0]) : 'ERROR';
    const ballots = Array.isArray(result) ? Number(result[1] || 0) : current.ballots;
    if (status === 'DUPLICATE_EMAIL' || status === 'DUPLICATE_DEVICE') return send(res, 409, { ok: false, code: 'ALREADY_VOTED' });
    if (status === 'FULL') return send(res, 409, { ok: false, code: 'CLOSED_FULL', ballots, maxBallots: MAX_BALLOTS });
    if (status !== 'OK') return send(res, 503, { ok: false, code: 'VOTE_NOT_RECORDED' });

    return send(res, 201, {
      ok: true,
      code: 'VOTE_RECORDED',
      ballots,
      maxBallots: MAX_BALLOTS,
      closesAt: new Date(CLOSE_AT).toISOString(),
      opensAt: new Date(OPEN_AT).toISOString()
    });
  } catch (error) {
    const code = error?.message === 'BODY_TOO_LARGE' ? 'REQUEST_TOO_LARGE' : 'VOTE_NOT_RECORDED';
    return send(res, code === 'REQUEST_TOO_LARGE' ? 413 : 503, { ok: false, code });
  }
};
