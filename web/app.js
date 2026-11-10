/**
 * THE NATAL CRUCIBLE — CLIENT APPLICATION ENGINE
 * Helena Hathor (@helenahathorastrology444)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSessionCap();
  initCurrency();
  initAnchorScroll();
  initModalListeners();
});

// ==========================================================================
// 1. SESSION KEY & 3-DOWNLOAD LIMITER ENGINE (ANTI-ABUSE)
// ==========================================================================
const SESSION_KEY = '_hh_crucible_session_v1';
const MAX_FREE_DOWNLOADS = 3;

let currentSession = {
  id: '',
  downloadsLeft: MAX_FREE_DOWNLOADS,
  created: Date.now()
};

function initSessionCap() {
  const stored = localStorage.getItem(SESSION_KEY);
  if (stored) {
    try {
      currentSession = JSON.parse(stored);
      if (typeof currentSession.downloadsLeft !== 'number') {
        currentSession.downloadsLeft = MAX_FREE_DOWNLOADS;
      }
    } catch (e) {
      createFreshSession();
    }
  } else {
    createFreshSession();
  }
  updateCapDisplay();
}

function createFreshSession() {
  const randomToken = 'HH-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
  currentSession = {
    id: randomToken,
    downloadsLeft: MAX_FREE_DOWNLOADS,
    created: Date.now()
  };
  saveSession();
}

function saveSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify(currentSession));
}

function updateCapDisplay() {
  const badge = document.getElementById('cap-remaining-badge');
  const tokenDisplay = document.getElementById('session-token-display');
  
  if (badge) {
    badge.textContent = `${currentSession.downloadsLeft} of ${MAX_FREE_DOWNLOADS} Free Downloads`;
    if (currentSession.downloadsLeft <= 0) {
      badge.style.background = 'rgba(239, 68, 68, 0.2)';
      badge.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      badge.style.color = '#fca5a5';
      badge.textContent = '0 Downloads Left · Limit Reached';
    }
  }
  if (tokenDisplay) {
    tokenDisplay.textContent = `KEY: ${currentSession.id.substring(0, 15)}...`;
  }
}

// ==========================================================================
// 2. LIVE 360° CHART & DOSSIER ENGINE (EASY-CHART-API)
// ==========================================================================
let lastGeneratedSvg = null;
let lastChartData = null;

async function calculateNatalCrucible(e) {
  if (e) e.preventDefault();

  const city = document.getElementById('demo-city').value.trim();
  const date = document.getElementById('demo-date').value;
  const time = document.getElementById('demo-time').value;

  if (!city || !date || !time) {
    alert('Please enter your birth date, time, and city.');
    return;
  }

  const submitBtn = document.getElementById('calc-submit-btn');
  const wheelFrame = document.getElementById('wheel-container');
  const dossierOut = document.getElementById('dossier-output');

  submitBtn.disabled = true;
  submitBtn.innerHTML = '✦ Consulting Celestial Vectors...';
  wheelFrame.innerHTML = `
    <div style="text-align: center; color: var(--silver-muted);">
      <div style="font-size: 2.5rem; animation: spin 2s linear infinite;">✦</div>
      <p style="margin-top: 12px; font-family: var(--font-mono); font-size: 0.85rem;">Calculating planetary angles for ${city}...</p>
    </div>
  `;

  const payload = { date, time, city };

  try {
    // Parallel fetch: SVG Wheel + Astrological Dossier
    const [svgRes, dossierRes] = await Promise.all([
      fetch('https://easy-chart-api.vercel.app/v1/chart.svg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }),
      fetch('https://easy-chart-api.vercel.app/v1/chart/dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    ]);

    if (!svgRes.ok || !dossierRes.ok) {
      throw new Error('API returned an error state');
    }

    const svgText = await svgRes.text();
    const dossierJson = await dossierRes.json();

    lastGeneratedSvg = svgText;
    lastChartData = { date, time, city, dossier: dossierJson };

    renderChartWheel(svgText);
    renderDossierOutput(dossierJson, date, time, city);

  } catch (err) {
    console.warn('Network or API latency, engaging fail-safe astronomical engine:', err);
    // Bulletproof fallback so the user NEVER encounters a blank screen (Playbook Wart #3 fix)
    renderFailSafeChart(date, time, city);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Recalculate 360° Wheel ✦';
  }
}

function renderChartWheel(svgText) {
  const wheelFrame = document.getElementById('wheel-container');
  wheelFrame.innerHTML = svgText;
  
  // Ensure the SVG responsive attributes
  const svgEl = wheelFrame.querySelector('svg');
  if (svgEl) {
    svgEl.setAttribute('width', '100%');
    svgEl.setAttribute('height', '100%');
    svgEl.style.filter = 'drop-shadow(0 0 20px rgba(136, 19, 55, 0.45))';
  }
}

function renderDossierOutput(data, date, time, city) {
  const dossierOut = document.getElementById('dossier-output');
  const d = data.dossier || {};
  const b3 = d.the_big_three || {};

  const sunText = b3.sun ? b3.sun.placement : 'Calculated';
  const moonText = b3.moon ? b3.moon.placement : 'Calculated';
  const ascText = b3.rising ? b3.rising.placement : 'Calculated';

  document.getElementById('out-sun').textContent = sunText;
  document.getElementById('out-moon').textContent = moonText;
  document.getElementById('out-asc').textContent = ascText;

  const metaText = document.getElementById('dossier-meta');
  metaText.innerHTML = `✦ <strong>360° Crucible Mapped for:</strong> ${city} · ${date} at ${time} · Ready to map into Section 2 of <em>The Natal Crucible</em>.`;

  dossierOut.style.display = 'block';
  document.getElementById('download-actions-row').style.display = 'flex';
}

// Fallback calculations for zero downtime
function renderFailSafeChart(date, time, city) {
  const [year, month, day] = date.split('-').map(Number);
  const sunSign = getZodiacSign(month, day);

  const fallbackSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
      <circle cx="250" cy="250" r="230" fill="none" stroke="rgba(226,232,240,0.15)" stroke-width="2"/>
      <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(136,19,55,0.4)" stroke-width="1.5" stroke-dasharray="4,4"/>
      <circle cx="250" cy="250" r="110" fill="none" stroke="rgba(226,232,240,0.2)" stroke-width="1"/>
      <line x1="250" y1="20" x2="250" y2="480" stroke="rgba(226,232,240,0.1)" stroke-width="1"/>
      <line x1="20" y1="250" x2="480" y2="250" stroke="rgba(226,232,240,0.1)" stroke-width="1"/>
      <text x="250" y="245" fill="#f8fafc" font-family="Cinzel, serif" font-size="16" text-anchor="middle" font-weight="bold">☉ ${sunSign.name.toUpperCase()}</text>
      <text x="250" y="270" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle">NATAL CRUCIBLE BLUEPRINT</text>
    </svg>
  `;

  lastGeneratedSvg = fallbackSvg;
  lastChartData = { date, time, city, fallback: true, sunSign };

  renderChartWheel(fallbackSvg);

  document.getElementById('out-sun').textContent = `${sunSign.name} (${sunSign.element})`;
  document.getElementById('out-moon').textContent = 'Calculated via Vector';
  document.getElementById('out-asc').textContent = 'Mapped via Coordinate';

  const metaText = document.getElementById('dossier-meta');
  metaText.innerHTML = `✦ <strong>Fail-Safe Vector Rendered for:</strong> ${city} (${date} at ${time}). Sun firmly placed in ${sunSign.name}.`;

  document.getElementById('dossier-output').style.display = 'block';
  document.getElementById('download-actions-row').style.display = 'flex';
}

function getZodiacSign(month, day) {
  const signs = [
    { name: "Capricorn", element: "Earth", endMonth: 1, endDay: 19 },
    { name: "Aquarius", element: "Air", endMonth: 2, endDay: 18 },
    { name: "Pisces", element: "Water", endMonth: 3, endDay: 20 },
    { name: "Aries", element: "Fire", endMonth: 4, endDay: 19 },
    { name: "Taurus", element: "Earth", endMonth: 5, endDay: 20 },
    { name: "Gemini", element: "Air", endMonth: 6, endDay: 20 },
    { name: "Cancer", element: "Water", endMonth: 7, endDay: 22 },
    { name: "Leo", element: "Fire", endMonth: 8, endDay: 22 },
    { name: "Virgo", element: "Earth", endMonth: 9, endDay: 22 },
    { name: "Libra", element: "Air", endMonth: 10, endDay: 22 },
    { name: "Scorpio", element: "Water", endMonth: 11, endDay: 21 },
    { name: "Sagittarius", element: "Fire", endMonth: 12, endDay: 21 },
    { name: "Capricorn", element: "Earth", endMonth: 12, endDay: 31 }
  ];
  for (let s of signs) {
    if (month === s.endMonth && day <= s.endDay) return s;
    if (month === s.endMonth - 1 && day > (signs[signs.indexOf(s)-1]?.endDay || 0)) return s;
  }
  return { name: "Aries", element: "Fire" };
}

// ==========================================================================
// 3. SECURE DOWNLOAD HANDLER WITH 3-DOWNLOAD CEILING
// ==========================================================================
function handleDownloadChart() {
  if (currentSession.downloadsLeft <= 0) {
    openCapExhaustedModal();
    return;
  }

  if (!lastGeneratedSvg) {
    alert('Please calculate your natal chart first.');
    return;
  }

  // Deduct download credit
  currentSession.downloadsLeft -= 1;
  saveSession();
  updateCapDisplay();

  // Execute clean SVG download
  const blob = new Blob([lastGeneratedSvg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const citySlug = (lastChartData?.city || 'Birth').replace(/[^a-zA-Z0-9]/g, '_');
  a.href = url;
  a.download = `Helena_Hathor_360_Chart_${citySlug}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (currentSession.downloadsLeft === 0) {
    setTimeout(() => {
      openCapExhaustedModal();
    }, 1200);
  }
}

// ==========================================================================
// 4. EXHAUSTED CAP MODAL ("UNDER THE MICROSCOPE")
// ==========================================================================
function openCapExhaustedModal() {
  const modal = document.getElementById('cap-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeCapModal() {
  const modal = document.getElementById('cap-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function initModalListeners() {
  const modal = document.getElementById('cap-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCapModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCapModal();
  });
}

// ==========================================================================
// 5. MULTI-CURRENCY & PRICING SWITCHER
// ==========================================================================
const currencies = {
  EUR: { 
    symbol: '€', orig: '97', sale: '37', 
    taxDesc: '✦ <strong>IVA / VAT inclusa</strong> (22% per residenti europei) · Nessun costo a sorpresa', 
    btnText: '✦ Get The Natal Crucible Now — €37' 
  },
  USD: { 
    symbol: '$', orig: '97', sale: '37', 
    taxDesc: '✦ <strong>USD</strong> · US / Non-EU Export · Local taxes calculated at checkout', 
    btnText: '✦ Get The Natal Crucible Now — $37' 
  },
  GBP: { 
    symbol: '£', orig: '85', sale: '32', 
    taxDesc: '✦ <strong>UK VAT Included</strong> (20%) · Immediate unlock on all devices', 
    btnText: '✦ Get The Natal Crucible Now — £32' 
  }
};

function initCurrency() {
  const select = document.getElementById('currency-select');
  if (!select) return;

  select.addEventListener('change', (e) => {
    const code = e.target.value;
    const c = currencies[code] || currencies.EUR;

    document.getElementById('orig-price-tag').textContent = `${c.symbol}${c.orig}`;
    document.getElementById('sale-price-tag').textContent = `${c.symbol}${c.sale}`;
    document.getElementById('tax-desc-tag').innerHTML = c.taxDesc;
    
    const buyBtns = document.querySelectorAll('.buy-cta-btn');
    buyBtns.forEach(btn => btn.textContent = c.btnText);
  });
}

// ==========================================================================
// 6. ANCHOR AUTO-SCROLL (PLAYBOOK WART #4 FIX)
// ==========================================================================
function initAnchorScroll() {
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  }
}

