// The Natal Crucible — Interactive Flashcard Mastery Engine
// Audio Synthesizer (Zero dependencies, pure Web Audio API)
class SoundFX {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  flip() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch(e) {}
  }
  master() {
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.25);
      });
    } catch(e) {}
  }
}

const sfx = new SoundFX();

// State
let allDecks = [];
let currentDeck = null;
let activeCards = [];
let currentIndex = 0;
let isFlipped = false;
let stats = { mastered: 0, review: 0, total: 0 };

// Load Decks (Default + LocalStorage)
function loadDecks() {
  allDecks = [...DEFAULT_DECKS];
  try {
    const custom = JSON.parse(localStorage.getItem('natal_mind_custom_decks') || '[]');
    if (Array.isArray(custom)) {
      allDecks.push(...custom);
    }
  } catch(e) {
    console.error('Error loading custom decks', e);
  }
}

// Render Decks Grid
function renderDeckGrid() {
  const grid = document.getElementById('deck-grid');
  grid.innerHTML = '';

  allDecks.forEach((deck) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'deck-card';
    cardEl.innerHTML = `
      <div class="deck-top">
        <div class="deck-icon-badge">${deck.icon || '✨'}</div>
        <div class="deck-count">${deck.cards.length} Cards</div>
      </div>
      <h3 class="deck-title">${deck.title}</h3>
      <div class="deck-tagline">${deck.tagline || ''}</div>
      <p class="deck-desc">${deck.description || ''}</p>
      <div class="deck-footer">
        <span class="deck-progress-text">Self-Study Deck</span>
        <button class="btn-study-deck">Study Now ➔</button>
      </div>
    `;
    cardEl.addEventListener('click', () => startStudy(deck));
    grid.appendChild(cardEl);
  });
}

// Start Study Session
function startStudy(deck) {
  currentDeck = deck;
  activeCards = deck.cards.map((c, idx) => ({ ...c, id: idx }));
  currentIndex = 0;
  isFlipped = false;
  stats = { mastered: 0, review: 0, total: deck.cards.length };

  document.getElementById('study-title').textContent = deck.title;
  showScreen('screen-study');
  renderCurrentCard();
}

// Render Current Card
function renderCurrentCard() {
  const wrapper = document.getElementById('card-wrapper');
  isFlipped = false;
  wrapper.classList.remove('flipped');

  if (activeCards.length === 0) {
    showCompleteScreen();
    return;
  }

  const card = activeCards[currentIndex];
  document.getElementById('card-front-text').textContent = card.q;
  document.getElementById('card-back-text').textContent = card.a;
  document.getElementById('card-front-hint').textContent = card.hint || 'Core Insight';
  document.getElementById('card-back-hint').textContent = card.hint || 'Synthesis';

  // Progress Bar
  const total = currentDeck.cards.length;
  const remaining = activeCards.length;
  const completed = total - remaining;
  const pct = Math.round((completed / total) * 100);
  document.getElementById('progress-fill').style.width = `${pct}%`;
  document.getElementById('progress-label').textContent = `${currentIndex + 1} of ${remaining} remaining`;
}

// Flip Card
function flipCard() {
  const wrapper = document.getElementById('card-wrapper');
  isFlipped = !isFlipped;
  wrapper.classList.toggle('flipped', isFlipped);
  sfx.flip();
}

// Answer: Known (Mastered)
function markKnown() {
  if (activeCards.length === 0) return;
  sfx.master();
  stats.mastered++;
  activeCards.splice(currentIndex, 1);
  if (currentIndex >= activeCards.length) {
    currentIndex = 0;
  }
  renderCurrentCard();
}

// Answer: Review Again
function markReview() {
  if (activeCards.length === 0) return;
  sfx.flip();
  stats.review++;
  // Move current card to end of review queue
  const card = activeCards.splice(currentIndex, 1)[0];
  activeCards.push(card);
  renderCurrentCard();
}

// Completion Screen
function showCompleteScreen() {
  document.getElementById('stat-mastered').textContent = stats.mastered;
  document.getElementById('stat-review').textContent = stats.review;
  showScreen('screen-complete');
}

// Switch Screens
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Robust CSV Parser (Supports Quotes, Commas, NotebookLM exports)
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];

  const cards = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Split by comma outside of quotes
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index === regex.lastIndex) regex.lastIndex++;
      let val = match[1] || '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      matches.push(val.trim());
      if (regex.lastIndex >= line.length) break;
    }

    if (matches.length >= 2) {
      const q = matches[0];
      const a = matches[1];
      const hint = matches[2] || 'NotebookLM Card';
      if (q && a && !q.toLowerCase().startsWith('question') && !q.toLowerCase().startsWith('front')) {
        cards.push({ q, a, hint });
      }
    }
  }
  return cards;
}

// Import File Handler
function handleCSVUpload(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const cards = parseCSV(content);
    if (cards.length === 0) {
      alert('Could not find flashcards in this CSV. Ensure columns are Question, Answer.');
      return;
    }

    const deckName = prompt('Enter a name for this NotebookLM Deck:', file.name.replace(/\.[^/.]+$/, '')) || 'Custom Deck';
    const newDeck = {
      id: 'custom-' + Date.now(),
      title: deckName,
      icon: '📓',
      tagline: 'Imported NotebookLM Deck',
      description: `Imported with ${cards.length} cards from ${file.name}.`,
      cards: cards
    };

    const existing = JSON.parse(localStorage.getItem('natal_mind_custom_decks') || '[]');
    existing.push(newDeck);
    localStorage.setItem('natal_mind_custom_decks', JSON.stringify(existing));

    loadDecks();
    renderDeckGrid();
    startStudy(newDeck);
  };
  reader.readAsText(file);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadDecks();
  renderDeckGrid();

  // Flip Click
  document.getElementById('card-wrapper').addEventListener('click', flipCard);
  document.getElementById('btn-flip-action').addEventListener('click', flipCard);

  // Know / Review
  document.getElementById('btn-know-action').addEventListener('click', markKnown);
  document.getElementById('btn-again-action').addEventListener('click', markReview);

  // Back to Decks
  document.getElementById('btn-back-home').addEventListener('click', () => {
    showScreen('screen-home');
  });
  document.getElementById('btn-study-again').addEventListener('click', () => {
    if (currentDeck) startStudy(currentDeck);
  });
  document.getElementById('btn-back-decks').addEventListener('click', () => {
    showScreen('screen-home');
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    const studyScreen = document.getElementById('screen-study');
    if (!studyScreen.classList.contains('active')) return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'Digit1' || e.code === 'ArrowLeft') {
      e.preventDefault();
      markReview();
    } else if (e.code === 'Digit2' || e.code === 'ArrowRight') {
      e.preventDefault();
      markKnown();
    }
  });

  // CSV Drag and Drop
  const dropZone = document.getElementById('importer-dropzone');
  const fileInput = document.getElementById('csv-file-input');

  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleCSVUpload(e.target.files[0]);
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) handleCSVUpload(e.dataTransfer.files[0]);
  });
});

