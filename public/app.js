/**
 * Helena Hathor (@helenahathorastrology444) — The Natal Crucible Frontend Controller
 */

const STORAGE_KEYS = {
  PROFILE: 'helena_crucible_profile_v2',
   HABITS: 'helena_crucible_habits_v2',
  GRIMOIRE: 'helena_crucible_grimoire_v2'
};

const DEFAULT_PROFILE = {
  name: 'Sovereign Soul',
  date: '1994-11-08',
  time: '16:44',
  city: 'New York'
};

const CRUCIBLE_HABITS = [
  { id: 'h1', label: '🧭 Checked my North Node mission before reacting to other people’s chaos' },
  { id: 'h2', label: '🔌 Unplugged from a draining South Node pattern or trauma-bond loop' },
  { id: 'h3', label: '💰 Audited my 2nd/8th house cash flow, pricing, or energetic reciprocity' },
  { id: 'h4', label: '🔥 Spoke truth to power — zero shrinking, zero people-pleasing' },
  { id: 'h5', label: '🧹 "Cleaned up my shit": cleared 1 delayed task, bill, or boundary leak' },
  { id: 'h6', label: '🌺 Bali Sanctuary nervous-system reset (salt/flower water, breath, or 432 Hz)' },
  { id: 'h7', label: '🔮 Honored "all the claires" — trusted my first psychic hit without gaslighting myself' }
];

const state = {
  profile: loadProfile(),
  natalData: null,
  dailyData: null,
  selectedSign: 'Scorpio',
  selectedLens: 'rising_sun_reading',
  selectedAngel: '444',
  transitDate: new Date().toISOString().slice(0, 10),
  audioCtx: null,
  oscillator: null,
  gainNode: null
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch (_) {}
  return { ...DEFAULT_PROFILE };
}

function saveProfile(p) {
  state.profile = p;
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(p));
  updateHeaderPill();
}

function updateHeaderPill() {
  const pill = document.getElementById('active-user-pill');
  if (pill) {
    pill.textContent = `${state.profile.name} · ${state.profile.city}`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  updateHeaderPill();
  initTabs();
  initSubtabs();
  initModal();
  initTransitScrubber();
  initAudioBath();
  initCrucibleMeter();
  initGrimoire();

  await Promise.all([
    fetchAndRenderNatal(),
    fetchAndRenderDaily(),
    fetchAndRenderNumbers('444')
  ]);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
});

function initTabs() {
  const navBtns = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.tab-pane');

  function activateTab(tabId) {
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    panes.forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  document.querySelectorAll('[data-goto-tab]').forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.gotoTab));
  });
}

function initSubtabs() {
  const btns = document.querySelectorAll('.subtab-btn');
  const panes = document.querySelectorAll('.subtab-pane');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.toggle('active', b === btn));
      panes.forEach(p => p.classList.toggle('active', p.id === btn.dataset.subtab));
    });
  });
}

function initModal() {
  const modal = document.getElementById('birth-modal');
  const openBtn = document.getElementById('open-birth-modal-btn');
  const openBtn2 = document.getElementById('edit-chart-btn-2');
  const closeBtn = document.getElementById('close-birth-modal-btn');
  const form = document.getElementById('birth-form');

  function openModal() {
    document.getElementById('input-name').value = state.profile.name;
    document.getElementById('input-date').value = state.profile.date;
    document.getElementById('input-time').value = state.profile.time;
    document.getElementById('input-city').value = state.profile.city;
    modal.classList.remove('hidden');
  }

  openBtn?.addEventListener('click', openModal);
  openBtn2?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const updated = {
      name: document.getElementById('input-name').value.trim() || 'Sovereign Soul',
      date: document.getElementById('input-date').value,
      time: document.getElementById('input-time').value,
      city: document.getElementById('input-city').value.trim() || 'New York'
    };
    saveProfile(updated);
    modal.classList.add('hidden');
    await Promise.all([
      fetchAndRenderNatal(),
      fetchAndRenderTransits(state.transitDate),
      fetchAndRenderNumbers(state.selectedAngel)
    ]);
  });

  document.getElementById('download-wheel-btn')?.addEventListener('click', () => {
    if (!state.natalData?.svg) return;
    const blob = new Blob([state.natalData.svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.profile.name.replace(/\s+/g, '_')}_Natal_Crucible_Wheel.svg`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

function initTransitScrubber() {
  const dateInput = document.getElementById('transit-date-input');
  if (dateInput) dateInput.value = state.transitDate;

  function shiftDate(days) {
    const d = new Date(`${state.transitDate}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + days);
    state.transitDate = d.toISOString().slice(0, 10);
    if (dateInput) dateInput.value = state.transitDate;
    fetchAndRenderTransits(state.transitDate);
  }

  document.getElementById('transit-prev-btn')?.addEventListener('click', () => shiftDate(-1));
  document.getElementById('transit-next-btn')?.addEventListener('click', () => shiftDate(1));
  document.getElementById('transit-today-btn')?.addEventListener('click', () => {
    state.transitDate = new Date().toISOString().slice(0, 10);
    if (dateInput) dateInput.value = state.transitDate;
    fetchAndRenderTransits(state.transitDate);
  });
  dateInput?.addEventListener('change', (e) => {
    if (e.target.value) {
      state.transitDate = e.target.value;
      fetchAndRenderTransits(state.transitDate);
    }
  });
}

async function fetchAndRenderNatal() {
  try {
    const res = await fetch('/api/natal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.profile)
    });
    const data = await res.json();
    if (!data.success) return;
    state.natalData = data;

    // Auto-select Rising sign in daily horoscope viewer
    const risingSign = data.chart?.angles?.asc_details?.sign;
    if (risingSign) state.selectedSign = risingSign;

    renderNatalChartSection(data);
    renderPersonalTransitsList(data.helena?.live_personal_transits);
    if (state.dailyData) renderHoroscopeViewer();
  } catch (err) {
    console.error('Natal fetch error:', err);
  }
}

async function fetchAndRenderTransits(targetDate) {
  try {
    const res = await fetch('/api/transits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birth_date: state.profile.date,
        birth_time: state.profile.time,
        city: state.profile.city,
        target_date: targetDate
      })
    });
    const data = await res.json();
    if (data.success) renderPersonalTransitsList(data);
  } catch (err) {
    console.error('Transit radar error:', err);
  }
}

function renderPersonalTransitsList(radar) {
  const box = document.getElementById('personal-transits-list');
  if (!box || !radar) return;
  const list = radar.top_transits || [];
  if (list.length === 0) {
    box.innerHTML = `<div class="diagnostic-item"><div class="diagnostic-body">Zero tight-orb pressure points today — lock in your 2nd/8th house wealth habits and rest your nervous system.</div></div>`;
    return;
  }
  box.innerHTML = list.map(hit => `
    <div class="diagnostic-item">
      <div class="diagnostic-item-top">
        <span class="diagnostic-title">${hit.headline}</span>
        <span class="diagnostic-badge">${hit.badge}${hit.orb ? ' · ' + hit.orb : ''}</span>
      </div>
      <div class="diagnostic-body">${hit.detail}</div>
    </div>
  `).join('');
}

function renderNatalChartSection(data) {
  const { chart, helena, svg } = data;
  document.getElementById('chart-title-heading').textContent = `${data.name} — ${helena.big_three_summary.headline}`;
  document.getElementById('chart-meta-sub').textContent = `${chart.meta.birth_date} at ${chart.meta.birth_time} · ${chart.meta.resolved_location} · ${helena.big_three_summary.subheadline}`;
  document.getElementById('natal-wheel-wrap').innerHTML = svg;

  // Subtab 1: Big 3 + North/South Nodes
  const subBig3 = document.getElementById('sub-big3');
  subBig3.innerHTML = `
    <div class="helena-quote-box">${helena.big_three_summary.helena_intro}</div>
    <div class="stack-list">
      ${helena.big_three_summary.cards.map(c => `
        <div class="diagnostic-item">
          <div class="diagnostic-item-top">
            <span class="diagnostic-title">${c.slot}: ${c.placement}</span>
            <span class="diagnostic-badge">${c.degree_tag}</span>
          </div>
          <div class="diagnostic-body">${c.reading}</div>
          <div class="muted-note" style="margin-top:6px;margin-bottom:0;color:#FDE68A;">📍 ${c.house_focus}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Subtab 2: 2nd & 8th House Wealth
  const w = helena.venus_glamour_wealth;
  document.getElementById('sub-wealth').innerHTML = `
    <div class="helena-quote-box">${w.money_code}</div>
    <div class="stack-list">
      <div class="diagnostic-item">
        <div class="diagnostic-item-top">
          <span class="diagnostic-title">💰 ${w.second_house_ruler}</span>
          <span class="diagnostic-badge">2nd House Liquid Cash</span>
        </div>
        <div class="diagnostic-body"><strong>${w.eighth_house_ruler}</strong> — ${w.glamour_ritual}</div>
      </div>
      <div class="diagnostic-item">
        <div class="diagnostic-item-top">
          <span class="diagnostic-title">♀ ${w.venus_placement} · ♃ ${w.jupiter_placement}</span>
          <span class="diagnostic-badge">♂ ${w.mars_placement}</span>
        </div>
        <div class="diagnostic-body">Your Venus-Jupiter-Mars triangle shows how you attract capital, command high-ticket authority, and enforce contracts without shrinking.</div>
      </div>
      ${(w.wealth_degrees || []).map(d => `
        <div class="diagnostic-item">
          <div class="diagnostic-item-top">
            <span class="diagnostic-title">${d.body} at ${d.exact_label} (House ${d.house})</span>
            <span class="diagnostic-badge">${d.tag}</span>
          </div>
          <div class="diagnostic-body">${d.note}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Subtab 3: 8 Asteroids
  document.getElementById('sub-asteroids').innerHTML = `
    <div class="stack-list">
      ${(helena.asteroids_list || []).map(a => `
        <div class="diagnostic-item">
          <div class="diagnostic-item-top">
            <span class="diagnostic-title">${a.icon} ${a.label} in ${a.sign} · House ${a.house} (${a.exact_label}${a.retrograde ? ' ℞' : ''})</span>
            <span class="diagnostic-badge">${a.degree_theory.tag}</span>
          </div>
          <div class="diagnostic-body"><strong>Domain:</strong> ${a.domain}<br/>${a.helena_prescription}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Subtab 4: Truth & Karma Shield
  const sh = helena.protection_dashboard;
  document.getElementById('sub-shield').innerHTML = `
    <div class="helena-quote-box">
      <strong>${sh.pluto_placement}</strong> · <strong>${sh.saturn_placement}</strong><br/>
      Fixed-Sign Pressure Points: ${sh.fixed_pressure_points.join(' · ') || 'None in personal planets'}
    </div>
    <div class="stack-list">
      ${sh.cord_cutting_rx.map((rx, idx) => `
        <div class="diagnostic-item">
          <div class="diagnostic-item-top">
            <span class="diagnostic-title">🔥 Helena Diagnostic Rule #${idx + 1}</span>
            <span class="diagnostic-badge">Speaking Truth To Power</span>
          </div>
          <div class="diagnostic-body">${rx}</div>
        </div>
      `).join('')}
      ${(sh.vampire_degree_alerts || []).map(v => `
        <div class="diagnostic-item">
          <div class="diagnostic-item-top">
            <span class="diagnostic-title">${v.body} at ${v.exact_label} (House ${v.house})</span>
            <span class="diagnostic-badge">${v.tag}</span>
          </div>
          <div class="diagnostic-body">${v.note}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Subtab 5: Past Lives & Bali Retreat
  const anc = helena.derivative_ancestral;
  document.getElementById('sub-bali').innerHTML = `
    <div class="helena-quote-box">${anc.bali_retreat_prescription}</div>
    <div class="stack-list">
      <div class="diagnostic-item">
        <div class="diagnostic-item-top">
          <span class="diagnostic-title">🔮 Past-Life Regression &amp; All The Claires</span>
          <span class="diagnostic-badge">12H / 8H / South Node</span>
        </div>
        <div class="diagnostic-body">${anc.ancestral_reading}</div>
      </div>
      <div class="diagnostic-item">
        <div class="diagnostic-item-top">
          <span class="diagnostic-title">🌺 April 2027 Bali Astrology Retreat Preview</span>
          <span class="diagnostic-badge">Limited to 8–10 Souls</span>
        </div>
        <div class="diagnostic-body">
          <strong>${anc.fourth_house}</strong> · <strong>${anc.twelfth_house}</strong> · <strong>${anc.eighth_house}</strong><br/>
          5 private 1-on-1 sessions where your birth chart is placed under the microscope, luxury private accommodation (no shared rooms), sound healing, flower baths, and deep somatic restoration.
        </div>
      </div>
    </div>
  `;
}

async function fetchAndRenderDaily() {
  try {
    const res = await fetch('/api/daily');
    const data = await res.json();
    if (!data.success) return;
    state.dailyData = data;

    document.getElementById('sky-headline').textContent = data.sky_weather.headline;
    document.getElementById('sky-moon-phase').textContent = data.sky_weather.moon_phase;
    document.getElementById('helena-daily-brief').textContent = data.sky_weather.helena_daily_brief;
    document.getElementById('horoscope-date-badge').textContent = `${data.date} · Midnight Drop`;

    const pills = [
      `🧭 ${data.sky_weather.north_node}`,
      `⚡ ${data.sky_weather.pluto_macro}`,
      `🔥 ${data.sky_weather.mars_watch}`,
      ...(data.sky_weather.retrogrades.length ? [`℞ Retrogrades: ${data.sky_weather.retrogrades.join(', ')}`] : ['✨ Zero Personal Retrogrades'])
    ];
    document.getElementById('sky-pills-row').innerHTML = pills.map(p => `<span class="sky-chip">${p}</span>`).join('');

    // Render 12 sign selector buttons
    const grid = document.getElementById('sign-selector-grid');
    grid.innerHTML = Object.values(data.horoscopes).map(h => `
      <button class="sign-pill-btn ${h.sign === state.selectedSign ? 'active' : ''}" data-sign="${h.sign}">
        <span class="g">${h.glyph}</span>
        <span class="n">${h.sign}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.sign-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedSign = btn.dataset.sign;
        grid.querySelectorAll('.sign-pill-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderHoroscopeViewer();
      });
    });

    document.querySelectorAll('.lens-tab').forEach(lt => {
      lt.addEventListener('click', () => {
        state.selectedLens = lt.dataset.lens;
        document.querySelectorAll('.lens-tab').forEach(b => b.classList.toggle('active', b === lt));
        renderHoroscopeViewer();
      });
    });

    renderHoroscopeViewer();

    // Birthday card
    const bday = data.todays_birthday;
    if (bday) {
      document.getElementById('birthday-card-box').innerHTML = `
        <span class="eyebrow-tag">🎂 SOLAR RETURN SPOTLIGHT</span>
        <h3>${bday.title}</h3>
        <div class="helena-quote-box" style="margin-top:8px;"><strong>${bday.degree_tag}</strong> — ${bday.reading}</div>
      `;
    }
  } catch (err) {
    console.error('Daily horoscope error:', err);
  }
}

function renderHoroscopeViewer() {
  const card = document.getElementById('active-horoscope-card');
  if (!card || !state.dailyData?.horoscopes) return;
  const h = state.dailyData.horoscopes[state.selectedSign] || Object.values(state.dailyData.horoscopes)[0];
  const bodyCopy = h[state.selectedLens] || h.rising_sun_reading;

  card.innerHTML = `
    <div class="diagnostic-item-top" style="margin-bottom:8px;">
      <span class="diagnostic-title" style="font-size:1.05rem;">${h.glyph} ${h.sign} — ${h.vibe_tag}</span>
      <span class="diagnostic-badge">Portal ${h.angel_portal} · ${h.lucky_degree}</span>
    </div>
    <p class="muted-note" style="color:#FDE68A;margin-bottom:8px;">📍 ${h.power_houses}</p>
    <p class="diagnostic-body" style="font-size:0.92rem;margin-bottom:12px;">${bodyCopy}</p>
    <div class="helena-quote-box" style="margin-bottom:0;"><strong>Helena’s Verdict:</strong> ${h.helena_command}</div>
  `;
}

async function fetchAndRenderNumbers(code) {
  try {
    state.selectedAngel = code || '444';
    const res = await fetch(`/api/numbers?code=${encodeURIComponent(state.selectedAngel)}&birth_date=${encodeURIComponent(state.profile.date)}`);
    const data = await res.json();
    if (!data.success) return;

    const allCodes = ['444', '111', '222', '333', '555', '666', '777', '888', '999', '000'];
    const grid = document.getElementById('angel-buttons-grid');
    grid.innerHTML = allCodes.map(c => `
      <button class="angel-btn ${c === state.selectedAngel ? 'active' : ''}" data-code="${c}">${c}</button>
    `).join('');

    grid.querySelectorAll('.angel-btn').forEach(btn => {
      btn.addEventListener('click', () => fetchAndRenderNumbers(btn.dataset.code));
    });

    const a = data.requested_angel;
    document.getElementById('angel-result-box').innerHTML = `
      <div class="diagnostic-item-top" style="margin-bottom:8px;">
        <span class="diagnostic-title" style="font-size:1.06rem;">⚡ ${a.number} — ${a.title}</span>
        <span class="diagnostic-badge">${a.planet_pair}</span>
      </div>
      <p class="diagnostic-body" style="margin-bottom:10px;">${a.meaning}</p>
      <div class="helena-quote-box" style="margin-bottom:0;"><strong>Immediate Action:</strong> ${a.action}</div>
    `;

    const num = data.numerology;
    document.getElementById('numerology-grid-box').innerHTML = `
      <div class="num-stat-box"><div class="big-num">${num.life_path}</div><div class="lbl">Life Path</div></div>
      <div class="num-stat-box"><div class="big-num">${num.personal_year}</div><div class="lbl">Personal Year</div></div>
      <div class="num-stat-box"><div class="big-num">${num.personal_month}</div><div class="lbl">Personal Month</div></div>
      <div class="num-stat-box"><div class="big-num">${num.personal_day}</div><div class="lbl">Personal Day</div></div>
    `;

    document.getElementById('numerology-details-box').innerHTML = `
      <div class="diagnostic-item">
        <div class="diagnostic-title" style="margin-bottom:4px;">🧭 ${num.life_path_meaning}</div>
        <div class="diagnostic-body">${num.personal_year_meaning}</div>
      </div>
      <div class="diagnostic-item">
        <div class="diagnostic-title" style="margin-bottom:4px;">⚡ 20-Year Pluto in Aquarius Macro Shift</div>
        <div class="diagnostic-body">${num.macro_cycle_note}</div>
      </div>
    `;
  } catch (err) {
    console.error('Numbers error:', err);
  }
}

function initAudioBath() {
  const orb = document.getElementById('breathing-orb');
  const label = document.getElementById('breath-instruction');
  const freqBtns = document.querySelectorAll('.freq-btn[data-freq]');
  const stopBtn = document.getElementById('stop-audio-btn');

  function stopSound() {
    if (state.oscillator) {
      try { state.oscillator.stop(); } catch (_) {}
      state.oscillator = null;
    }
    orb?.classList.remove('pulsing');
    if (label) label.textContent = 'Tap a Frequency to Begin';
    freqBtns.forEach(b => b.classList.remove('active'));
  }

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const hz = Number(btn.dataset.freq);
      stopSound();
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!state.audioCtx) state.audioCtx = new AudioContext();
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(hz, state.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, state.audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      state.oscillator = osc;
      state.gainNode = gain;
      btn.classList.add('active');
      orb?.classList.add('pulsing');
      if (label) label.textContent = `${hz} Hz Active · Inhale 4s · Hold 4s · Exhale 6s`;
    });
  });

  stopBtn?.addEventListener('click', stopSound);
}

function initCrucibleMeter() {
  const listEl = document.getElementById('softlife-checklist');
  const circle = document.getElementById('softlife-progress-circle');
  const pctText = document.getElementById('softlife-pct-text');
  const titleEl = document.getElementById('softlife-status-title');
  const descEl = document.getElementById('softlife-status-desc');

  let checkedMap = {};
  try {
    checkedMap = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS) || '{}');
  } catch (_) {}

  function renderMeter() {
    const doneCount = CRUCIBLE_HABITS.filter(h => checkedMap[h.id]).length;
    const pct = Math.round((doneCount / CRUCIBLE_HABITS.length) * 100);
    const circum = 364.4;
    const offset = circum - (pct / 100) * circum;
    if (circle) circle.style.strokeDashoffset = String(offset);
    if (pctText) pctText.textContent = `${pct}%`;

    if (pct === 100) {
      titleEl.textContent = '👑 100% Sovereign — People Aren’t Ready For You';
      descEl.textContent = 'Karma unplugged, boundaries locked, 2nd/8th house power fully online.';
    } else if (pct >= 50) {
      titleEl.textContent = '🔥 Alchemizing Pain Into Power';
      descEl.textContent = 'Your frequency is rising — finish the remaining non-negotiables to seal the portal.';
    } else {
      titleEl.textContent = '🔬 Put Your Habits Under The Microscope';
      descEl.textContent = '"Clean up your shit" — check off each daily sovereignty protocol below.';
    }

    listEl.innerHTML = CRUCIBLE_HABITS.map(h => `
      <label class="check-row ${checkedMap[h.id] ? 'done' : ''}">
        <input type="checkbox" data-id="${h.id}" ${checkedMap[h.id] ? 'checked' : ''} />
        <span>${h.label}</span>
      </label>
    `).join('');

    listEl.querySelectorAll('input[type="checkbox"]').forEach(inp => {
      inp.addEventListener('change', () => {
        checkedMap[inp.dataset.id] = inp.checked;
        localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(checkedMap));
        renderMeter();
      });
    });
  }

  document.getElementById('reset-softlife-btn')?.addEventListener('click', () => {
    checkedMap = {};
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(checkedMap));
    renderMeter();
  });

  renderMeter();
}

function initGrimoire() {
  const textarea = document.getElementById('diary-textarea');
  const listEl = document.getElementById('diary-entries-list');

  function getEntries() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.GRIMOIRE) || '[]');
    } catch (_) {
      return [];
    }
  }

  function renderEntries() {
    const entries = getEntries();
    if (!entries.length) {
      listEl.innerHTML = `<div class="diagnostic-item"><div class="diagnostic-body">Your private Shadow Grimoire is empty. Record a North Node realization or 444 download above.</div></div>`;
      return;
    }
    listEl.innerHTML = entries.map((e, i) => `
      <div class="diagnostic-item">
        <div class="diagnostic-item-top">
          <span class="diagnostic-title">📓 ${e.date} · ${e.sign || ''}</span>
          <button class="btn-chip-xs" data-del="${i}">Delete</button>
        </div>
        <div class="diagnostic-body">${e.text}</div>
      </div>
    `).join('');

    listEl.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        const arr = getEntries();
        arr.splice(Number(btn.dataset.del), 1);
        localStorage.setItem(STORAGE_KEYS.GRIMOIRE, JSON.stringify(arr));
        renderEntries();
      });
    });
  }

  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      textarea.value = chip.dataset.prompt;
      textarea.focus();
    });
  });

  document.getElementById('save-diary-btn')?.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) return;
    const entries = getEntries();
    entries.unshift({
      date: new Date().toLocaleString(),
      sign: state.natalData?.helena?.big_three_summary?.headline || state.selectedSign,
      text
    });
    localStorage.setItem(STORAGE_KEYS.GRIMOIRE, JSON.stringify(entries.slice(0, 30)));
    textarea.value = '';
    renderEntries();
  });

  document.getElementById('export-ig-card-btn')?.addEventListener('click', () => {
    const text = textarea.value.trim() || `"The North Node in astrology really does tell you what the f*** you're supposed to be doing on Earth. Unplug the karma and alchemize your pain into power."`;
    exportStoryCardPng(text);
  });

  renderEntries();
}

function exportStoryCardPng(quoteText) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  // Obsidian & Plum Gradient
  const grad = ctx.createRadialGradient(540, 420, 80, 540, 675, 900);
  grad.addColorStop(0, '#2B1248');
  grad.addColorStop(0.55, '#120821');
  grad.addColorStop(1, '#07040C');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1350);

  // Gold Border
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 5;
  ctx.strokeRect(48, 48, 984, 1254);

  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 30px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🔬 UNDER THE MICROSCOPE · 444 PORTAL', 540, 145);

  const big3 = state.natalData?.helena?.big_three_summary?.headline || `${state.selectedSign} Sovereign Blueprint`;
  ctx.fillStyle = '#FDE68A';
  ctx.font = 'bold 42px Georgia, serif';
  ctx.fillText(big3, 540, 225);

  // Wrap text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '38px Georgia, serif';
  const words = quoteText.split(' ');
  let line = '';
  let y = 420;
  for (const w of words) {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > 840) {
      ctx.fillText(line.trim(), 540, y);
      line = w + ' ';
      y += 58;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line.trim(), 540, y);

  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('HELENA HATHOR · @helenahathorastrology444', 540, 1185);
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '26px sans-serif';
  ctx.fillText('The Natal Crucible ✦ Unplug The Karma & Turn Pain Into Power', 540, 1235);

  const link = document.createElement('a');
  link.download = 'Helena_Hathor_Crucible_Card.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
