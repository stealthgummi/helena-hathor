const { ANGEL_NUMBERS, calculateCosmicNumbers } = require('../lib/helena_engine.js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const u = new URL(req.url, 'http://localhost');
  const code = u.searchParams.get('code') || '444';
  const birthDate = u.searchParams.get('birth_date') || '1994-11-08';
  const date = u.searchParams.get('date') || new Date().toISOString().slice(0, 10);

  const decoded = calculateCosmicNumbers({
    birth_date: birthDate,
    target_date: date,
    angel_number: code
  });

  res.statusCode = 200;
  res.end(JSON.stringify({
    success: true,
    requested_angel: ANGEL_NUMBERS[code] || ANGEL_NUMBERS['444'],
    all_angel_numbers: ANGEL_NUMBERS,
    numerology: decoded.numerology
  }));
};
