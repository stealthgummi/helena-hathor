const fs = require('fs');
const path = require('path');
const { generateDailyDrop } = require('../lib/helena_engine.js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    const u = new URL(req.url, 'http://localhost');
    const todayStr = new Date().toISOString().slice(0, 10);
    const reqDate = u.searchParams.get('date') || todayStr;

    const cacheFile = path.join(__dirname, '..', 'data', 'daily_horoscopes.json');
    if (fs.existsSync(cacheFile)) {
      try {
        const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
        if (cached && cached.date === reqDate) {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, source: 'midnight_cache', ...cached }));
        }
      } catch (_) {}
    }

    const drop = generateDailyDrop(reqDate);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, source: 'live_ephemeris', ...drop }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
};

