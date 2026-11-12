/**
 * High-Precision Astronomical Ephemeris + Helena Hathor Degree Diagnostics
 * + 8-Asteroid Microscope Selector + Obsidian & Molten Gold 360° Natal Crucible Wheel SVG
 * Built on NASA JPL DE405 / VSOP87 via astronomy-engine
 */

const Astronomy = require('astronomy-engine');
const { findCity, localTimeToUtc } = require('./geo.js');

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_ABBR = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];

const SIGN_META = [
  { name: 'Aries', glyph: '♈', element: 'Fire', color: '#F43F5E' },
  { name: 'Taurus', glyph: '♉', element: 'Earth', color: '#10B981' },
  { name: 'Gemini', glyph: '♊', element: 'Air', color: '#F59E0B' },
  { name: 'Cancer', glyph: '♋', element: 'Water', color: '#A855F7' },
  { name: 'Leo', glyph: '♌', element: 'Fire', color: '#F43F5E' },
  { name: 'Virgo', glyph: '♍', element: 'Earth', color: '#10B981' },
  { name: 'Libra', glyph: '♎', element: 'Air', color: '#F59E0B' },
  { name: 'Scorpio', glyph: '♏', element: 'Water', color: '#A855F7' },
  { name: 'Sagittarius', glyph: '♐', element: 'Fire', color: '#F43F5E' },
  { name: 'Capricorn', glyph: '♑', element: 'Earth', color: '#10B981' },
  { name: 'Aquarius', glyph: '♒', element: 'Air', color: '#F59E0B' },
  { name: 'Pisces', glyph: '♓', element: 'Water', color: '#A855F7' }
];

const BODIES = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
];

/**
 * Helena Hathor "Under The Microscope" Degree Theory Analyzer (0° to 29°)
 */
const DEGREE_ARCHETYPES = {
  0: { ruler: 'Pure Sign Portal', tag: '⚡ 0° Zero-Point Portal', alert: 'fresh_start', note: 'Raw, unconditioned karmic ignition — a fresh timeline opening at the exact threshold of the sign.' },
  1: { ruler: 'Aries / Mars', tag: '1° Sovereign Spark', alert: null, note: 'Unfiltered self-initiation, warrior nerve, and refusing to ask permission.' },
  2: { ruler: 'Taurus / Venus', tag: '💰 2° 2nd-House Wealth Degree', alert: 'wealth', note: 'Tangible asset magnetism, material equity, and locking down what you are actually worth.' },
  3: { ruler: 'Gemini / Mercury', tag: '3° Truth-To-Power Voice', alert: null, note: 'Piercing articulation, receipts, and saying the quiet part out loud.' },
  4: { ruler: 'Cancer / Moon', tag: '4° Ancestral Root', alert: null, note: 'Deep cellular memory, nervous-system sanctuary, and bloodline lineage.' },
  5: { ruler: 'Leo / Sun', tag: '👑 5° Sovereign Spotlight', alert: 'stardom', note: 'Unapologetic visibility, creative command, and magnetic presence.' },
  6: { ruler: 'Virgo / Mercury', tag: '6° Surgical Precision', alert: null, note: 'Putting the details under the microscope — somatic discipline and daily devotion.' },
  7: { ruler: 'Libra / Venus', tag: '7° Karmic Contract', alert: null, note: 'High-stakes alliances, mirror dynamics, and non-negotiable reciprocity.' },
  8: { ruler: 'Scorpio / Pluto', tag: '🔥 8° 8th-House Alchemy & Purge', alert: 'vampire', note: 'Deep shared-resource power, shadow excavation, and exposing secret agendas or energetic parasites.' },
  9: { ruler: 'Sagittarius / Jupiter', tag: '🍀 9° Jupiterian Breakthrough', alert: 'luck', note: 'Massive horizon expansion, international doors, and high-frequency protection.' },
  10: { ruler: 'Capricorn / Saturn', tag: '🏛️ 10° Empire & Authority', alert: 'wealth', note: 'Executive command, structural mastery, and legacy wealth.' },
  11: { ruler: 'Aquarius / Uranus', tag: '⚡ 11° 11:11 Quantum Liberation', alert: 'freedom', note: 'Unplugging from collective conditioning, sovereign rebellion, and sudden timeline jumps.' },
  12: { ruler: 'Pisces / Neptune', tag: '🔮 12° All-The-Claires Channel', alert: null, note: 'Clairvoyance, clairaudience, past-life bleed-through, and psychic downloads.' },
  13: { ruler: 'Aries / Mars', tag: '13° Cord-Cutting Blade', alert: null, note: 'Decisive severance of stagnant karma and relentless forward momentum.' },
  14: { ruler: 'Taurus / Venus', tag: '💰 14° Opulent Sanctuary', alert: 'wealth', note: 'High-value material abundance, embodied pleasure, and nervous-system luxury.' },
  15: { ruler: 'Gemini / Mercury', tag: '15° Midpoint Messenger', alert: null, note: 'High-voltage signal transmission and prophetic pattern recognition.' },
  16: { ruler: 'Crucible Pressure Point', tag: '🔬 16° Crucible Pressure Degree', alert: 'vampire', note: 'Helena’s signature 16° pressure valve! When triggered (especially in Fixed signs), hidden truths, control dynamics, and karmic bottlenecks erupt so you can alchemize pain into power.' },
  17: { ruler: 'Leo / Sun', tag: '👑 17° Icon & Legacy Degree', alert: 'stardom', note: 'Commanding the room without shrinking — lasting recognition and authority.' },
  18: { ruler: 'Virgo / Mercury', tag: '🔬 18° Forensic Discernment', alert: null, note: 'Reading every micro-shift in energy; protect the gut and nervous system from over-processing.' },
  19: { ruler: 'Libra / Venus', tag: '19° Sovereign Equilibrium', alert: null, note: 'High-caliber allies, fair exchange, and aesthetic magnetism.' },
  20: { ruler: 'Scorpio / Pluto', tag: '🔥 20° Plutonian Phoenix Degree', alert: 'vampire', note: 'Total cellular regeneration. People feel your intensity before you speak — keep energetic boundaries locked.' },
  21: { ruler: 'Sagittarius / Jupiter', tag: '🍀 21° Potent Portal Windfall', alert: 'luck', note: 'Once-in-a-lifetime expansion windows, philosophical mastery, and global reach.' },
  22: { ruler: 'Capricorn / Saturn', tag: '🛡️ 22° Architect Or Executioner', alert: 'boundary', note: 'Zero tolerance for manipulation or messy behavior — build the fortress on your own terms.' },
  23: { ruler: 'Aquarius / Uranus', tag: '⚡ 23° Frequency Disruptor', alert: 'freedom', note: 'Shattering outdated paradigms, autonomous income, and futuristic vision.' },
  24: { ruler: 'Pisces / Neptune', tag: '🌺 24° Sanctuary & Sound Bath', alert: null, note: 'Transcendental healing, sacred water rituals, and spiritual sovereignty.' },
  25: { ruler: 'Aries / Mars', tag: '25° Unstoppable Reckoning', alert: null, note: 'Burning the bridge back to your old self and claiming the throne.' },
  26: { ruler: 'Taurus / Venus', tag: '💰 26° Generational Equity', alert: 'wealth', note: 'Compound wealth, land, sanctuary, and unshakeable material security.' },
  27: { ruler: 'Gemini / Mercury', tag: '27° Oracle Synthesis', alert: null, note: 'Translating esoteric complexity into razor-sharp, undeniable truth.' },
  28: { ruler: 'Cancer / Moon', tag: '🌺 28° Sacred Sanctuary', alert: 'wealth', note: 'Deep emotional sovereignty, protected home frequency, and ancestral completion.' },
  29: { ruler: 'Anaretic Graduation', tag: '👑 29° Anaretic Karmic Finale', alert: 'stardom', note: 'Multi-lifetime mastery degree — final exam energy that demands total, uncompromising authenticity.' }
};

function getDegreeTheory(degInt) {
  const d = ((Math.floor(degInt) % 30) + 30) % 30;
  return { deg: d, ...(DEGREE_ARCHETYPES[d] || DEGREE_ARCHETYPES[0]) };
}

function formatExactDms(eclipticLon) {
  const norm = ((eclipticLon % 360) + 360) % 360;
  const signIdx = Math.floor(norm / 30);
  const inSign = norm - signIdx * 30;
  const deg = Math.floor(inSign);
  const minFloat = (inSign - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = Math.round((minFloat - min) * 60) % 60;
  const degTheory = getDegreeTheory(deg);
  return {
    sign: ZODIAC_SIGNS[signIdx],
    abbr: SIGN_ABBR[signIdx],
    glyph: SIGN_META[signIdx].glyph,
    element: SIGN_META[signIdx].element,
    deg,
    min,
    sec,
    degree_in_sign: Number(inSign.toFixed(2)),
    exact_label: `${deg}° ${SIGN_ABBR[signIdx]} ${String(min).padStart(2, '0')}' ${String(sec).padStart(2, '0')}"`,
    degree_theory: degTheory
  };
}

function calculateNorthNode(date) {
  const jd = (date.getTime() / 86400000.0) + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000.0;
  return ((omega % 360) + 360) % 360;
}

/**
 * 8-Asteroid "Under The Microscope" Toolkit
 * Official NASA JPL Small-Body Database (SBDB) Full-Precision 3D Osculating Elements (ECLIPJ2000)
 */
const SIGNATURE_ASTEROIDS = [
  {
    id: 90482, key: 'Orcus', label: '90482 Orcus', icon: '⚖️',
    epoch: 2461200.5, a: 39.37686537914865, e: 0.2205240628250881, i: 20.55681019612,
    om: 268.4053519455824, w: 73.56848606705262, ma: 189.0972913554275, n: 0.003988800931399829,
    domain: 'Soul-Oath Enforcement, Karmic Reckoning, Shadow Work & Unbreakable Integrity'
  },
  {
    id: 7782, key: 'Mony', label: '7782 Mony', icon: '💰',
    epoch: 2461200.5, a: 3.171618477602275, e: 0.3126158490535498, i: 14.44636620851493,
    om: 259.6273021556166, w: 113.1580908025548, ma: 296.1285609089759, n: 0.1744948705107163,
    domain: '2nd/8th House Capital, Debt Clearance & Sovereign Financial Power'
  },
  {
    id: 19, key: 'Fortuna', label: '19 Fortuna', icon: '🍀',
    epoch: 2461200.5, a: 2.441509944072874, e: 0.1581144571294698, i: 1.573529585781511,
    om: 210.9922659828297, w: 182.4358203745859, ma: 148.2622141754194, n: 0.258354676819405,
    domain: 'Karmic Wheel of Fortune, Potent Portal Windfalls & Timeline Pivots'
  },
  {
    id: 9777, key: 'Enterprise', label: '9777 Enterprise', icon: '🏛️',
    epoch: 2461200.5, a: 2.399049885643765, e: 0.2317139414823986, i: 3.273792173565524,
    om: 115.5481616755569, w: 179.4442180555015, ma: 221.0240949371676, n: 0.2652437478418583,
    domain: 'Sovereign Empire Building, Executive Strategy & Autonomous Mastery'
  },
  {
    id: 7707, key: 'Yes', label: '7707 Yes', icon: '⚡',
    epoch: 2461200.5, a: 2.652148531923937, e: 0.1420610140627719, i: 15.69347289326408,
    om: 131.1839009585817, w: 77.83412338350939, ma: 245.0157004089689, n: 0.2281956228371733,
    domain: 'Green-Light Portals, Undeniable Alignment & Doors Opening Without Force'
  },
  {
    id: 408, key: 'Fama', label: '408 Fama', icon: '📣',
    epoch: 2461200.5, a: 3.167341227511315, e: 0.1477551364977772, i: 9.089770852479129,
    om: 297.0847667959958, w: 109.0463865748119, ma: 58.55299109495965, n: 0.1748484526156669,
    domain: 'Speaking Truth to Power, Public Authority, Viral Voice & Reputation'
  },
  {
    id: 4150, key: 'Star', label: '4150 Starr', icon: '✦',
    epoch: 2461200.5, a: 2.233181325954991, e: 0.1665861305512198, i: 3.19697047892345,
    om: 122.883041221529, w: 197.67849314953, ma: 197.684953210843, n: 0.2953371587639414,
    domain: 'Unapologetic Visibility, Stepping Into Power & Main-Stage Command'
  },
  {
    id: 33, key: 'Polyhymnia', label: '33 Polyhymnia', icon: '🌺',
    epoch: 2461200.5, a: 2.87133496806849, e: 0.3344915245297666, i: 1.854194735990684,
    om: 8.126765416786608, w: 338.8138529964299, ma: 147.6094435360536, n: 0.2025714720052792,
    domain: 'Sacred Sound Frequency, Somatic Nervous-System Release & Esoteric Texts'
  }
];

function computeGeocentricAsteroidLon(ast, date) {
  const rad = Math.PI / 180;
  const jd = (date.getTime() / 86400000.0) + 2440587.5;
  const time = new Astronomy.AstroTime(date);
  const eq = Astronomy.HelioVector(Astronomy.Body.Earth, time);
  const eps0 = 23.439291111 * rad;
  const xe = eq.x;
  const ye = eq.y * Math.cos(eps0) + eq.z * Math.sin(eps0);
  const ze = -eq.y * Math.sin(eps0) + eq.z * Math.cos(eps0);

  function helioEclipticAt(jdTarget) {
    const M = (((ast.ma + ast.n * (jdTarget - ast.epoch)) % 360) + 360) % 360 * rad;
    let E = M;
    for (let k = 0; k < 8; k++) {
      E = E - (E - ast.e * Math.sin(E) - M) / (1 - ast.e * Math.cos(E));
    }
    const xv = ast.a * (Math.cos(E) - ast.e);
    const yv = ast.a * Math.sqrt(1 - ast.e * ast.e) * Math.sin(E);
    const v = Math.atan2(yv, xv);
    const r = Math.hypot(xv, yv);
    const u = v + ast.w * rad;
    const om = ast.om * rad;
    const inc = ast.i * rad;
    return {
      x: r * (Math.cos(om) * Math.cos(u) - Math.sin(om) * Math.sin(u) * Math.cos(inc)),
      y: r * (Math.sin(om) * Math.cos(u) + Math.cos(om) * Math.sin(u) * Math.cos(inc)),
      z: r * (Math.sin(u) * Math.sin(inc))
    };
  }

  let h = helioEclipticAt(jd);
  const distAu = Math.hypot(h.x - xe, h.y - ye, h.z - ze);
  h = helioEclipticAt(jd - distAu / 173.14463267);
  const lonJ2000 = Math.atan2(h.y - ye, h.x - xe) / rad;
  const precDeg = (50.28796195 * ((jd - 2451545.0) / 365.25)) / 3600.0;
  return ((lonJ2000 + precDeg) % 360 + 360) % 360;
}

function calculateSignatureAsteroids(date, _sunLon, cusps) {
  const out = {};
  for (const ast of SIGNATURE_ASTEROIDS) {
    const lon = computeGeocentricAsteroidLon(ast, date);
    const lon6h = computeGeocentricAsteroidLon(ast, new Date(date.getTime() + 6 * 3600 * 1000));
    let diff = lon6h - lon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const dms = formatExactDms(lon);
    out[ast.key] = {
      id: ast.id,
      key: ast.key,
      label: ast.label,
      icon: ast.icon,
      domain: ast.domain,
      degree: Number(lon.toFixed(4)),
      retrograde: diff < 0,
      ...dms,
      house: getHouseForDegree(lon, cusps)
    };
  }
  return out;
}

function calculateAngles(date, lat, lon) {
  const time = new Astronomy.AstroTime(date);
  const gastHours = Astronomy.SiderealTime(time);
  const ramcDeg = ((gastHours * 15.0 + lon) % 360 + 360) % 360;
  const eps = Astronomy.e_tilt(time).tobl;

  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;
  const ramcRad = ramcDeg * toRad;
  const epsRad = eps * toRad;
  const latRad = lat * toRad;

  let mc = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad)) * toDeg;
  mc = ((mc % 360) + 360) % 360;

  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad));
  let asc = Math.atan2(y, x) * toDeg;
  asc = ((asc % 360) + 360) % 360;

  return {
    ascendant: asc,
    midheaven: mc,
    descendant: (asc + 180) % 360,
    ic: (mc + 180) % 360
  };
}

function calculateHouses(asc) {
  const ascSignIndex = Math.floor(asc / 30);
  const cusps = [];
  for (let i = 0; i < 12; i++) {
    cusps.push(((ascSignIndex + i) * 30) % 360);
  }
  return cusps;
}

function getHouseForDegree(deg, cusps) {
  for (let i = 0; i < 12; i++) {
    const cusp = cusps[i];
    const nextCusp = cusps[(i + 1) % 12];
    if (cusp < nextCusp) {
      if (deg >= cusp && deg < nextCusp) return i + 1;
    } else {
      if (deg >= cusp || deg < nextCusp) return i + 1;
    }
  }
  return 1;
}

function geocentricEclipticLon(bodyName, date) {
  const time = new Astronomy.AstroTime(date);
  if (bodyName === 'Sun') return Astronomy.SunPosition(time).elon;
  if (bodyName === 'Moon') return Astronomy.EclipticGeoMoon(time).lon;
  const vec = Astronomy.GeoVector(Astronomy.Body[bodyName], time, true);
  return Astronomy.Ecliptic(vec).elon;
}

function isRetrograde(bodyName, date) {
  if (bodyName === 'Sun' || bodyName === 'Moon') return false;
  const l1 = geocentricEclipticLon(bodyName, date);
  const l2 = geocentricEclipticLon(bodyName, new Date(date.getTime() + 6 * 3600 * 1000));
  let diff = l2 - l1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

function calculateNatalChart(params = {}) {
  const dateStr = params.date || params.birth_date || '1994-11-08';
  const timeStr = params.time || params.birth_time || '16:44';
  const loc = findCity(params.city || 'New York');
  const lat = typeof params.latitude === 'number' ? params.latitude : loc.lat;
  const lon = typeof params.longitude === 'number' ? params.longitude : loc.lon;
  const utcDate = localTimeToUtc(dateStr, timeStr, params.timezone || loc.tz);

  const angles = calculateAngles(utcDate, lat, lon);
  const cusps = calculateHouses(angles.ascendant);

  const planets = {};
  for (const b of BODIES) {
    const elon = ((geocentricEclipticLon(b, utcDate) % 360) + 360) % 360;
    const dms = formatExactDms(elon);
    planets[b] = {
      degree: Number(elon.toFixed(4)),
      ...dms,
      retrograde: isRetrograde(b, utcDate),
      house: getHouseForDegree(elon, cusps)
    };
  }

  const nnLon = calculateNorthNode(utcDate);
  planets.NorthNode = {
    degree: Number(nnLon.toFixed(4)),
    ...formatExactDms(nnLon),
    retrograde: true,
    house: getHouseForDegree(nnLon, cusps)
  };

  const snLon = (nnLon + 180) % 360;
  planets.SouthNode = {
    degree: Number(snLon.toFixed(4)),
    ...formatExactDms(snLon),
    retrograde: true,
    house: getHouseForDegree(snLon, cusps)
  };

  const asteroids = calculateSignatureAsteroids(utcDate, planets.Sun.degree, cusps);

  const houses = cusps.map((c, idx) => ({
    house: idx + 1,
    cusp_degree: c,
    sign: ZODIAC_SIGNS[Math.floor(c / 30)],
    glyph: SIGN_META[Math.floor(c / 30)].glyph
  }));

  const ascDms = formatExactDms(angles.ascendant);
  const mcDms = formatExactDms(angles.midheaven);

  const degreeAlerts = [];
  const checkPoints = [
    { label: 'Rising (ASC)', ...ascDms, house: 1 },
    { label: 'Midheaven (MC)', ...mcDms, house: 10 },
    ...['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'NorthNode', 'SouthNode'].map(k => ({
      label: k === 'NorthNode' ? 'North Node' : k === 'SouthNode' ? 'South Node' : k,
      ...planets[k]
    }))
  ];
  for (const pt of checkPoints) {
    const dt = pt.degree_theory;
    if (dt && dt.alert) {
      degreeAlerts.push({
        body: pt.label,
        sign: pt.sign,
        house: pt.house,
        deg: pt.deg,
        exact_label: pt.exact_label,
        category: dt.alert,
        tag: dt.tag,
        ruler: dt.ruler,
        note: dt.note
      });
    }
  }

  return {
    meta: {
      birth_date: dateStr,
      birth_time: timeStr,
      resolved_location: `${loc.city}${loc.state ? ', ' + loc.state : ''}${loc.country ? ' (' + loc.country + ')' : ''}`,
      city: loc.city,
      timezone: loc.tz,
      utc_time: utcDate.toISOString(),
      lat,
      lon
    },
    angles: {
      ...angles,
      asc_details: ascDms,
      mc_details: mcDms
    },
    planets,
    asteroids,
    houses,
    degree_alerts: degreeAlerts
  };
}

/**
 * CrucibleWheelEngine — Renders an Obsidian Velvet, Molten Gold & Crimson 360° Natal Chart SVG
 */
const PLANET_GLYPHS = {
  Sun: { g: '☉', c: '#F59E0B' },
  Moon: { g: '☽', c: '#E2E8F0' },
  Mercury: { g: '☿', c: '#38BDF8' },
  Venus: { g: '♀', c: '#FB7185' },
  Mars: { g: '♂', c: '#E11D48' },
  Jupiter: { g: '♃', c: '#FBBF24' },
  Saturn: { g: '♄', c: '#10B981' },
  Uranus: { g: '♅', c: '#22D3EE' },
  Neptune: { g: '♆', c: '#C084FC' },
  Pluto: { g: '♇', c: '#A855F7' },
  NorthNode: { g: '☊', c: '#F59E0B' },
  SouthNode: { g: '☋', c: '#94A3B8' }
};

const ASPECT_RULES = [
  { name: 'Conjunction', angle: 0, orb: 8, color: '#F59E0B' },
  { name: 'Sextile', angle: 60, orb: 6, color: '#10B981' },
  { name: 'Square', angle: 90, orb: 7, color: '#F43F5E' },
  { name: 'Trine', angle: 120, orb: 8, color: '#A855F7' },
  { name: 'Opposition', angle: 180, orb: 8, color: '#FB7185' }
];

function calculateAspects(planets) {
  const keys = Object.keys(planets);
  const aspects = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      if ((keys[i] === 'NorthNode' && keys[j] === 'SouthNode') || (keys[i] === 'SouthNode' && keys[j] === 'NorthNode')) continue;
      let diff = Math.abs(planets[keys[i]].degree - planets[keys[j]].degree);
      if (diff > 180) diff = 360 - diff;
      for (const rule of ASPECT_RULES) {
        const orb = Math.abs(diff - rule.angle);
        if (orb <= rule.orb) {
          aspects.push({
            planet1: keys[i],
            planet2: keys[j],
            aspect: rule.name,
            orb: Number(orb.toFixed(2)),
            color: rule.color
          });
          break;
        }
      }
    }
  }
  return aspects;
}

function renderCottonCandyWheel(chartData, size = 720) {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.46;
  const rInnerSign = size * 0.365;
  const rPlanet = size * 0.285;
  const rHub = size * 0.195;
  const asc = chartData.angles.ascendant;

  const degToScreen = (deg) => {
    const diff = (deg - asc + 360) % 360;
    return ((180 - diff + 360) % 360) * (Math.PI / 180);
  };
  const pt = (r, deg) => {
    const a = degToScreen(deg);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="100%">
  <defs>
    <radialGradient id="crucibleGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1E102C" stop-opacity="0.98"/>
      <stop offset="68%" stop-color="#11091C" stop-opacity="0.98"/>
      <stop offset="100%" stop-color="#09050F" stop-opacity="0.99"/>
    </radialGradient>
    <linearGradient id="crucibleRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="50%" stop-color="#E11D48"/>
      <stop offset="100%" stop-color="#A855F7"/>
    </linearGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${rOuter + 10}" fill="url(#crucibleGlow)" stroke="url(#crucibleRing)" stroke-width="3.5"/>
  <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="none" stroke="#F59E0B" stroke-opacity="0.55" stroke-width="1.5"/>
  <circle cx="${cx}" cy="${cy}" r="${rInnerSign}" fill="#0D0716" fill-opacity="0.88" stroke="#A855F7" stroke-opacity="0.45" stroke-width="1.5"/>
  <circle cx="${cx}" cy="${cy}" r="${rHub}" fill="#140A22" stroke="#F59E0B" stroke-opacity="0.45" stroke-width="1.2"/>`;

  for (let i = 0; i < 12; i++) {
    const startDeg = i * 30;
    const midDeg = startDeg + 15;
    const p1 = pt(rInnerSign, startDeg);
    const p2 = pt(rOuter, startDeg);
    const pHouseIn = pt(rHub, chartData.houses[i].cusp_degree);
    const pHouseOut = pt(rInnerSign, chartData.houses[i].cusp_degree);
    const gPos = pt((rOuter + rInnerSign) / 2, midDeg);
    const hPos = pt(rHub + 18, chartData.houses[i].cusp_degree + 15);
    const sm = SIGN_META[i];

    svg += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#F59E0B" stroke-opacity="0.32" stroke-width="1.2"/>`;
    svg += `<line x1="${pHouseIn.x.toFixed(1)}" y1="${pHouseIn.y.toFixed(1)}" x2="${pHouseOut.x.toFixed(1)}" y2="${pHouseOut.x.toFixed(1)}" stroke="#475569" stroke-dasharray="3,3" stroke-width="1"/>`;
    svg += `<text x="${gPos.x.toFixed(1)}" y="${(gPos.y + 7).toFixed(1)}" text-anchor="middle" font-size="21" fill="${sm.color}" font-family="Segoe UI Symbol, Apple Symbols, sans-serif">${sm.glyph}</text>`;
    svg += `<text x="${hPos.x.toFixed(1)}" y="${(hPos.y + 4).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#FDE68A" fill-opacity="0.7" font-family="Plus Jakarta Sans, sans-serif">${i + 1}</text>`;
  }

  const ascL = pt(rOuter + 6, asc);
  const dscL = pt(rOuter + 6, (asc + 180) % 360);
  svg += `<line x1="${ascL.x.toFixed(1)}" y1="${ascL.y.toFixed(1)}" x2="${dscL.x.toFixed(1)}" y2="${dscL.y.toFixed(1)}" stroke="#F59E0B" stroke-width="2.2" stroke-opacity="0.85"/>`;
  svg += `<text x="${(ascL.x - 16).toFixed(1)}" y="${(ascL.y - 6).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="800" fill="#FBBF24" font-family="Plus Jakarta Sans, sans-serif">ASC</text>`;

  const aspects = calculateAspects(chartData.planets);
  for (const asp of aspects) {
    const a1 = pt(rHub - 4, chartData.planets[asp.planet1].degree);
    const a2 = pt(rHub - 4, chartData.planets[asp.planet2].degree);
    svg += `<line x1="${a1.x.toFixed(1)}" y1="${a1.y.toFixed(1)}" x2="${a2.x.toFixed(1)}" y2="${a2.y.toFixed(1)}" stroke="${asp.color}" stroke-opacity="0.52" stroke-width="1.35"/>`;
  }

  const pEntries = Object.entries(chartData.planets)
    .map(([k, v]) => ({ key: k, ...v, plotDeg: v.degree }));
  pEntries.sort((a, b) => a.degree - b.degree);
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < pEntries.length; i++) {
      const next = pEntries[(i + 1) % pEntries.length];
      let diff = (next.plotDeg - pEntries[i].plotDeg + 360) % 360;
      if (diff < 7.5) {
        pEntries[i].plotDeg = (pEntries[i].plotDeg - 2 + 360) % 360;
        next.plotDeg = (next.plotDeg + 2) % 360;
      }
    }
  }

  for (const p of pEntries) {
    const pos = pt(rPlanet, p.plotDeg);
    const trueTick = pt(rInnerSign, p.degree);
    const pg = PLANET_GLYPHS[p.key] || { g: '✦', c: '#F59E0B' };
    svg += `<line x1="${trueTick.x.toFixed(1)}" y1="${trueTick.y.toFixed(1)}" x2="${pos.x.toFixed(1)}" y2="${pos.y.toFixed(1)}" stroke="${pg.c}" stroke-opacity="0.45" stroke-width="1"/>`;
    svg += `<circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="14" fill="#160B26" stroke="${pg.c}" stroke-width="2"/>`;
    svg += `<text x="${pos.x.toFixed(1)}" y="${(pos.y + 5).toFixed(1)}" text-anchor="middle" font-size="14.5" font-weight="700" fill="${pg.c}" font-family="Segoe UI Symbol, Apple Symbols, sans-serif">${pg.g}</text>`;
    const dPos = pt(rPlanet - 23, p.plotDeg);
    svg += `<text x="${dPos.x.toFixed(1)}" y="${(dPos.y + 3).toFixed(1)}" text-anchor="middle" font-size="8.8" font-weight="700" fill="#E2E8F0" font-family="Plus Jakarta Sans, sans-serif">${p.deg}°${p.retrograde ? '℞' : ''}</text>`;
  }

  svg += `<circle cx="${cx}" cy="${cy}" r="22" fill="url(#crucibleRing)" fill-opacity="0.22" stroke="#F59E0B" stroke-width="1.4"/>`;
  svg += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="15">🔬✦</text></svg>`;
  return svg;
}

module.exports = {
  ZODIAC_SIGNS,
  SIGN_META,
  DEGREE_ARCHETYPES,
  SIGNATURE_ASTEROIDS,
  getDegreeTheory,
  formatExactDms,
  calculateNatalChart,
  calculateAspects,
  renderCottonCandyWheel,
  renderCrucibleWheel: renderCottonCandyWheel,
  geocentricEclipticLon
};
