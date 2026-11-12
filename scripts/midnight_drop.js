/**
 * Midnight Autonomous Horoscope & Today's Birthday Agent for Helena Hathor (@helenahathorastrology444)
 * Runs nightly via Vercel Cron (/api/cron-midnight) or CLI (`npm run midnight-drop`).
 */

const fs = require('fs');
const path = require('path');
const { generateDailyDrop } = require('../lib/helena_engine.js');

async function runMidnightAgent(targetDate) {
  const dateStr = targetDate || new Date().toISOString().slice(0, 10);
  const drop = generateDailyDrop(dateStr);
  drop.agent_mode = process.env.GEMINI_API_KEY ? 'gemini_ephemeris_hybrid' : 'helena_crucible_synthesizer_v2';

  const outDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'daily_horoscopes.json');
  fs.writeFileSync(outPath, JSON.stringify(drop, null, 2), 'utf8');
  return { outPath, drop };
}

if (require.main === module) {
  runMidnightAgent(process.argv[2]).then(({ outPath, drop }) => {
    console.log(`🔬✦ Helena Hathor Midnight Drop generated for ${drop.date} -> ${outPath}`);
    console.log(`   Sky: ${drop.sky_weather.headline} | ${drop.sky_weather.moon_phase}`);
  });
}

module.exports = { runMidnightAgent };
