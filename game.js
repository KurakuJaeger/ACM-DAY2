/* ============================================================
   TYPESHIFT TRIVIA — game.js
   State management · GSAP animations · SFX · Leaderboard
   ============================================================ */

'use strict';

/* ─────────────────────────────────────
   TRIVIA DATABASE
   ───────────────────────────────────── */
const TRIVIA = {
  ph: {
    easy: [
      { q: "Ano ang kabisera ng Pilipinas?", choices: ["Cebu", "Davao", "Manila", "Quezon City"], a: 2, cat: "HEOGRAPIYA" },
      { q: "Sino ang pambansang bayani ng Pilipinas?", choices: ["Andres Bonifacio", "Jose Rizal", "Emilio Aguinaldo", "Apolinario Mabini"], a: 1, cat: "KASAYSAYAN" },
      { q: "Ilang isla ang mayroon ang Pilipinas?", choices: ["5,000", "7,107", "9,234", "6,500"], a: 1, cat: "HEOGRAPIYA" },
      { q: "Ano ang pambansang wika ng Pilipinas?", choices: ["Cebuano", "Ilocano", "Filipino", "Tagalog"], a: 2, cat: "KULTURA" },
      { q: "Sino ang unang Pangulo ng Pilipinas?", choices: ["Manuel Quezon", "Emilio Aguinaldo", "Jose Rizal", "Sergio Osmeña"], a: 1, cat: "KASAYSAYAN" },
      { q: "Ano ang pambansang hayop ng Pilipinas?", choices: ["Agila ng Pilipinas", "Carabao", "Tamaraw", "Pawikan"], a: 0, cat: "KALIKASAN" },
      { q: "Kailan ipinagdiriwang ang Araw ng Kalayaan ng Pilipinas?", choices: ["June 12", "July 4", "August 21", "September 21"], a: 0, cat: "KASAYSAYAN" },
      { q: "Ano ang pambansang bulaklak ng Pilipinas?", choices: ["Rosal", "Sampaguita", "Gumamela", "Ilang-Ilang"], a: 1, cat: "KULTURA" },
      { q: "Sino ang sumulat ng 'Noli Me Tangere'?", choices: ["Andres Bonifacio", "Jose Rizal", "Marcelo del Pilar", "Graciano Lopez Jaena"], a: 1, cat: "PANITIKAN" },
      { q: "Ano ang pinakamatagal na ilog sa Pilipinas?", choices: ["Pasig River", "Pampanga River", "Cagayan River", "Agusan River"], a: 2, cat: "HEOGRAPIYA" },
    ],
    medium: [
      { q: "Sa anong taon naitatag ang Katipunan?", choices: ["1890", "1892", "1896", "1900"], a: 1, cat: "KASAYSAYAN" },
      { q: "Alin ang pinakamalaking lawa sa Pilipinas?", choices: ["Laguna de Bay", "Danao Lake", "Lanao Lake", "Taal Lake"], a: 0, cat: "HEOGRAPIYA" },
      { q: "Sino ang nagtatag ng Katipunan?", choices: ["Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo", "Apolinario Mabini"], a: 1, cat: "KASAYSAYAN" },
      { q: "Anong bansa ang umangkin sa Pilipinas bago ang mga Amerikano?", choices: ["Portugal", "England", "Spain", "Netherlands"], a: 2, cat: "KASAYSAYAN" },
      { q: "Ano ang kahulugan ng 'Baybayin'?", choices: ["Lumang kalendaryo", "Sinaunang alpabetong Pilipino", "Uri ng sayaw", "Tradisyonal na pagkain"], a: 1, cat: "KULTURA" },
      { q: "Saan nagaganap ang taunang Ati-Atihan Festival?", choices: ["Cebu", "Iloilo", "Kalibo, Aklan", "Davao"], a: 2, cat: "KULTURA" },
      { q: "Kailan nagsimula ang EDSA People Power Revolution?", choices: ["1983", "1985", "1986", "1987"], a: 2, cat: "PULITIKA" },
      { q: "Ano ang tinatawag na 'Pearl of the Orient Seas'?", choices: ["Cebu", "Pilipinas", "Palawan", "Mindanao"], a: 1, cat: "KULTURA" },
      { q: "Sino ang naging Pangulo matapos ang People Power Revolution?", choices: ["Ferdinand Marcos", "Cory Aquino", "Fidel Ramos", "Joseph Estrada"], a: 1, cat: "PULITIKA" },
      { q: "Ano ang unang naisulat na tula sa wikang Filipino?", choices: ["Florante at Laura", "Ibong Adarna", "Doctrina Christiana", "Biag ni Lam-ang"], a: 3, cat: "PANITIKAN" },
    ],
    hard: [
      { q: "Sa anong lungsod isinilang si Jose Rizal?", choices: ["Calamba, Laguna", "San Miguel, Bulacan", "Malolos, Bulacan", "Lipa, Batangas"], a: 0, cat: "KASAYSAYAN" },
      { q: "Ilang miyembro ang orihinal na Katipunan nang itatag ito?", choices: ["5", "7", "9", "12"], a: 1, cat: "KASAYSAYAN" },
      { q: "Ano ang tunay na pangalan ni Andres Bonifacio?", choices: ["Andres Eduardo Bonifacio", "Andres Procopio Bonifacio", "Andres Manuel Bonifacio", "Andres Joseph Bonifacio"], a: 1, cat: "KASAYSAYAN" },
      { q: "Saan natapos ang buhay ni Jose Rizal sa pamamagitan ng pagbabaril?", choices: ["Intramuros", "Luneta Park", "Fort Santiago", "Malacañang"], a: 1, cat: "KASAYSAYAN" },
      { q: "Anong dekada ang tinatawag na 'Golden Age of Philippine Cinema'?", choices: ["1940s", "1950s", "1960s", "1970s"], a: 1, cat: "KULTURA" },
      { q: "Sino ang tinaguriang 'Father of Philippine Democracy'?", choices: ["Manuel Quezon", "Claro M. Recto", "Manuel Roxas", "Sergio Osmeña"], a: 0, cat: "PULITIKA" },
      { q: "Alin ang pinakamataas na bundok sa Pilipinas?", choices: ["Mt. Mayon", "Mt. Apo", "Mt. Pulag", "Mt. Pinatubo"], a: 1, cat: "HEOGRAPIYA" },
      { q: "Sa anong taon sumiklab ang Bulkang Pinatubo?", choices: ["1989", "1990", "1991", "1992"], a: 2, cat: "KASAYSAYAN" },
      { q: "Ano ang 'Ilustrado' movement?", choices: ["Relihiyosong samahan", "Grupong nagtataguyod ng reporma laban sa kolonyalismo", "Sandatahang kilusan", "Pampulitikang partido"], a: 1, cat: "KASAYSAYAN" },
      { q: "Sino ang isinulat ng 'Florante at Laura'?", choices: ["Jose Rizal", "Francisco Balagtas", "Lope K. Santos", "Amado Hernandez"], a: 1, cat: "PANITIKAN" },
    ]
  },

  academic: {
    easy: [
      { q: "What is the chemical symbol for water?", choices: ["HO", "H2O", "WA", "HO2"], a: 1, cat: "CHEMISTRY" },
      { q: "How many sides does a hexagon have?", choices: ["5", "6", "7", "8"], a: 1, cat: "MATH" },
      { q: "What planet is known as the Red Planet?", choices: ["Venus", "Jupiter", "Mars", "Saturn"], a: 2, cat: "SCIENCE" },
      { q: "What is the square root of 64?", choices: ["6", "7", "8", "9"], a: 2, cat: "MATH" },
      { q: "What does HTML stand for?", choices: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Method Language"], a: 0, cat: "IT" },
      { q: "Which gas do plants absorb during photosynthesis?", choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], a: 2, cat: "BIOLOGY" },
      { q: "What is 15% of 200?", choices: ["20", "25", "30", "35"], a: 2, cat: "MATH" },
      { q: "What is the powerhouse of the cell?", choices: ["Nucleus", "Ribosome", "Mitochondria", "Cell Wall"], a: 2, cat: "BIOLOGY" },
      { q: "What language runs natively in web browsers?", choices: ["Python", "Java", "C++", "JavaScript"], a: 3, cat: "IT" },
      { q: "What is the boiling point of water in Celsius?", choices: ["90°C", "95°C", "100°C", "110°C"], a: 2, cat: "PHYSICS" },
    ],
    medium: [
      { q: "What is the time complexity of Binary Search?", choices: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"], a: 2, cat: "PROGRAMMING" },
      { q: "What is the derivative of sin(x)?", choices: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"], a: 1, cat: "MATH" },
      { q: "Which data structure uses LIFO order?", choices: ["Queue", "Stack", "Linked List", "Tree"], a: 1, cat: "IT" },
      { q: "What is Newton's 2nd Law of Motion?", choices: ["F=ma", "E=mc²", "P=mv", "W=Fd"], a: 0, cat: "PHYSICS" },
      { q: "What is the pH of a neutral solution?", choices: ["6", "7", "8", "14"], a: 1, cat: "CHEMISTRY" },
      { q: "What does CPU stand for?", choices: ["Core Processing Unit", "Central Processing Unit", "Central Program Utility", "Computer Processing Unit"], a: 1, cat: "IT" },
      { q: "Solve: If 3x + 6 = 21, what is x?", choices: ["3", "4", "5", "6"], a: 2, cat: "MATH" },
      { q: "What is the process of cell division called?", choices: ["Meiosis", "Osmosis", "Mitosis", "Diffusion"], a: 2, cat: "BIOLOGY" },
      { q: "What is the most common element in Earth's crust?", choices: ["Iron", "Silicon", "Oxygen", "Aluminum"], a: 2, cat: "CHEMISTRY" },
      { q: "In what base does binary use?", choices: ["Base 2", "Base 8", "Base 10", "Base 16"], a: 0, cat: "IT" },
    ],
    hard: [
      { q: "What sorting algorithm has O(n log n) best, average, and worst case?", choices: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"], a: 0, cat: "PROGRAMMING" },
      { q: "What is Avogadro's number?", choices: ["6.022 × 10²³", "3.14 × 10²³", "9.8 × 10²³", "1.67 × 10²³"], a: 0, cat: "CHEMISTRY" },
      { q: "Integrate: ∫ x² dx", choices: ["x³/3 + C", "2x + C", "x³ + C", "x²/2 + C"], a: 0, cat: "MATH" },
      { q: "What is the time complexity of Dijkstra's algorithm with a min-heap?", choices: ["O(V²)", "O(E log V)", "O(V log E)", "O(V + E)"], a: 1, cat: "PROGRAMMING" },
      { q: "What is the speed of light in m/s?", choices: ["2.8 × 10⁸", "3.0 × 10⁸", "3.2 × 10⁸", "2.5 × 10⁸"], a: 1, cat: "PHYSICS" },
      { q: "What is the central dogma of molecular biology?", choices: ["RNA → DNA → Protein", "DNA → RNA → Protein", "Protein → DNA → RNA", "DNA → Protein → RNA"], a: 1, cat: "BIOLOGY" },
      { q: "What design pattern does the Model-View-Controller (MVC) use?", choices: ["Creational", "Structural", "Behavioral", "Architectural"], a: 3, cat: "PROGRAMMING" },
      { q: "What is the Heisenberg Uncertainty Principle?", choices: ["Energy is conserved", "Position and momentum can't both be precisely measured", "Matter can't be created", "Entropy always increases"], a: 1, cat: "PHYSICS" },
      { q: "What is the result of XOR: 1010 XOR 0110?", choices: ["1100", "1010", "1110", "0100"], a: 0, cat: "IT" },
      { q: "What makes a Fibonacci Heap efficient for Dijkstra's?", choices: ["O(1) insert and decrease-key", "O(log n) find-min", "O(1) delete-min", "Simple implementation"], a: 0, cat: "PROGRAMMING" },
    ]
  },

  ent: {
    easy: [
      { q: "Which superhero is known as the 'Man of Steel'?", choices: ["Batman", "Iron Man", "Superman", "Thor"], a: 2, cat: "MOVIES" },
      { q: "What game features a battle royale on a shrinking island by Epic Games?", choices: ["PUBG", "Apex Legends", "Fortnite", "Warzone"], a: 2, cat: "GAMING" },
      { q: "Who sang 'APT.' featuring Bruno Mars?", choices: ["TWICE", "BLACKPINK", "ROSÉ", "aespa"], a: 2, cat: "MUSIC" },
      { q: "What is the highest-grossing film of all time (as of 2025)?", choices: ["Titanic", "Avatar", "Avengers: Endgame", "The Lion King"], a: 1, cat: "MOVIES" },
      { q: "Which platform is known for short-form vertical videos?", choices: ["YouTube", "Instagram", "TikTok", "Twitter"], a: 2, cat: "SOCIAL MEDIA" },
      { q: "What sport does LeBron James play?", choices: ["Football", "Basketball", "Baseball", "Tennis"], a: 1, cat: "SPORTS" },
      { q: "What streaming service created 'Squid Game'?", choices: ["Hulu", "Disney+", "Netflix", "HBO"], a: 2, cat: "SERIES" },
      { q: "Which band is associated with the members RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook?", choices: ["EXO", "MONSTA X", "BTS", "GOT7"], a: 2, cat: "MUSIC" },
      { q: "What does 'POV' mean on social media?", choices: ["Part of video", "Point of view", "Post on video", "Play original version"], a: 1, cat: "SOCIAL MEDIA" },
      { q: "In what fictional universe do Tony Stark and Steve Rogers exist?", choices: ["DC Extended Universe", "Marvel Cinematic Universe", "Star Wars Universe", "X-Men Universe"], a: 1, cat: "MOVIES" },
    ],
    medium: [
      { q: "Which game developer created 'Minecraft'?", choices: ["Valve", "Mojang", "Roblox Corp", "Epic Games"], a: 1, cat: "GAMING" },
      { q: "What year did the first season of 'Stranger Things' release?", choices: ["2015", "2016", "2017", "2018"], a: 1, cat: "SERIES" },
      { q: "What is the best-selling video game of all time (individual game)?", choices: ["GTA V", "Tetris", "Minecraft", "Wii Sports"], a: 2, cat: "GAMING" },
      { q: "Which artist went viral for 'MONTERO (Call Me By Your Name)'?", choices: ["Tyler the Creator", "Lil Nas X", "Jack Harlow", "DaBaby"], a: 1, cat: "MUSIC" },
      { q: "What Oscar record did 'Everything Everywhere All at Once' set in 2023?", choices: ["Most nominations ever", "Most wins in one night by an A24 film", "7 wins including Best Picture", "First sci-fi to win Best Picture"], a: 2, cat: "MOVIES" },
      { q: "What is 'Wordle'?", choices: ["A music guessing game", "A daily word puzzle game", "A video sharing app", "A multiplayer typing game"], a: 1, cat: "GAMING" },
      { q: "Which K-Drama won the Emmy for Outstanding Drama Series in 2024?", choices: ["Crash Landing on You", "Squid Game", "Extraordinary Attorney Woo", "My Love from the Star"], a: 1, cat: "SERIES" },
      { q: "What term describes content creators who promote products through social media?", choices: ["Bloggers", "Influencers", "Vloggers", "Streamers"], a: 1, cat: "SOCIAL MEDIA" },
      { q: "Which Filipino boxer is known as 'Pambansang Kamao'?", choices: ["Manny Pacquiao", "Donnie Nietes", "Nonito Donaire", "Mark Magsayo"], a: 0, cat: "SPORTS" },
      { q: "What is the name of the e-sport where teams compete in 'Summoner's Rift'?", choices: ["Dota 2", "Valorant", "League of Legends", "CS:GO"], a: 2, cat: "GAMING" },
    ],
    hard: [
      { q: "Which director helmed both 'Parasite' and 'Okja'?", choices: ["Park Chan-wook", "Kim Ji-woon", "Bong Joon-ho", "Lee Chang-dong"], a: 2, cat: "MOVIES" },
      { q: "What controversial 'metagame' term went viral in gaming communities in 2024?", choices: ["MOBA", "Elden Ring", "Power Creep", "GOAT"], a: 2, cat: "GAMING" },
      { q: "Which film score composer scored 'Interstellar', 'Dunkirk', and 'Oppenheimer'?", choices: ["John Williams", "Hans Zimmer", "Howard Shore", "Danny Elfman"], a: 1, cat: "MOVIES" },
      { q: "What was the first video game inducted into the World Video Game Hall of Fame?", choices: ["Pong", "Space Invaders", "Pac-Man", "Tetris"], a: 0, cat: "GAMING" },
      { q: "Which Filipino artist achieved a Billboard Hot 100 hit with 'Miss You 3000'?", choices: ["Ben&Ben", "SB19", "BGYO", "BINI"], a: 1, cat: "MUSIC" },
      { q: "What does 'parasocial relationship' mean in social media context?", choices: ["A fake online friendship", "One-sided emotional bond with a public figure", "Online dating", "Group content creation"], a: 1, cat: "SOCIAL MEDIA" },
      { q: "Which studio produced 'Spider-Man: Into the Spider-Verse' (2018)?", choices: ["Marvel Studios", "Sony Pictures Animation", "DreamWorks", "Pixar"], a: 1, cat: "MOVIES" },
      { q: "What is the real name of the rapper known as 'Drake'?", choices: ["Aubrey Drake Graham", "Drizzy Champagne Graham", "Aubrey Carter Graham", "Drake Aubrey Carter"], a: 0, cat: "MUSIC" },
      { q: "Which game engine powers 'Fortnite'?", choices: ["Unity", "Godot", "Unreal Engine", "CryEngine"], a: 2, cat: "GAMING" },
      { q: "What controversial AI-generated song went viral in 2023 mimicking Drake and The Weeknd?", choices: ["Ghost in the Machine", "Heart on My Sleeve", "AI Drake", "Virtual Love"], a: 1, cat: "MUSIC" },
    ]
  }
};

/* ─────────────────────────────────────
   SCORING CONFIG
   ───────────────────────────────────── */
const SCORE_CONFIG = {
  easy:   { base: 100, timeBonus: 5,  streakMult: 1.2 },
  medium: { base: 200, timeBonus: 8,  streakMult: 1.5 },
  hard:   { base: 350, timeBonus: 12, streakMult: 2.0 },
};

const RANK_THRESHOLDS = [
  { min: 3000, rank: 'S', title: 'LODI TALAGA!' },
  { min: 2000, rank: 'A', title: 'SIGE SIGE!' },
  { min: 1200, rank: 'B', title: 'HINDI MASAMA!' },
  { min: 700,  rank: 'C', title: 'KEEP TRYING!' },
  { min: 0,    rank: 'D', title: 'IBAYO PA!' },
];

/* ─────────────────────────────────────
   GAME STATE
   ───────────────────────────────────── */
let STATE = {
  genre: 'ph',
  difficulty: 'easy',
  questions: [],
  currentQ: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  correct: 0,
  wrong: 0,
  timer: 60,
  timerInterval: null,
  answered: false,
  questionStartTime: 0,
  rankingsTab: 'ph',
};

/* ─────────────────────────────────────
   DOM HELPERS
   ───────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─────────────────────────────────────
   AUDIO ENGINE (Web Audio API)
   Generates retro 8-bit SFX procedurally
   ───────────────────────────────────── */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSFX(type) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.07);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(165, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'tick') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'combo') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(659, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.07);
      osc.frequency.setValueAtTime(1046, ctx.currentTime + 0.14);
      osc.frequency.setValueAtTime(1318, ctx.currentTime + 0.21);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'gameover') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(494, ctx.currentTime);
      osc.frequency.setValueAtTime(440, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(370, ctx.currentTime + 0.3);
      osc.frequency.setValueAtTime(294, ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.7);
    }
  } catch (e) {
    // Audio not available
  }
}

/* ─────────────────────────────────────
   PARTICLE SYSTEM
   ───────────────────────────────────── */
function spawnParticles(x, y, color, count = 12) {
  const container = $('#particles-container');
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.setProperty('--px', `${(Math.random() - 0.5) * 120}px`);
    p.style.setProperty('--py', `${(Math.random() - 1.2) * 100}px`);
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.background = color;
    p.style.width = `${Math.random() * 6 + 4}px`;
    p.style.height = p.style.width;
    container.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

/* ─────────────────────────────────────
   SCREEN TRANSITIONS
   ───────────────────────────────────── */
function showScreen(id) {
  const current = $('.screen.active');
  const next = $('#' + id);
  if (!next || next === current) return;

  if (current) {
    gsap.to(current, {
      opacity: 0, y: -20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        current.classList.remove('active');
        current.style.transform = '';
      }
    });
  }

  next.classList.add('active');
  next.style.opacity = '0';
  gsap.fromTo(next,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.15 }
  );
}

/* ─────────────────────────────────────
   GENRE THEME SWITCHER
   ───────────────────────────────────── */
function applyGenreTheme(genre) {
  document.body.classList.remove('genre-ph', 'genre-academic', 'genre-ent');
  document.body.classList.add(`genre-${genre}`);
  document.body.dataset.genre = genre;
}

/* ─────────────────────────────────────
   LANDING SCREEN SETUP
   ───────────────────────────────────── */
function initLanding() {
  // Genre buttons
  $$('.genre-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.genre-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.genre = btn.dataset.genre;
      applyGenreTheme(STATE.genre);

      gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    });
  });

  // Difficulty buttons
  $$('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.difficulty = btn.dataset.diff;
      gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
    });
  });

  // Play button
  $('#btn-play').addEventListener('click', () => {
    startGame();
  });

  // Rankings button
  $('#btn-scores').addEventListener('click', () => {
    showRankings(STATE.rankingsTab);
    showScreen('screen-rankings');
  });

  // Animate landing elements in
  gsap.fromTo('.logo-pixel-border',
    { y: -40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }
  );
  gsap.fromTo('.genre-grid .genre-btn',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out', delay: 0.3 }
  );
  gsap.fromTo('.landing-actions .pixel-btn',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'back.out(2)', delay: 0.6 }
  );
}

/* ─────────────────────────────────────
   GAME START
   ───────────────────────────────────── */
function startGame() {
  const pool = [...TRIVIA[STATE.genre][STATE.difficulty]];
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  STATE.questions = pool.slice(0, 10);
  STATE.currentQ = 0;
  STATE.score = 0;
  STATE.streak = 0;
  STATE.bestStreak = 0;
  STATE.correct = 0;
  STATE.wrong = 0;
  STATE.timer = 60;
  STATE.answered = false;

  // Update HUD labels
  const labels = { ph: '🇵🇭 PILIPINAS', academic: '🔬 AKADEMYA', ent: '🎮 TRENDZONE' };
  $('#hud-genre-label').textContent = labels[STATE.genre];
  $('#hud-diff-label').textContent = STATE.difficulty.toUpperCase();
  $('#q-total').textContent = STATE.questions.length;
  $('#hud-score').textContent = '0';
  $('#hud-streak').textContent = '🔥 ×0';

  applyGenreTheme(STATE.genre);
  showScreen('screen-game');

  setTimeout(() => {
    renderQuestion();
    startTimer();
  }, 400);
}

/* ─────────────────────────────────────
   TIMER
   ───────────────────────────────────── */
function startTimer() {
  clearInterval(STATE.timerInterval);
  const circumference = 163.4;
  const fill = $('#timer-ring-fill');
  const display = $('#timer-display');

  STATE.timer = 60;
  if (fill) fill.style.strokeDashoffset = '0';
  if (display) display.textContent = '60';

  STATE.timerInterval = setInterval(() => {
    STATE.timer--;
    if (display) display.textContent = STATE.timer;

    // Ring animation
    if (fill) {
      const offset = circumference * (1 - STATE.timer / 60);
      fill.style.strokeDashoffset = offset;
      if (STATE.timer <= 10) {
        fill.style.stroke = 'var(--wrong)';
        if (STATE.timer <= 5) playSFX('tick');
      } else if (STATE.timer <= 20) {
        fill.style.stroke = 'var(--gold)';
      } else {
        fill.style.stroke = 'var(--accent-1)';
      }
    }

    if (STATE.timer <= 0) {
      clearInterval(STATE.timerInterval);
      endGame();
    }
  }, 1000);
}

/* ─────────────────────────────────────
   RENDER QUESTION
   ───────────────────────────────────── */
function renderQuestion() {
  const q = STATE.questions[STATE.currentQ];
  if (!q) { endGame(); return; }

  STATE.answered = false;
  STATE.questionStartTime = STATE.timer;

  $('#q-current').textContent = STATE.currentQ + 1;
  $('#q-category').textContent = q.cat;
  $('#q-text').textContent = q.q;

  // Shuffle choices for display
  const indices = [0, 1, 2, 3];
  for (let i = 3; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const letters = ['A', 'B', 'C', 'D'];
  const btns = $$('.choice-btn');

  btns.forEach((btn, i) => {
    const origIdx = indices[i];
    btn.dataset.origIdx = origIdx;
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
    btn.querySelector('.choice-letter').textContent = letters[i];
    btn.querySelector('.choice-text').textContent = q.choices[origIdx];
  });

  // Animate in
  gsap.fromTo('#question-card',
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
  );
  gsap.fromTo('.choice-btn',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'power2.out', delay: 0.1 }
  );
}

/* ─────────────────────────────────────
   ANSWER HANDLER
   ───────────────────────────────────── */
function handleAnswer(btn) {
  if (STATE.answered) return;
  STATE.answered = true;

  const q = STATE.questions[STATE.currentQ];
  const origIdx = parseInt(btn.dataset.origIdx);
  const correct = origIdx === q.a;

  // Disable all buttons & highlight
  $$('.choice-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.origIdx) === q.a) b.classList.add('correct');
  });

  if (!correct) {
    btn.classList.add('wrong');
  }

  // Score calculation
  if (correct) {
    STATE.correct++;
    STATE.streak++;
    if (STATE.streak > STATE.bestStreak) STATE.bestStreak = STATE.streak;

    const cfg = SCORE_CONFIG[STATE.difficulty];
    const timeLeft = STATE.timer;
    const timeBonus = timeLeft * cfg.timeBonus;
    const streakMult = STATE.streak >= 3 ? cfg.streakMult : 1;
    const points = Math.round((cfg.base + timeBonus) * streakMult);

    STATE.score += points;

    // Feedback
    showFeedback('+' + points, 'correct');
    playSFX(STATE.streak >= 3 ? 'combo' : 'correct');

    // Particles
    const rect = btn.getBoundingClientRect();
    spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2,
      getComputedStyle(document.body).getPropertyValue('--particle-col').trim() || '#ffd700');

    // Combo burst
    if (STATE.streak >= 3) {
      showCombo(STATE.streak);
    }

    // Update HUD score with animation
    $('#hud-score').textContent = STATE.score;
    gsap.fromTo('#hud-score', { scale: 1.5, color: 'var(--correct)' }, { scale: 1, color: 'var(--hud-color)', duration: 0.4, ease: 'power2.out' });
  } else {
    STATE.wrong++;
    STATE.streak = 0;
    showFeedback('MALI!', 'wrong');
    playSFX('wrong');
    gsap.to('#screen-game', { x: -6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' });
  }

  // Streak HUD
  $('#hud-streak').textContent = `🔥 ×${STATE.streak}`;

  // Next question after delay
  setTimeout(() => {
    STATE.currentQ++;
    if (STATE.currentQ >= STATE.questions.length || STATE.timer <= 0) {
      endGame();
    } else {
      renderQuestion();
    }
  }, 1100);
}

/* ─────────────────────────────────────
   FEEDBACK DISPLAYS
   ───────────────────────────────────── */
function showFeedback(text, type) {
  const el = $('#feedback-flash');
  el.textContent = text;
  el.className = 'feedback-flash show-' + type;
  setTimeout(() => { el.className = 'feedback-flash'; }, 700);
}

function showCombo(streak) {
  const el = $('#combo-burst');
  el.textContent = `🔥 ${streak}x COMBO!`;
  el.className = 'combo-burst burst';
  setTimeout(() => { el.className = 'combo-burst'; }, 800);
  playSFX('combo');
}

/* ─────────────────────────────────────
   GAME END
   ───────────────────────────────────── */
function endGame() {
  clearInterval(STATE.timerInterval);
  playSFX('gameover');

  // Determine rank
  const rank = RANK_THRESHOLDS.find(t => STATE.score >= t.min) || RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];

  $('#result-rank-badge').textContent = rank.rank;
  $('#result-title').textContent = rank.title;
  $('#result-score').textContent = STATE.score;
  $('#stat-correct').textContent = STATE.correct;
  $('#stat-wrong').textContent = STATE.wrong;
  $('#stat-streak').textContent = STATE.bestStreak;
  $('#player-name').value = '';

  showScreen('screen-result');

  // Animate result elements in sequence
  gsap.fromTo('.result-rank-badge',
    { rotation: -180, scale: 0, opacity: 0 },
    { rotation: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)', delay: 0.2 }
  );
  gsap.fromTo('.result-score-val',
    { textContent: 0 },
    {
      textContent: STATE.score,
      duration: 1.2,
      delay: 0.4,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate() { this.targets()[0].textContent = Math.round(this.targets()[0].textContent); }
    }
  );

  // Star burst for high scores
  if (STATE.score >= 2000) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        spawnParticles(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          ['#ffd700', '#f7c948', '#ff6b6b', '#00f5ff'][Math.floor(Math.random() * 4)],
          8
        );
      }, i * 200);
    }
  }
}

/* ─────────────────────────────────────
   LEADERBOARD (localStorage)
   ───────────────────────────────────── */
function getScores(genre) {
  try {
    return JSON.parse(localStorage.getItem(`typeshift_scores_${genre}`) || '[]');
  } catch { return []; }
}

function saveScore(genre, name, score, difficulty) {
  const scores = getScores(genre);
  scores.push({ name: name.toUpperCase().trim() || 'BAYANI', score, difficulty, date: Date.now() });
  scores.sort((a, b) => b.score - a.score);
  const top = scores.slice(0, 15);
  localStorage.setItem(`typeshift_scores_${genre}`, JSON.stringify(top));
  return top;
}

function showRankings(genre) {
  STATE.rankingsTab = genre;
  $$('.rtab').forEach(t => {
    t.classList.toggle('active', t.dataset.rtab === genre);
  });

  const scores = getScores(genre);
  const list = $('#rankings-list');
  const medals = ['🥇', '🥈', '🥉'];

  if (!scores.length) {
    list.innerHTML = `<div class="ranking-empty">NO SCORES YET<br>BE THE FIRST!</div>`;
    return;
  }

  list.innerHTML = scores.map((s, i) => `
    <div class="ranking-item">
      <span class="ranking-pos">${medals[i] || (i + 1)}</span>
      <span class="ranking-name">${s.name} <small style="opacity:0.4;font-size:0.8em">[${s.difficulty.toUpperCase()}]</small></span>
      <span class="ranking-score">${s.score}</span>
    </div>
  `).join('');

  gsap.fromTo('.ranking-item',
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: 'power2.out' }
  );
}

/* ─────────────────────────────────────
   RESULT SCREEN EVENTS
   ───────────────────────────────────── */
function initResultScreen() {
  $('#btn-save-score').addEventListener('click', () => {
    const name = $('#player-name').value.trim() || 'BAYANI';
    saveScore(STATE.genre, name, STATE.score, STATE.difficulty);

    gsap.to('#btn-save-score', { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
    $('#btn-save-score').textContent = '✓ SAVED!';
    $('#btn-save-score').disabled = true;
    playSFX('combo');
  });

  $('#btn-retry').addEventListener('click', () => startGame());
  $('#btn-home').addEventListener('click', () => {
    applyGenreTheme(STATE.genre);
    showScreen('screen-landing');
  });
  $('#btn-view-scores').addEventListener('click', () => {
    showRankings(STATE.genre);
    showScreen('screen-rankings');
  });
}

/* ─────────────────────────────────────
   RANKINGS SCREEN EVENTS
   ───────────────────────────────────── */
function initRankingsScreen() {
  $$('.rtab').forEach(tab => {
    tab.addEventListener('click', () => {
      showRankings(tab.dataset.rtab);
      applyGenreTheme(tab.dataset.rtab);
    });
  });

  $('#btn-rankings-home').addEventListener('click', () => {
    applyGenreTheme(STATE.genre);
    showScreen('screen-landing');
  });
}

/* ─────────────────────────────────────
   CHOICE BUTTON EVENTS (delegated)
   ───────────────────────────────────── */
function initChoiceButtons() {
  $('#choices-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.choice-btn');
    if (btn && !btn.disabled) {
      handleAnswer(btn);
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if ($('#screen-game.active')) {
      const map = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, '1': 0, '2': 1, '3': 2, '4': 3 };
      const idx = map[e.key.toLowerCase()];
      if (idx !== undefined) {
        const btn = $(`.choice-btn[data-index="${idx}"]`);
        if (btn && !btn.disabled) handleAnswer(btn);
      }
    }
  });
}

/* ─────────────────────────────────────
   BACKGROUND AMBIENT PIXELS
   ───────────────────────────────────── */
function spawnAmbientPixel() {
  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed;
    width: ${Math.random() * 4 + 2}px;
    height: ${Math.random() * 4 + 2}px;
    background: var(--accent-1);
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
  `;
  document.body.appendChild(el);

  gsap.to(el, {
    opacity: Math.random() * 0.3 + 0.05,
    duration: Math.random() * 2 + 1,
    yoyo: true,
    repeat: 3,
    ease: 'power1.inOut',
    onComplete: () => el.remove()
  });
}

/* ─────────────────────────────────────
   INIT
   ───────────────────────────────────── */
function init() {
  applyGenreTheme('ph');
  initLanding();
  initResultScreen();
  initRankingsScreen();
  initChoiceButtons();

  // Ambient pixel spawner
  setInterval(spawnAmbientPixel, 600);

  // Handle visibility change (pause timer)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && STATE.timerInterval) {
      clearInterval(STATE.timerInterval);
    } else if (!document.hidden && $('#screen-game.active') && !STATE.answered && STATE.timer > 0) {
      startTimer();
    }
  });

  console.log('%cTYPESHIFT TRIVIA LOADED 🎮', 'font-family:monospace;color:#f7c948;font-size:16px;font-weight:bold;');
}

// Wait for GSAP
if (typeof gsap !== 'undefined') {
  init();
} else {
  window.addEventListener('load', init);
}
