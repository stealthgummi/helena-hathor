/**
 * Helena Hathor (@helenahathorastrology444) — The Natal Crucible & Under The Microscope Engine
 * Implements:
 * 1. "Under The Microscope" Big 3 + North Node ("What the f*** you're supposed to be doing on Earth") + South Node Purge
 * 2. 2nd House / 8th House Financial & Debt Rulers + Pain-to-Power Alchemy
 * 3. Full 8-Asteroid Microscope Dossier (Orcus, Mony, Fortuna, Enterprise, Yes, Fama, Starr, Polyhymnia)
 * 4. Speaking Truth to Power — Karmic Purge, Mars-South Node & 16° Fixed-Sign Pressure Diagnostics
 * 5. Past-Life Regression & Bali Sanctuary Dossier (12H/8H/South Node + April 2027 Bali Retreat Preview)
 * 6. 444 & 11:11 Clairvoyant Portal Numerology + Macro-Cycle Timelines (Pluto in Aquarius 20-Year Shift)
 * 7. Midnight Daily 12-Sign "Under The Microscope" Horoscopes + Personal Transit Radar
 */

const {
  ZODIAC_SIGNS,
  SIGN_META,
  calculateNatalChart,
  geocentricEclipticLon,
  formatExactDms
} = require('./ephemeris.js');

const HELENA_SIGN_VOICE = {
  Aries: {
    vibe: 'Cardinal Fire Enforcer · Mars-Ruled Sovereign Spark',
    sun: 'You were not incarnated to ask for permission or shrink for fragile egos. Your Solar blueprint is raw initiation — when you stop fighting other people’s battles and direct that blade at your own empire, nobody can touch you.',
    moon: 'Your nervous system processes emotion like a lightning strike. If you swallow your anger to keep a fake peace, it turns into somatic burnout. Move your body, sweat the static out, and speak the truth immediately.',
    rising: 'People feel your heat before you even open your mouth. With Aries on the Ascendant, your life is a masterclass in radical self-reliance — stop waiting for a cosigner and lead.',
    venusMoney: '2nd/8th House Wealth Code: You make money through speed, first-mover audacity, and independent ownership. Slow committee meetings drain your bank account.',
    northNodeMission: 'Stop apologizing for your sharp edges. Your North Node in Aries is screaming at you to sever codependent ropes and put your own mission first.',
    southNodePurge: 'Unplug the warrior-martyr karma of fighting for people who wouldn’t cross the street for you.'
  },
  Taurus: {
    vibe: 'Fixed Earth Alchemist · Venusian Vault & 16° Crucible Anchor',
    sun: 'Your Solar authority is built on unshakeable material sovereignty. When you lock into your worth, you become an immovable fortress of wealth, beauty, and nervous-system luxury.',
    moon: 'Your Moon demands tangible safety — silk sheets, real equity, clean food, and zero chaotic energy in your sanctuary. Starving your senses to please messy people is a betrayal of your chart.',
    rising: 'You project calm, expensive permanence, while Uranus and Fixed-sign pressure points secretly rewire your entire identity from the inside out.',
    venusMoney: '2nd/8th House Wealth Code: Compound equity, luxury positioning, land, and high-ticket retainers. Never discount your rate to comfort a broke mindset.',
    northNodeMission: 'Build the vault yourself. Your North Node here demands that you stop relying on volatile external validation and anchor into self-funded peace.',
    southNodePurge: 'Release the scarcity hoarding and the stubborn attachment to dead comfort zones.'
  },
  Gemini: {
    vibe: 'Mutable Air Oracle · Mercury Truth-To-Power Channel',
    sun: 'Your mind is a forensic transmitter. You see the receipts, the subtext, and the contradiction in three seconds flat — your job is to speak truth to power without diluting the signal.',
    moon: 'Your emotional body lives in your nervous system and respiratory tract. When you over-explain yourself to people committed to misunderstanding you, your clarity fractures.',
    rising: 'Quick, lethal wit and dual-frequency perception. You can walk into any room, decode the hierarchy, and rewrite the narrative on the spot.',
    venusMoney: '2nd/8th House Wealth Code: Intellectual property, publishing, media, high-converting copy, and multiple sovereign revenue streams.',
    northNodeMission: 'Ask the piercing question and publish your voice directly instead of hiding behind endless research.',
    southNodePurge: 'Clean up mental scatter, gossip loops, and dissociating into information overload.'
  },
  Cancer: {
    vibe: 'Cardinal Water Clairvoyant · Lunar Lineage & Sanctuary Keeper',
    sun: 'Do not let anyone mistake your water placement for weakness — Cardinal Water carves canyons. You are here to build an impenetrable emotional and financial sanctuary.',
    moon: 'Your psychic receptors ("all the claires") pick up every unspoken agenda in a five-mile radius. Salt baths, locked doors, and ruthless energetic hygiene are non-negotiable for you.',
    rising: 'Protective, intuitive, and fiercely territorial over your inner circle. Once someone violates your trust, the drawbridge goes up permanently.',
    venusMoney: '2nd/8th House Wealth Code: Real estate, private sanctuaries, high-trust advisory, and generational family wealth.',
    northNodeMission: 'Lead with emotional truth and radical vulnerability instead of hiding inside calcified armor.',
    southNodePurge: 'Stop mothering grown adults who refuse to clean up their own mess.'
  },
  Leo: {
    vibe: 'Fixed Fire Sovereign · Solar Throne & Heart-Fire Alchemy',
    sun: 'You are ruled by the literal Sun — shrinking so insecure people feel comfortable is a crime against your natal chart. Step onto the stage and claim the crown.',
    moon: 'Your heart needs devotion, royal treatment, and creative fire. When you settle for crumbs of attention, your vitality plummets. Spoil yourself first.',
    rising: 'Unmistakable presence. When Mars or fixed transits hit your Ascendant, you undergo a massive purge of fake friends so your real kingdom can rise.',
    venusMoney: '2nd/8th House Wealth Code: Personal brand authority, luxury offers, stage command, and unapologetic visibility.',
    northNodeMission: 'Take the microphone. Your soul contract requires visible leadership and creative courage.',
    southNodePurge: 'Release performative pride and the need for applause from bleachers that don’t pay your bills.'
  },
  Virgo: {
    vibe: 'Mutable Earth Diagnostician · Put It Under The Microscope',
    sun: 'Nothing escapes your lens. You have the surgical discernment to look at any broken system, relationship, or bloodline pattern under the microscope and alchemize it into order.',
    moon: 'Your gut is your second brain. Nervous-system regulation, clean somatic rituals, and refusing to absorb other people’s chaos keep your channel razor-sharp.',
    rising: 'Composed, immaculate, and quietly lethal with the facts. You notice the exact degree where someone’s story stops matching their actions.',
    venusMoney: '2nd/8th House Wealth Code: High-precision consulting, diagnostic mastery, specialized systems, and elite craftsmanship.',
    northNodeMission: 'Translate spiritual vision into tangible, daily structural mastery — clean up the details.',
    southNodePurge: 'Unplug paralytic perfectionism, martyrdom, and fixing broken people for free.'
  },
  Libra: {
    vibe: 'Cardinal Air Strategist · Iron Fist in a Velvet Glove',
    sun: 'Forget the "people-pleaser" lie they told you in generic horoscopes. True Libra energy is the scales of Ma’at — forensic justice, high-level contracts, and lethal aesthetic power.',
    moon: 'Your nervous system craves beauty, symmetry, and Sacred Sanctuary. Chaotic environments and lopsided relationships drain your life force.',
    rising: 'Effortless glamour masking a steel spine. You charm the room while calculating the exact karmic balance sheet.',
    venusMoney: '2nd/8th House Wealth Code: High-ticket partnerships, legal/contractual leverage, luxury aesthetics, and strategic alliances.',
    northNodeMission: 'Master the art of clean, sovereign partnership without losing an inch of your backbone.',
    southNodePurge: 'Burn the habit of smiling through resentment just to avoid a necessary confrontation.'
  },
  Scorpio: {
    vibe: 'Fixed Water Alchemist · Plutonian Crucible & 8th-House Enforcer',
    sun: 'You are built for the underworld. Lies, secrets, and superficial fluff disintegrate in your presence — your entire life is about turning deep pain into undeniable, f***ing unstoppable power.',
    moon: 'You feel at a cellular, multi-lifetime depth. Betrayal doesn’t just hurt; it triggers a total Plutonian purge and rebirth. Guard your bedroom and your energy field.',
    rising: 'X-ray vision. People either revere your depth or project their unhealed shadows onto you because your silence exposes their masks.',
    venusMoney: '2nd/8th House Wealth Code: 8th-house capital, investments, royalties, debt eradication, psychological/esoteric mastery, and high-stakes transformation.',
    northNodeMission: 'Dive straight into the shadow, merge with real power, and alchemize every wound into gold.',
    southNodePurge: 'Unplug control obsessions, trauma-bonding, and drinking poison waiting for your enemies to drop.'
  },
  Sagittarius: {
    vibe: 'Mutable Fire Prophet · Speaking Truth To Power',
    sun: 'You are the arrow aimed straight at the hypocrisy of the room. Your Solar mission is philosophical sovereignty, global horizons, and speaking raw, unfiltered truth to power.',
    moon: 'Your soul suffocates in cages. You need international movement, sacred study, and wide-open spiritual bandwidth to keep your fire lit.',
    rising: 'High-voltage optimism backed by prophetic bluntness. When you walk in, the ceiling comes off the room.',
    venusMoney: '2nd/8th House Wealth Code: Global retreats, publishing, higher education, coaching empires, and cross-border expansion.',
    northNodeMission: 'Trust your intuitive prophecy and Aim for the macro-vision instead of getting trapped in petty local gossip.',
    southNodePurge: 'Clean up reckless escapism and preaching truths you haven’t embodied yet.'
  },
  Capricorn: {
    vibe: 'Cardinal Earth Architect · Saturnian Throne & Karmic Law',
    sun: 'You understand that time and discipline expose everyone. While others chase quick dopamine, you are quietly constructing an empire that outlives the decade.',
    moon: 'You were forced to be the adult in the room way too early. Healing your Moon means allowing yourself to be spoiled, held, and rested without feeling guilty.',
    rising: 'Commanding, unbothered executive presence. You don’t do messy — you do results, boundaries, and legacy.',
    venusMoney: '2nd/8th House Wealth Code: Institutional authority, C-suite command, real assets, equity stakes, and long-horizon wealth.',
    northNodeMission: 'Step into supreme structural authority and own your ambition without apology.',
    southNodePurge: 'Release hyper-stoic isolation and carrying ancestral burdens that aren’t yours to pay off.'
  },
  Aquarius: {
    vibe: 'Fixed Air Disruptor · Pluto in Aquarius 20-Year Frequency Shift',
    sun: 'You are living at the epicenter of the 20-year Pluto in Aquarius overhaul. You didn’t come here to fit into a decaying system — you came here to shatter the matrix and build the future.',
    moon: 'You need altitude and autonomy to process emotion. Anyone trying to guilt-trip or cage your nervous system gets cut off with surgical detachment.',
    rising: 'Unmistakably sovereign, ahead of your time, and allergic to groupthink. People aren’t ready for you — and that is your exact advantage.',
    venusMoney: '2nd/8th House Wealth Code: Digital ecosystems, sovereign networks, futuristic tech/astrology platforms, and scalable community revolutions.',
    northNodeMission: 'Innovate for the collective while standing 100% sovereign in your weird, unrepeatable frequency.',
    southNodePurge: 'Unplug god-complex detachment and hiding in the crowd when you’re meant to disrupt it.'
  },
  Pisces: {
    vibe: 'Mutable Water Mystic · All The Claires & Multi-Lifetime Karma',
    sun: 'You straddle the veil between dimensions. Clairvoyance, clairaudience, clairsentience — when you stop numbing your gift and anchor it with ruthless boundaries, your intuition is undefeated.',
    moon: 'You are a psychic sponge for the collective unconscious. Daily water immersion, sound healing, and cord-cutting are mandatory so you don’t carry ghosts that aren’t yours.',
    rising: 'Ethereal, shape-shifting, and hypnotic. People project their deepest fantasies onto you while you quietly read their soul contract.',
    venusMoney: '2nd/8th House Wealth Code: Spiritual healing arts, cinema/music, retreats, intuitive advisory, and divinely timed windfalls.',
    northNodeMission: 'Surrender the ego’s micromanagement and trust your direct psychic channel to the divine.',
    southNodePurge: 'Clean up victim consciousness, rose-colored delusion, and martyrdom.'
  }
};

const ANGEL_NUMBERS = {
  '444': {
    number: '444',
    title: 'Helena’s Signature 444 Portal · Uranus + Saturn Foundation',
    planet_pair: 'Uranus (4) + Saturn (4) · 4th/10th House Axis',
    meaning: 'This is the signature @helenahathorastrology444 frequency: electric Uranian awakening locked into unshakeable 4th-house ancestral and structural sovereignty. Your spirit team is confirming that the pain you just alchemized is hardening into a permanent throne.',
    action: 'Lock down your boundaries, audit your 2nd/8th house finances, and do not budge an inch on your standards.'
  },
  '111': {
    number: '111',
    title: '11:11 Potent Portal · Solar Initiation & North Node Ignition',
    planet_pair: 'Sun (1) + Uranus (11) · 1st/11th House Axis',
    meaning: 'A once-in-a-lifetime timeline fork. As Helena says, this is a potent portal where Jupiterian expansion meets South Node release — unplug the old karma immediately and step through the door.',
    action: 'Write down the exact goal you were afraid to claim out loud and execute step one within 24 hours.'
  },
  '222': {
    number: '222',
    title: '2nd-House Wealth Alignment & Sovereign Mirror',
    planet_pair: 'Moon (2) + Venus · 2nd/7th House Axis',
    meaning: 'Your 2nd house of self-worth and liquid cash is syncing with your 7th house of contracts. Stop undercharging and stop entertaining lopsided partnerships.',
    action: 'Review your pricing, your bank accounts, and who has access to your nervous system.'
  },
  '333': {
    number: '333',
    title: 'Speaking Truth To Power · Jupiterian Verdict',
    planet_pair: 'Jupiter (3) + Mercury · 3rd/9th House Axis',
    meaning: 'Lies and secrets are being exposed. Your voice is backed by cosmic truth — say what needs to be said without sugarcoating it.',
    action: 'Publish the message, have the confrontational conversation, or sign the truth-aligned contract.'
  },
  '555': {
    number: '555',
    title: 'Mercurial Shockwave & Karmic Cord Severance',
    planet_pair: 'Mercury (5) + Mars · 5th/6th House Axis',
    meaning: 'Sudden, non-negotiable disruption of a stagnant routine. What looks like chaos is actually the universe forcibly evicting what you refused to outgrow.',
    action: 'Stop clinging to the expiring timeline — pack light and pivot fast.'
  },
  '666': {
    number: '666',
    title: 'Clean Up Your Shit · Venusian Recalibration',
    planet_pair: 'Venus (6) + Virgo 6th House',
    meaning: 'Not a bad omen — it is a cosmic diagnostic telling you to bring your energy back into your body, your bank account, and your daily discipline.',
    action: 'Regulate your nervous system, clear the clutter, and stop pouring energy into a draining obsession.'
  },
  '777': {
    number: '777',
    title: 'All The Claires · Neptune & South Node Downloads',
    planet_pair: 'Neptune (7) + Ketu/South Node · 12th House',
    meaning: 'Your clairvoyance and clairaudience are wide open. Past-life memories or prophetic dreams are handing you the exact blueprint before the physical evidence arrives.',
    action: 'Take a salt or flower bath, silence your phone, and record every intuitive hit.'
  },
  '888': {
    number: '888',
    title: '8th-House Karmic Harvest & Plutonian Wealth',
    planet_pair: 'Saturn (8) + Pluto · 2nd/8th House Financial Axis',
    meaning: 'Major 8th-house settlement: debt eradication, investment returns, inheritances, or the massive energetic payoff of surviving a brutal karmic cycle.',
    action: 'Consolidate your assets, clear lingering energetic debts, and claim your high-ticket worth.'
  },
  '999': {
    number: '999',
    title: 'Multi-Lifetime Purge Complete · Mars/Pluto Finale',
    planet_pair: 'Mars (9) + Pluto · 9th/12th House Axis',
    meaning: 'A 9-to-20-year karmic cycle is officially dead. Do not resuscitate what you just spent years surviving.',
    action: 'Burn the bridge to the old version of yourself and walk into the new chapter unbothered.'
  },
  '000': {
    number: '000',
    title: 'The Crucible Void · Pre-Incarnation Reset',
    planet_pair: 'Pluto + Source Point · 0° Aries/Aquarius',
    meaning: 'Total tabula rasa. You have unplugged from the old karmic matrix and stand in pure, unconditioned creative power.',
    action: 'Set intentions from who you are becoming, not from the trauma of where you have been.'
  }
};

const HOUSE_TOPICS = {
  1: '1st House (Identity, Physical Body, Sovereign Presence & First Strike)',
  2: '2nd House (Liquid Cash, Self-Worth,Earned Income & Material Security)',
  3: '3rd House (Speaking Truth to Power, Contracts, Siblings & Local Reach)',
  4: '4th House (Ancestral Lineage, Private Sanctuary, Real Estate & Nervous-System Root)',
  5: '5th House (Creative Fire, Sovereign Romance, Visibility & Pleasure)',
  6: '6th House (Forensic Daily Rituals, Somatic Health, Boundaries & Service)',
  7: '7th House (High-Stakes Contracts, Mirror Relationships & Open Enemies)',
  8: '8th House (Shared Capital, Debt Clearance, Trauma-to-Power Alchemy & Past-Life Bonds)',
  9: '9th House (International Retreats, Prophecy, Publishing & Higher Law)',
  10: '10th House (Public Empire, Career Throne, Reputation & Legacy)',
  11: '11th House (Pluto in Aquarius Networks, Quantum Portals & Collective Disruption)',
  12: '12th House (All The Claires, Past-Life Karma, Hidden Enemies & Bali Sanctuary Restoration)'
};

const SIGN_RULERS = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Pluto',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Uranus',
  Pisces: 'Neptune'
};

function buildHelenaNatalDossier(chartData, targetDateStr) {
  const p = chartData.planets;
  const ascSign = chartData.angles.asc_details.sign;
  const mcSign = chartData.angles.mc_details.sign;
  const sunVoice = HELENA_SIGN_VOICE[p.Sun.sign] || HELENA_SIGN_VOICE.Scorpio;
  const moonVoice = HELENA_SIGN_VOICE[p.Moon.sign] || HELENA_SIGN_VOICE.Scorpio;
  const risingVoice = HELENA_SIGN_VOICE[ascSign] || HELENA_SIGN_VOICE.Scorpio;
  const nnVoice = HELENA_SIGN_VOICE[p.NorthNode.sign] || HELENA_SIGN_VOICE.Scorpio;
  const snVoice = HELENA_SIGN_VOICE[p.SouthNode.sign] || HELENA_SIGN_VOICE.Scorpio;

  // 2nd & 8th House Rulers under the microscope
  const h2Sign = chartData.houses[1]?.sign || 'Taurus';
  const h8Sign = chartData.houses[7]?.sign || 'Scorpio';
  const h2RulerName = SIGN_RULERS[h2Sign] || 'Venus';
  const h8RulerName = SIGN_RULERS[h8Sign] || 'Pluto';
  const h2Ruler = p[h2RulerName] || p.Venus;
  const h8Ruler = p[h8RulerName] || p.Pluto;

  // Check for 16° Fixed-sign pressure or tight fixed placements
  const fixedPlacements = Object.entries(p)
    .filter(([, val]) => ['Taurus', 'Leo', 'Scorpio', 'Aquarius'].includes(val.sign))
    .map(([k, val]) => `${k === 'NorthNode' ? 'North Node' : k === 'SouthNode' ? 'South Node' : k} (${val.deg}° ${val.sign})`);

  const asteroidsList = Object.values(chartData.asteroids || {}).map(ast => ({
    ...ast,
    house_topic: HOUSE_TOPICS[ast.house] || `House ${ast.house}`,
    helena_prescription: getAsteroidPrescription(ast)
  }));

  const vampAlerts = (chartData.degree_alerts || []).filter(a => a.category === 'vampire' || a.category === 'boundary' || a.deg === 16);
  const wealthAlerts = (chartData.degree_alerts || []).filter(a => a.category === 'wealth' || a.category === 'luck' || a.category === 'stardom');

  return {
    persona: {
      name: 'Helena Hathor',
      handle: '@helenahathorastrology444',
      tagline: 'Look at your birth chart under the microscope — unplug the karma, alchemize your pain into f***ing power.'
    },
    big_three_summary: {
      headline: `${p.Sun.sign} Sun · ${p.Moon.sign} Moon · ${ascSign} Rising`,
      subheadline: `North Node in ${p.NorthNode.sign} (House ${p.NorthNode.house}) · South Node in ${p.SouthNode.sign} (House ${p.SouthNode.house}) · Midheaven in ${mcSign}`,
      helena_intro: `"We are putting your exact chart under the microscope — not generic readings. Your ${ascSign} Rising sets the exact houses where your karma lives, your ${p.Sun.sign} Sun is the throne you came here to claim, and your ${p.NorthNode.sign} North Node tells you what the f*** you're actually supposed to be doing on Earth."`,
      cards: [
        {
          slot: 'Rising (The Microscope Lens)',
          placement: `${ascSign} Rising (${chartData.angles.asc_details.exact_label})`,
          degree_tag: chartData.angles.asc_details.degree_theory.tag,
          reading: risingVoice.rising,
          house_focus: HOUSE_TOPICS[1]
        },
        {
          slot: 'Sun (Sovereign Core)',
          placement: `${p.Sun.sign} Sun in House ${p.Sun.house} (${p.Sun.exact_label})`,
          degree_tag: p.Sun.degree_theory.tag,
          reading: sunVoice.sun,
          house_focus: HOUSE_TOPICS[p.Sun.house]
        },
        {
          slot: 'Moon (Nervous System & Claires)',
          placement: `${p.Moon.sign} Moon in House ${p.Moon.house} (${p.Moon.exact_label})`,
          degree_tag: p.Moon.degree_theory.tag,
          reading: moonVoice.moon,
          house_focus: HOUSE_TOPICS[p.Moon.house]
        },
        {
          slot: 'North Node (Soul Mission)',
          placement: `North Node in ${p.NorthNode.sign} · House ${p.NorthNode.house} (${p.NorthNode.exact_label})`,
          degree_tag: '🧭 What You’re Here To Do On Earth',
          reading: `"The North Node in astrology really does tell you what the f*** you're supposed to be doing on Earth." Placed in ${p.NorthNode.sign} in your ${HOUSE_TOPICS[p.NorthNode.house]}: ${nnVoice.northNodeMission}`,
          house_focus: HOUSE_TOPICS[p.NorthNode.house]
        },
        {
          slot: 'South Node (Karmic Purge)',
          placement: `South Node in ${p.SouthNode.sign} · House ${p.SouthNode.house} (${p.SouthNode.exact_label})`,
          degree_tag: '🔥 Unplug The Past-Life Karma',
          reading: `Your multi-lifetime muscle memory sits in ${p.SouthNode.sign} in your ${HOUSE_TOPICS[p.SouthNode.house]}. ${snVoice.southNodePurge} When Mars or eclipses hit this point, unplug the karma immediately so it doesn't drain your vitality.`,
          house_focus: HOUSE_TOPICS[p.SouthNode.house]
        }
      ]
    },
    venus_glamour_wealth: {
      headline: `2nd House (${h2Sign}) & 8th House (${h8Sign}) Financial Alchemy`,
      venus_placement: `Venus in ${p.Venus.sign} · House ${p.Venus.house} (${p.Venus.exact_label})`,
      mars_placement: `Mars in ${p.Mars.sign} · House ${p.Mars.house} (${p.Mars.exact_label})`,
      jupiter_placement: `Jupiter in ${p.Jupiter.sign} · House ${p.Jupiter.house} (${p.Jupiter.exact_label})`,
      second_house_ruler: `2nd House Ruler: ${h2RulerName} in ${h2Ruler.sign} (House ${h2Ruler.house} · ${h2Ruler.exact_label})`,
      eighth_house_ruler: `8th House Ruler: ${h8RulerName} in ${h8Ruler.sign} (House ${h8Ruler.house} · ${h8Ruler.exact_label})`,
      money_code: `${HELENA_SIGN_VOICE[p.Venus.sign].venusMoney} Your 2nd House of cash flow is ruled by ${h2RulerName} sitting in House ${h2Ruler.house} (${HOUSE_TOPICS[h2Ruler.house]}), while your 8th House of shared capital, debt elimination, and big settlements is ruled by ${h8RulerName} in House ${h8Ruler.house} (${HOUSE_TOPICS[h8Ruler.house]}).`,
      glamour_ritual: `Pain-to-Power Wealth Rule: Whenever transits activate your ${h2Ruler.sign} or ${h8Ruler.sign} axis, clear lingering financial leaks, raise your rate, and channel ${p.Venus.sign} Venusian authority through ${HOUSE_TOPICS[p.Venus.house]}.`,
      wealth_degrees: wealthAlerts
    },
    asteroids_list: asteroidsList,
    protection_dashboard: {
      headline: `Speaking Truth To Power · Shadow & Karmic Purge Shield`,
      pluto_placement: `Pluto in ${p.Pluto.sign} · House ${p.Pluto.house} (${p.Pluto.exact_label})`,
      saturn_placement: `Saturn in ${p.Saturn.sign} · House ${p.Saturn.house} (${p.Saturn.exact_label})`,
      mars_south_node_check: `Natal Mars (${p.Mars.sign} H${p.Mars.house}) + South Node (${p.SouthNode.sign} H${p.SouthNode.house})`,
      fixed_pressure_points: fixedPlacements,
      vampire_degree_alerts: vampAlerts,
      cord_cutting_rx: [
        `"What do you need to release so you can be f***ing powerful, bitch, because people aren't ready for you?" Your Pluto in House ${p.Pluto.house} shows where secret competition and control hooks try to attach — cut them at the root.`,
        `"Clean up your shit": Saturn in ${p.Saturn.sign} (House ${p.Saturn.house}) is your non-negotiable boundary line. Where you tolerate messy behavior here, your timeline stalls.`,
        `16° Fixed Crucible Check: You carry Fixed-sign placements in ${fixedPlacements.join(', ') || 'your house cusps'}. When transits hit 16° Scorpio/Taurus/Leo/Aquarius, hidden truths and agendas surface rapidly — speak truth to power and let the fake masks fall.`
      ]
    },
    derivative_ancestral: {
      headline: `Past-Life Regression & Bali Sanctuary Dossier`,
      fourth_house: `4th House of Bloodline & Root: ${chartData.houses[3]?.sign || 'Cancer'} (IC at ${chartData.angles.mc_details.deg}° opposite MC)`,
      twelfth_house: `12th House of Past Lives & All The Claires: ${chartData.houses[11]?.sign || 'Pisces'}`,
      eighth_house: `8th House of Soul Contracts & Karmic Debt: ${h8Sign} (Ruled by ${h8RulerName} in House ${h8Ruler.house})`,
      ancestral_reading: `Your past-life regression signature links your ${p.SouthNode.sign} South Node in House ${p.SouthNode.house} with your ${chartData.houses[11]?.sign || 'Pisces'} 12th House. You are the generational circuit-breaker who came in with "all the claires" to unplug centuries of inherited silence and turn ancestral pain into sovereign purpose.`,
      bali_retreat_prescription: `🌺 Bali Sanctuary Prescription (${p.Moon.sign} Moon + ${chartData.houses[11]?.sign || 'Pisces'} 12H): Your nervous system requires luxury solitude, water immersion (flower baths), and vibrational sound healing to clear psychic residue. In Helena’s April 2027 Bali Retreat format (limited to 8–10 souls, private luxury villa, 5 one-on-one sessions under the microscope), your ${HOUSE_TOPICS[p.NorthNode.house]} is the primary portal we unlock.`
    },
    live_personal_transits: evaluatePersonalTransits(chartData, targetDateStr)
  };
}

function getAsteroidPrescription(ast) {
  const rx = {
    Orcus: `Orcus in ${ast.sign} (House ${ast.house}) is your soul-oath enforcer. Where people break promises or act messy in your ${HOUSE_TOPICS[ast.house]}, Orcus brings the karmic reckoning. Hold your integrity like iron.`,
    Mony: `Asteroid Mony (7782) in ${ast.sign} (House ${ast.house}) puts your high-ticket cash flow under the microscope. Your most lucrative financial portals open when you monetize ${ast.sign} mastery in your ${HOUSE_TOPICS[ast.house]}.`,
    Fortuna: `Fortuna (19) in ${ast.sign} (House ${ast.house}) marks where potent portal windfalls and "once-in-a-lifetime" pivots strike when you unplug from fear.`,
    Enterprise: `Enterprise (9777) in ${ast.sign} (House ${ast.house}) is your CEO blueprint — build your autonomous business around this exact house so you never answer to an incompetent boss again.`,
    Yes: `Asteroid Yes (7707) in ${ast.sign} (House ${ast.house}) is your green-light frequency. Pitch, launch, and demand what you want through ${ast.sign} directness.`,
    Fama: `Fama (408) in ${ast.sign} (House ${ast.house}) governs speaking truth to power and viral authority. When you stop filtering your voice on ${ast.sign} themes, your reputation explodes.`,
    Star: `Starr (4150) in ${ast.sign} (House ${ast.house}) shows why "people aren't ready for you." Own the spotlight in your ${HOUSE_TOPICS[ast.house]} without shrinking.`,
    Polyhymnia: `Polyhymnia (33) in ${ast.sign} (House ${ast.house}) is your Bali Sanctuary frequency — sound healing, sacred texts, and somatic nervous-system release unlock your psychic channel.`
  };
  return rx[ast.key] || `${ast.label} in ${ast.sign} activates your ${HOUSE_TOPICS[ast.house]}.`;
}

function evaluatePersonalTransits(natalChart, targetDateStr) {
  const targetDate = targetDateStr ? new Date(`${targetDateStr}T12:00:00Z`) : new Date();
  const transitChart = calculateNatalChart({
    date: targetDate.toISOString().slice(0, 10),
    time: '12:00',
    city: natalChart.meta?.city || 'New York'
  });

  const hits = [];
  const tPlanets = transitChart.planets;
  const nPlanets = natalChart.planets;
  const ascCusps = natalChart.houses.map(h => h.cusp_degree);

  function getNatalHouse(lon) {
    for (let i = 0; i < 12; i++) {
      const c1 = ascCusps[i];
      const c2 = ascCusps[(i + 1) % 12];
      if (c1 < c2) {
        if (lon >= c1 && lon < c2) return i + 1;
      } else {
        if (lon >= c1 || lon < c2) return i + 1;
      }
    }
    return 1;
  }

  const aspectDefs = [
    { name: 'Conjunction', angle: 0, orb: 4.5, badge: '🔬 Direct Microscope Hit' },
    { name: 'Opposition', angle: 180, orb: 4.0, badge: '⚡ Polarity Reckoning' },
    { name: 'Square', angle: 90, orb: 3.8, badge: '🔥 Crucible Pressure' },
    { name: 'Trine', angle: 120, orb: 4.0, badge: '✨ Potent Portal Flow' }
  ];

  const tKeys = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'NorthNode', 'SouthNode'];
  const nKeys = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Pluto', 'NorthNode', 'SouthNode'];

  for (const tk of tKeys) {
    const tp = tPlanets[tk];
    if (!tp) continue;
    const tHouse = getNatalHouse(tp.degree);

    // Check 16° Fixed-Sign Crucible Alert
    if (['Taurus', 'Leo', 'Scorpio', 'Aquarius'].includes(tp.sign) && Math.abs(tp.degree_in_sign - 16) <= 2.2) {
      hits.push({
        type: 'crucible_16',
        priority: 100,
        badge: '🔬 16° Fixed Crucible Valve',
        headline: `Transiting ${tk} at ${tp.exact_label} in your Natal House ${tHouse}`,
        detail: `Helena’s 16° Fixed-sign pressure point is live in your ${HOUSE_TOPICS[tHouse]}. Secrets, control dynamics, or stagnant karma are being forced to the surface so you can alchemize pain into raw power.`
      });
    }

    for (const nk of nKeys) {
      const np = nPlanets[nk];
      if (!np) continue;
      let diff = Math.abs(tp.degree - np.degree);
      if (diff > 180) diff = 360 - diff;

      for (const asp of aspectDefs) {
        const orb = Math.abs(diff - asp.angle);
        if (orb <= asp.orb) {
          const isNodeHit = nk === 'NorthNode' || nk === 'SouthNode' || tk === 'NorthNode' || tk === 'SouthNode';
          const isMarsPluto = tk === 'Mars' || tk === 'Pluto' || nk === 'Pluto';
          const priority = (isNodeHit ? 90 : isMarsPluto ? 82 : 70) - orb * 5;
          hits.push({
            type: isNodeHit ? 'karmic_portal' : 'planetary_transit',
            priority: Number(priority.toFixed(1)),
            badge: isNodeHit ? '🧭 Nodal Karma Portal' : asp.badge,
            headline: `Transit ${tk} (${tp.deg}° ${tp.abbr} · H${tHouse}) ${asp.name} Natal ${nk} (${np.deg}° ${np.abbr} · H${np.house})`,
            orb: `${orb.toFixed(1)}° orb`,
            detail: buildTransitPrescription(tk, nk, asp.name, tHouse, np.house, tp.retrograde)
          });
        }
      }
    }
  }

  hits.sort((a, b) => b.priority - a.priority);
  return {
    target_date: targetDate.toISOString().slice(0, 10),
    sky_snapshot: {
      sun: `${tPlanets.Sun.exact_label}`,
      moon: `${tPlanets.Moon.exact_label}`,
      mars: `${tPlanets.Mars.exact_label}${tPlanets.Mars.retrograde ? ' ℞' : ''}`,
      pluto: `${tPlanets.Pluto.exact_label}${tPlanets.Pluto.retrograde ? ' ℞' : ''}`,
      north_node: `${tPlanets.NorthNode.exact_label}`,
      mercury_rx: tPlanets.Mercury.retrograde,
      venus_rx: tPlanets.Venus.retrograde,
      mars_rx: tPlanets.Mars.retrograde
    },
    top_transits: hits.slice(0, 8)
  };
}

function buildTransitPrescription(tBody, nBody, aspect, tHouse, nHouse, isRx) {
  if (nBody === 'SouthNode' || tBody === 'SouthNode') {
    return `"Watch out because ${tBody} is activating the f***ing South Node." Multi-lifetime karma in your ${HOUSE_TOPICS[nHouse]} is being purged. Do not reach back for what is being cut out of your life — unplug the karma and protect your energy.`;
  }
  if (nBody === 'NorthNode' || tBody === 'NorthNode') {
    return `"This day affords you a potent portal." Transit ${tBody} in House ${tHouse} is electrifying your North Node destiny in House ${nHouse}. Step into the room like you already own it.`;
  }
  if (tBody === 'Pluto' || nBody === 'Pluto') {
    return `Deep Plutonian excavation across House ${tHouse} and House ${nHouse}. Lies and hidden agendas cannot survive this aspect — turn the pressure into sovereign power.`;
  }
  if (tBody === 'Mars') {
    return `High-voltage Mars activation (${isRx ? 'Retrograde review — clean up unfinished battles' : 'Direct strike'}) in your ${HOUSE_TOPICS[tHouse]} hitting Natal ${nBody}. Channel the heat into disciplined execution, not messy arguments.`;
  }
  if (tBody === 'Venus' || tBody === 'Jupiter') {
    return `2nd/8th House abundance & sanctuary window! ${tBody} is blessing your Natal ${nBody} in House ${nHouse}. Claim the financial upgrade, raise your standards, and let yourself be spoiled.`;
  }
  return `Under the microscope: Transit ${tBody}${isRx ? ' ℞' : ''} in your ${HOUSE_TOPICS[tHouse]} forms a ${aspect.toLowerCase()} to your Natal ${nBody} in House ${nHouse}. Clean up loose ends and move with deliberate authority.`;
}

function generateDailyDrop(dateStr) {
  const targetDateStr = dateStr || new Date().toISOString().slice(0, 10);
  const sky = calculateNatalChart({ date: targetDateStr, time: '12:00', city: 'New York' });
  const p = sky.planets;

  const moonPhaseAngle = ((p.Moon.degree - p.Sun.degree) % 360 + 360) % 360;
  let moonPhaseName = 'Waxing Crescent';
  if (moonPhaseAngle < 15 || moonPhaseAngle > 345) moonPhaseName = '🌑 New Moon Zero-Point Portal';
  else if (moonPhaseAngle >= 165 && moonPhaseAngle <= 195) moonPhaseName = '🌕 Full Moon Karmic Illumination';
  else if (moonPhaseAngle >= 75 && moonPhaseAngle <= 105) moonPhaseName = '🌓 First Quarter Crucible Action';
  else if (moonPhaseAngle >= 255 && moonPhaseAngle <= 285) moonPhaseName = '🌗 Last Quarter Cord-Cutting Purge';
  else if (moonPhaseAngle < 180) moonPhaseName = '🌒 Waxing Momentum Portal';
  else moonPhaseName = '🌘 Waning Detox & Sanctuary Window';

  const rxList = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    .filter(k => p[k]?.retrograde)
    .map(k => `${k} ℞ in ${p[k].sign}`);

  const horoscopes = {};
  ZODIAC_SIGNS.forEach((sign, idx) => {
    const voice = HELENA_SIGN_VOICE[sign];
    const sunHouse = ((Math.floor(p.Sun.degree / 30) - idx + 12) % 12) + 1;
    const moonHouse = ((Math.floor(p.Moon.degree / 30) - idx + 12) % 12) + 1;
    const marsHouse = ((Math.floor(p.Mars.degree / 30) - idx + 12) % 12) + 1;
    const nnHouse = ((Math.floor(p.NorthNode.degree / 30) - idx + 12) % 12) + 1;
    const snHouse = ((Math.floor(p.SouthNode.degree / 30) - idx + 12) % 12) + 1;
    const venusHouse = ((Math.floor(p.Venus.degree / 30) - idx + 12) % 12) + 1;

    horoscopes[sign] = {
      sign,
      glyph: SIGN_META[idx].glyph,
      element: SIGN_META[idx].element,
      vibe_tag: voice.vibe,
      power_houses: `Sun in H${sunHouse} · Moon in H${moonHouse} · North Node in H${nnHouse}`,
      lucky_degree: `${p.Sun.deg}° ${p.Sun.abbr} / 16° Fixed Check`,
      angel_portal: idx % 3 === 0 ? '444' : idx % 3 === 1 ? '111' : '888',
      rising_sun_reading: `Put your ${sign} Rising & Sun chart under the microscope today: The ${p.Sun.sign} Sun is illuminating your ${HOUSE_TOPICS[sunHouse]}, while the North Node in ${p.NorthNode.sign} activates your House ${nnHouse} and the South Node purges your House ${snHouse}. Stop settling for generic surface answers — Mars in ${p.Mars.sign} is pressuring your House ${marsHouse} so you finally cut the dead weight and step into the authority people aren't ready for.`,
      venus_money_love: `2nd/8th House Money & Karma: With Venus at ${p.Venus.exact_label} moving through your ${HOUSE_TOPICS[venusHouse]}, your financial magnetism requires zero people-pleasing. ${voice.venusMoney} Audit every contract, plug any energetic or financial leak, and price yourself like the sovereign expert you are.`,
      moon_nervous_system: `Bali Sanctuary & Somatic Reset: Today's ${p.Moon.sign} Moon (${moonPhaseName}) moves through your ${HOUSE_TOPICS[moonHouse]}. ${voice.moon} Unplug from chaotic group chats tonight, immerse in salt or flower water, and let your clairvoyant channel reset.`,
      helena_command: `"Unplug the karma in House ${snHouse} and get to your f***ing soul's purpose in House ${nnHouse}."`
    };
  });

  const bdaySign = p.Sun.sign;
  const bdayVoice = HELENA_SIGN_VOICE[bdaySign];

  return {
    date: targetDateStr,
    generated_at: new Date().toISOString(),
    author: 'Helena Hathor (@helenahathorastrology444)',
    sky_weather: {
      headline: `${p.Sun.sign} Season (${p.Sun.exact_label}) · ${p.Moon.sign} Moon (${p.Moon.exact_label})`,
      moon_phase: moonPhaseName,
      north_node: `North Node in ${p.NorthNode.sign} (${p.NorthNode.exact_label}) · South Node in ${p.SouthNode.sign}`,
      pluto_macro: `Pluto in ${p.Pluto.sign} (${p.Pluto.exact_label}) — 20-Year Collective Frequency Shift`,
      mars_watch: `Mars in ${p.Mars.sign} (${p.Mars.exact_label})${p.Mars.retrograde ? ' ℞ — 9-Month Karmic Purge Window' : ''}`,
      retrogrades: rxList,
      helena_daily_brief: `Today’s sky puts the ${p.Moon.sign} Moon and ${p.Sun.sign} Sun under the microscope alongside the ${p.NorthNode.sign}/${p.SouthNode.sign} Nodal axis. Lies and half-hearted commitments are being exposed. Clean up your energy, protect your nervous system, and use this portal to turn old friction into undeniable sovereignty.`
    },
    todays_birthday: {
      title: `🎂 Today’s Birthday Under The Microscope: ${p.Sun.deg}° ${bdaySign} Solar Return`,
      degree_tag: p.Sun.degree_theory.tag,
      reading: `Happy Solar Return to everyone born on ${targetDateStr.slice(5)}! Your Sun sits at ${p.Sun.exact_label} (${p.Sun.degree_theory.note}). With the Moon in ${p.Moon.sign} and the North Node in ${p.NorthNode.sign}, your upcoming 12-month Solar Return is a massive karmic graduation. ${bdayVoice.sun} This year, you are unplugging multi-lifetime people-pleasing, locking down 2nd/8th house wealth, and claiming the exact throne you were born for.`
    },
    horoscopes
  };
}

function reduceDigits(num) {
  let n = Math.abs(Number(num) || 0);
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((acc, d) => acc + Number(d), 0);
  }
  return n;
}

function calculateCosmicNumbers(params = {}) {
  const birthDate = params.birth_date || '1994-11-08';
  const targetDate = params.target_date || new Date().toISOString().slice(0, 10);
  const code = String(params.angel_number || '444').trim();

  const bParts = birthDate.split('-').map(Number);
  const tParts = targetDate.split('-').map(Number);

  const lifePath = reduceDigits(
    String(birthDate).replace(/\D/g, '').split('').reduce((a, b) => a + Number(b), 0)
  );
  const personalYear = reduceDigits((bParts[1] || 1) + (bParts[2] || 1) + (tParts[0] || 2026));
  const personalMonth = reduceDigits(personalYear + (tParts[1] || 1));
  const personalDay = reduceDigits(personalMonth + (tParts[2] || 1));

  const LIFE_PATH_DECODE = {
    1: 'Life Path 1 (Solar Sovereign): Born to lead autonomously, pioneer new territory, and never bow to groupthink.',
    2: 'Life Path 2 (Clairvoyant Diplomat): High-sensitivity intuitive radar, sacred partnerships, and energetic equilibrium.',
    3: 'Life Path 3 (Truth-To-Power Communicator): Magnetic voice, publishing, and exposing what others are afraid to say.',
    4: 'Life Path 4 (The 444 Architect): Structural mastery, generational foundations, and unbreakable discipline.',
    5: 'Life Path 5 (Quantum Catalyst): Freedom-driven timeline jumper who thrives in high-voltage change.',
    6: 'Life Path 6 (Sanctuary & Luxury Healer): Embodied Venusian magnetism, sound/somatic healing, and fierce protection.',
    7: 'Life Path 7 (Under The Microscope Mystic): Forensic researcher, occult diagnostician, and keeper of "all the claires."',
    8: 'Life Path 8 (8th-House Powerhouse): Big capital, karmic justice, executive authority, and pain-to-wealth alchemy.',
    9: 'Life Path 9 (Multi-Lifetime Alchemist): Old-soul completion, global retreats, and severing ancestral karma.',
    11: 'Master 11 (11:11 Clairvoyant Lightning Rod): Direct high-voltage psychic channel and collective awakener.',
    22: 'Master 22 (Master Empire Builder): Turning esoteric vision into massive, tangible global infrastructure.',
    33: 'Master 33 (Master Avatar Teacher): Pure frequency transmission, sacred sanctuary leadership, and transmutation.'
  };

  const PERSONAL_YEAR_DECODE = {
    1: 'Personal Year 1 — New 9-Year Cycle Ignition: Burn the old bridge and launch the new identity.',
    2: 'Personal Year 2 — Incubation & High-Value Alliances: Protect your nervous system and let the right doors open.',
    3: 'Personal Year 3 — Visibility & Speaking Truth to Power: Publish, pitch, and expand your voice.',
    4: 'Personal Year 4 — 444 Structural Lockdown: Clean up your systems, contracts, and real-world equity.',
    5: 'Personal Year 5 — Quantum Pivot & Liberation: Break out of stagnant cages and travel.',
    6: 'Personal Year 6 — Sanctuary, Luxury & Relationship Audit: Upgrade your home and reciprocity standards.',
    7: 'Personal Year 7 — Under The Microscope Sabbatical: Deep esoteric study, psychic sharpening, and inner retreat.',
    8: 'Personal Year 8 — 2nd/8th House Power Harvest: Claim the money, settle karmic debts, and own your throne.',
    9: 'Personal Year 9 — The Great Karmic Purge: Unplug everything that cannot come into your next decade.',
    11: 'Master 11 Personal Year — 11:11 Portal Illumination: Rapid timeline shifts and prophetic downloads.',
    22: 'Master 22 Personal Year — Legacy Architecture: Building a platform that lasts decades.'
  };

  const selectedAngel = ANGEL_NUMBERS[code] || ANGEL_NUMBERS['444'];

  return {
    selected_angel: selectedAngel,
    all_angel_numbers: ANGEL_NUMBERS,
    numerology: {
      birth_date: birthDate,
      target_date: targetDate,
      life_path: lifePath,
      life_path_meaning: LIFE_PATH_DECODE[lifePath] || LIFE_PATH_DECODE[8],
      personal_year: personalYear,
      personal_year_meaning: PERSONAL_YEAR_DECODE[personalYear] || PERSONAL_YEAR_DECODE[8],
      personal_month: personalMonth,
      personal_day: personalDay,
      macro_cycle_note: 'Pluto in Aquarius (2024–2044) + 2026–2027 Outer-Planet Portal: Your Personal Year number shows the exact gear your chart is shifting into right now.'
    }
  };
}

module.exports = {
  HELENA_SIGN_VOICE,
  ANGEL_NUMBERS,
  HOUSE_TOPICS,
  buildHelenaNatalDossier,
  buildShawtyNatalDossier: buildHelenaNatalDossier,
  evaluatePersonalTransits,
  generateDailyDrop,
  calculateCosmicNumbers
};
