const { readResults, contestState, OPEN_AT, CLOSE_AT, MAX_BALLOTS, configuration } = require('./_top-chef-store');

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  return res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED' });
  }
  if (!configuration().ready) return send(res, 503, { ok: false, code: 'STORE_NOT_CONFIGURED' });
  try {
    const results = await readResults();
    return send(res, 200, {
      ok: true,
      state: contestState(Date.now(), results.ballots),
      opensAt: new Date(OPEN_AT).toISOString(),
      closesAt: new Date(CLOSE_AT).toISOString(),
      maxBallots: MAX_BALLOTS,
      ...results
    });
  } catch {
    return send(res, 503, { ok: false, code: 'RESULTS_UNAVAILABLE' });
  }
};
