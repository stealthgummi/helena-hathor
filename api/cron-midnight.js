const { runMidnightAgent } = require('../scripts/midnight_drop.js');

module.exports = async (req, res) => {
  try {
    const { drop } = await runMidnightAgent();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      message: `Midnight 12-Sign Under The Microscope Horoscopes & Today's Birthday generated for ${drop.date}`,
      date: drop.date,
      sky: drop.sky_weather
    }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
};

