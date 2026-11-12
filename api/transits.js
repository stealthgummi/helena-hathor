const { calculateNatalChart } = require('../lib/ephemeris.js');
const { resolveCityAsync } = require('../lib/geo.js');
const { evaluatePersonalTransits } = require('../lib/helena_engine.js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') payload = JSON.parse(payload || '{}');
    const u = new URL(req.url, 'http://localhost');
    if (!payload || Object.keys(payload).length === 0) {
      payload = {
        birth_date: u.searchParams.get('birth_date') || '1994-11-08',
        birth_time: u.searchParams.get('birth_time') || '16:44',
        city: u.searchParams.get('city') || 'New York',
        target_date: u.searchParams.get('target_date') || new Date().toISOString().slice(0, 10)
      };
    }

    await resolveCityAsync(payload.city || 'New York');
    const natalChart = calculateNatalChart({
      date: payload.birth_date || payload.date,
      time: payload.birth_time || payload.time,
      city: payload.city || 'New York'
    });
    const radar = evaluatePersonalTransits(natalChart, payload.target_date);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, ...radar }));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
};
