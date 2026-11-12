const { calculateNatalChart, calculateAspects, renderCrucibleWheel } = require('../lib/ephemeris.js');
const { buildHelenaNatalDossier } = require('../lib/helena_engine.js');

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
    if (!payload || Object.keys(payload).length === 0) {
      const u = new URL(req.url, 'http://localhost');
      payload = {
        name: u.searchParams.get('name') || 'Sovereign Soul',
        date: u.searchParams.get('date') || '1994-11-08',
        time: u.searchParams.get('time') || '16:44',
        city: u.searchParams.get('city') || 'New York'
      };
    }

    const chart = calculateNatalChart(payload);
    const svg = renderCrucibleWheel(chart, 720);
    const aspects = calculateAspects(chart.planets);
    const helena = buildHelenaNatalDossier(chart);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      name: payload.name || 'Sovereign Soul',
      chart,
      aspects,
      helena,
      shawty: helena,
      svg
    }));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
};
