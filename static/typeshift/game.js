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
   LO-FI BACKGROUND MUSIC ENGINE
   Procedural Web Audio API — no files needed
   3 genre themes + intensity mode + mute toggle
   ───────────────────────────────────── */
const MUSIC = {
  muted: false,
  playing: false,
  genre: 'ph',
  intensity: 'normal', // 'normal' | 'tense'
  masterGain: null,
  reverbNode: null,
  nodes: [],        // all active oscillators / sources to stop
  scheduledUntil: 0,
  bpm: 78,
  scheduleAhead: 0.3,   // seconds ahead to schedule
  lookahead: 100,       // ms scheduler interval
  schedulerTimer: null,
  currentBeat: 0,
  loopLength: 8,        // beats per loop
};

/* ── Scale definitions per genre ── */
const SCALES = {
  ph:       [0, 2, 3, 7, 9],          // pentatonic minor — warm, folk
  academic: [0, 2, 4, 7, 9],          // pentatonic major — bright, clean
  ent:      [0, 3, 5, 7, 10],         // minor blues — groovy, cool
};

/* ── Root notes per genre (MIDI-like: 60=C4) ── */
const ROOTS = { ph: 52, academic: 57, ent: 55 }; // E3, A3, G3

function midiToHz(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function createReverb(ctx) {
  const convolver = ctx.createConvolver();
  const rate = ctx.sampleRate;
  const length = rate * 1.8;
  const impulse = ctx.createBuffer(2, length, rate);
  for (let c = 0; c < 2; c++) {
    const ch = impulse.getChannelData(c);
    for (let i = 0; i < length; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  convolver.buffer = impulse;
  return convolver;
}

function initMusicGraph() {
  const ctx = getAudioCtx();
  MUSIC.masterGain = ctx.createGain();
  MUSIC.masterGain.gain.value = MUSIC.muted ? 0 : 0.22;

  MUSIC.reverbNode = createReverb(ctx);
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.28;

  MUSIC.masterGain.connect(reverbGain);
  reverbGain.connect(MUSIC.reverbNode);
  MUSIC.reverbNode.connect(ctx.destination);
  MUSIC.masterGain.connect(ctx.destination);
}

/* ── Lo-fi vinyl crackle noise ── */
function scheduleVinylNoise(ctx, startTime, duration) {
  if (MUSIC.muted) return;
  const bufSize = ctx.sampleRate * duration;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.012;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  g.gain.value = 0.18;
  // Low-pass filter for warmth
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 3200;
  src.connect(lp);
  lp.connect(g);
  g.connect(MUSIC.masterGain);
  src.start(startTime);
  MUSIC.nodes.push(src);
}

/* ── Bass note ── */
function scheduleBass(ctx, startTime, noteOffset, duration, vol = 0.38) {
  const scale = SCALES[MUSIC.genre];
  const root = ROOTS[MUSIC.genre];
  const hz = midiToHz(root - 12 + scale[noteOffset % scale.length]);

  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = hz;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0, startTime);
  env.gain.linearRampToValueAtTime(vol, startTime + 0.015);
  env.gain.exponentialRampToValueAtTime(vol * 0.5, startTime + 0.08);
  env.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.85);

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = MUSIC.intensity === 'tense' ? 420 : 320;

  osc.connect(env);
  env.connect(lp);
  lp.connect(MUSIC.masterGain);
  osc.start(startTime);
  osc.stop(startTime + duration);
  MUSIC.nodes.push(osc);
}

/* ── Pad chord ── */
function schedulePad(ctx, startTime, chordDegrees, duration, vol = 0.09) {
  const scale = SCALES[MUSIC.genre];
  const root = ROOTS[MUSIC.genre];

  chordDegrees.forEach(deg => {
    const hz = midiToHz(root + scale[deg % scale.length]);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = hz;

    // Slight detune for warmth
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = hz * 1.003;

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(vol, startTime + 0.25);
    env.gain.setValueAtTime(vol, startTime + duration - 0.3);
    env.gain.linearRampToValueAtTime(0, startTime + duration);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;

    [osc, osc2].forEach(o => { o.connect(env); o.start(startTime); o.stop(startTime + duration); MUSIC.nodes.push(o); });
    env.connect(lp);
    lp.connect(MUSIC.masterGain);
  });
}

/* ── Melody note ── */
function scheduleMelody(ctx, startTime, noteOffset, octave, duration, vol = 0.12) {
  const scale = SCALES[MUSIC.genre];
  const root = ROOTS[MUSIC.genre];
  const hz = midiToHz(root + octave * 12 + scale[noteOffset % scale.length]);

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = hz;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0, startTime);
  env.gain.linearRampToValueAtTime(vol, startTime + 0.02);
  env.gain.exponentialRampToValueAtTime(0.001, startTime + Math.max(duration * 0.9, 0.05));

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2200;

  osc.connect(env);
  env.connect(lp);
  lp.connect(MUSIC.masterGain);
  osc.start(startTime);
  osc.stop(startTime + duration);
  MUSIC.nodes.push(osc);
}

/* ── Hi-hat ── */
function scheduleHat(ctx, startTime, vol = 0.07) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 8000;
  const env = ctx.createGain();
  env.gain.setValueAtTime(vol, startTime);
  env.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);
  src.connect(hp); hp.connect(env); env.connect(MUSIC.masterGain);
  src.start(startTime);
  MUSIC.nodes.push(src);
}

/* ── Kick ── */
function scheduleKick(ctx, startTime, vol = 0.28) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(160, startTime);
  osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.12);
  const env = ctx.createGain();
  env.gain.setValueAtTime(vol, startTime);
  env.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
  osc.connect(env); env.connect(MUSIC.masterGain);
  osc.start(startTime); osc.stop(startTime + 0.25);
  MUSIC.nodes.push(osc);
}

/* ── Snare ── */
function scheduleSnare(ctx, startTime, vol = 0.14) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 0.8;
  const env = ctx.createGain();
  env.gain.setValueAtTime(vol, startTime);
  env.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);
  src.connect(bp); bp.connect(env); env.connect(MUSIC.masterGain);
  src.start(startTime);
  MUSIC.nodes.push(src);
}

/* ── Main loop scheduler ── */
const GENRE_PATTERNS = {
  ph: {
    // Chord progressions: scale degrees for pad
    chords: [[0,2,4], [1,3,4], [2,4,1], [0,3,4]],
    // Bass pattern: scale degree per beat (null = rest)
    bass:   [0,null,2,null, 1,null,3,null],
    // Melody: [scaleDeg, octave] or null per beat
    melody: [[0,1],null,[2,1],null, [1,1],null,[4,0],null],
  },
  academic: {
    chords: [[0,2,4],[2,4,1],[1,3,4],[0,2,3]],
    bass:   [0,null,null,3, 2,null,null,1],
    melody: [[0,1],[2,1],null,[4,1], null,[3,1],[2,1],null],
  },
  ent: {
    chords: [[0,2,4],[3,1,4],[2,4,0],[1,3,4]],
    bass:   [0,null,3,null, 2,null,0,null],
    melody: [[2,1],null,[0,1],[4,0], null,[3,1],null,[1,1]],
  },
};

function scheduleLoop(ctx) {
  const secPerBeat = 60 / MUSIC.bpm;
  const tense = MUSIC.intensity === 'tense';
  const pat = GENRE_PATTERNS[MUSIC.genre];
  const chordIdx = Math.floor(MUSIC.currentBeat / 2) % pat.chords.length;

  // Schedule ahead window
  while (MUSIC.scheduledUntil < ctx.currentTime + MUSIC.scheduleAhead) {
    const t = MUSIC.scheduledUntil;
    const beat = MUSIC.currentBeat % MUSIC.loopLength;

    // Kick on beats 0 and 4
    if (beat === 0 || beat === 4) scheduleKick(ctx, t, tense ? 0.35 : 0.28);

    // Snare on beats 2 and 6
    if (beat === 2 || beat === 6) scheduleSnare(ctx, t, tense ? 0.18 : 0.14);

    // Hi-hats: every beat, louder on offbeats if tense
    scheduleHat(ctx, t, tense ? 0.12 : 0.07);
    if (tense) scheduleHat(ctx, t + secPerBeat * 0.5, 0.06); // extra offbeat hat

    // Bass note
    const bassNote = pat.bass[beat];
    if (bassNote !== null) scheduleBass(ctx, t, bassNote, secPerBeat * 0.85, tense ? 0.45 : 0.38);

    // Pad chord — every 2 beats
    if (beat % 2 === 0) {
      const chord = pat.chords[chordIdx];
      schedulePad(ctx, t, chord, secPerBeat * 2, tense ? 0.06 : 0.09);
    }

    // Melody — skip some randomly for lo-fi feel
    const melNote = pat.melody[beat];
    if (melNote && Math.random() > (tense ? 0.15 : 0.35)) {
      scheduleMelody(ctx, t, melNote[0], melNote[1], secPerBeat * 0.7, tense ? 0.16 : 0.12);
    }

    // Vinyl crackle — occasional, every 4 beats
    if (beat === 0 && !tense) scheduleVinylNoise(ctx, t, secPerBeat * 4);

    MUSIC.scheduledUntil += secPerBeat;
    MUSIC.currentBeat++;
  }
}

function startMusic(genre) {
  if (MUSIC.playing) stopMusic(false);
  const ctx = getAudioCtx();
  if (ctx.state === 'suspended') ctx.resume();

  if (!MUSIC.masterGain) initMusicGraph();

  MUSIC.genre = genre || MUSIC.genre;
  MUSIC.playing = true;
  MUSIC.currentBeat = 0;
  MUSIC.scheduledUntil = ctx.currentTime + 0.05;
  MUSIC.intensity = 'normal';

  // Fade in
  MUSIC.masterGain.gain.cancelScheduledValues(ctx.currentTime);
  MUSIC.masterGain.gain.setValueAtTime(0, ctx.currentTime);
  MUSIC.masterGain.gain.linearRampToValueAtTime(MUSIC.muted ? 0 : 0.22, ctx.currentTime + 1.5);

  MUSIC.schedulerTimer = setInterval(() => {
    if (MUSIC.playing) scheduleLoop(ctx);
  }, MUSIC.lookahead);
}

function stopMusic(fade = true) {
  MUSIC.playing = false;
  clearInterval(MUSIC.schedulerTimer);
  if (MUSIC.masterGain) {
    const ctx = getAudioCtx();
    if (fade) {
      MUSIC.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    }
  }
}

function setMusicIntensity(level) {
  // 'normal' or 'tense'
  if (MUSIC.intensity === level) return;
  MUSIC.intensity = level;
  if (!MUSIC.masterGain) return;
  const ctx = getAudioCtx();
  const targetVol = level === 'tense' ? 0.32 : 0.22;
  MUSIC.masterGain.gain.cancelScheduledValues(ctx.currentTime);
  MUSIC.masterGain.gain.linearRampToValueAtTime(MUSIC.muted ? 0 : targetVol, ctx.currentTime + 0.5);
}

function switchMusicGenre(genre) {
  if (MUSIC.genre === genre && MUSIC.playing) return;
  MUSIC.genre = genre;
  if (MUSIC.playing) {
    // Crossfade: stop then restart
    stopMusic(true);
    setTimeout(() => startMusic(genre), 900);
  }
}

function toggleMute() {
  MUSIC.muted = !MUSIC.muted;
  if (MUSIC.masterGain) {
    const ctx = getAudioCtx();
    const targetVol = MUSIC.muted ? 0 : (MUSIC.intensity === 'tense' ? 0.32 : 0.22);
    MUSIC.masterGain.gain.cancelScheduledValues(ctx.currentTime);
    MUSIC.masterGain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 0.3);
  }
  // Update button
  const btn = document.getElementById('music-toggle');
  if (btn) btn.textContent = MUSIC.muted ? '🔇' : '🎵';
  return MUSIC.muted;
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
      switchMusicGenre(STATE.genre);
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
  startMusic(STATE.genre);

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
        setMusicIntensity('tense');
      } else if (STATE.timer <= 20) {
        fill.style.stroke = 'var(--gold)';
        setMusicIntensity('tense');
      } else {
        fill.style.stroke = 'var(--accent-1)';
        setMusicIntensity('normal');
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
  stopMusic(true);
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
   PIXEL CHARACTER WALKER
   ───────────────────────────────────── */
const CHAR_SPRITES = {
  idle: [
    // Frame 0 — standing
    `<svg viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="6" height="6" fill="var(--accent-1)"/>
      <rect x="4" y="6" width="8" height="8" fill="var(--accent-3)"/>
      <rect x="3" y="7" width="2" height="4" fill="var(--accent-3)"/>
      <rect x="11" y="7" width="2" height="4" fill="var(--accent-3)"/>
      <rect x="5" y="14" width="2" height="4" fill="var(--accent-1)"/>
      <rect x="9" y="14" width="2" height="4" fill="var(--accent-1)"/>
      <rect x="5" y="2" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="9" y="2" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="6" y="4" width="4" height="1" fill="var(--bg-primary)"/>
    </svg>`,
    // Frame 1 — slight bob
    `<svg viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="1" width="6" height="6" fill="var(--accent-1)"/>
      <rect x="4" y="7" width="8" height="8" fill="var(--accent-3)"/>
      <rect x="3" y="8" width="2" height="4" fill="var(--accent-3)"/>
      <rect x="11" y="8" width="2" height="4" fill="var(--accent-3)"/>
      <rect x="5" y="15" width="2" height="4" fill="var(--accent-1)"/>
      <rect x="9" y="15" width="2" height="4" fill="var(--accent-1)"/>
      <rect x="5" y="3" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="9" y="3" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="6" y="5" width="4" height="1" fill="var(--bg-primary)"/>
    </svg>`,
  ],
  walk: [
    // Frame 0 — left foot forward
    `<svg viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="6" height="6" fill="var(--accent-1)"/>
      <rect x="4" y="6" width="8" height="8" fill="var(--accent-3)"/>
      <rect x="2" y="7" width="2" height="5" fill="var(--accent-3)"/>
      <rect x="12" y="7" width="2" height="5" fill="var(--accent-3)"/>
      <rect x="4" y="14" width="2" height="4" fill="var(--accent-1)"/>
      <rect x="10" y="14" width="3" height="2" fill="var(--accent-1)"/>
      <rect x="10" y="16" width="2" height="2" fill="var(--accent-1)"/>
      <rect x="5" y="2" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="9" y="2" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="6" y="4" width="4" height="1" fill="var(--bg-primary)"/>
    </svg>`,
    // Frame 1 — right foot forward
    `<svg viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="6" height="6" fill="var(--accent-1)"/>
      <rect x="4" y="6" width="8" height="8" fill="var(--accent-3)"/>
      <rect x="2" y="7" width="2" height="5" fill="var(--accent-3)"/>
      <rect x="12" y="7" width="2" height="5" fill="var(--accent-3)"/>
      <rect x="4" y="14" width="3" height="2" fill="var(--accent-1)"/>
      <rect x="4" y="16" width="2" height="2" fill="var(--accent-1)"/>
      <rect x="10" y="14" width="2" height="4" fill="var(--accent-1)"/>
      <rect x="5" y="2" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="9" y="2" width="2" height="2" fill="var(--bg-primary)"/>
      <rect x="6" y="4" width="4" height="1" fill="var(--bg-primary)"/>
    </svg>`,
  ]
};

let charEl = null;
let charState = { x: 80, y: 200, dir: 1, moving: false, frame: 0, frameTimer: 0, idleTimer: 0, targetX: 0, targetY: 0, phase: 'idle' };
let charAnimFrame = null;
let charLastTime = 0;

function createPixelChar() {
  charEl = document.createElement('div');
  charEl.className = 'pixel-char';
  charEl.style.left = charState.x + 'px';
  charEl.style.top = charState.y + 'px';
  charEl.innerHTML = CHAR_SPRITES.idle[0];
  document.body.appendChild(charEl);
}

function pickNewTarget() {
  const margin = 60;
  charState.targetX = margin + Math.random() * (window.innerWidth - margin * 2);
  charState.targetY = margin + Math.random() * (window.innerHeight - margin * 2);
  charState.phase = 'walk';
}

function updatePixelChar(timestamp) {
  if (!charEl) { charAnimFrame = requestAnimationFrame(updatePixelChar); return; }

  const dt = Math.min((timestamp - charLastTime) / 1000, 0.1);
  charLastTime = timestamp;

  const speed = 55; // px/sec
  const frameInterval = 0.18; // sec

  if (charState.phase === 'idle') {
    charState.idleTimer += dt;
    charState.frameTimer += dt;
    if (charState.frameTimer >= 0.5) {
      charState.frameTimer = 0;
      charState.frame = 1 - charState.frame;
      charEl.innerHTML = CHAR_SPRITES.idle[charState.frame];
    }
    if (charState.idleTimer > 1.5 + Math.random() * 2) {
      pickNewTarget();
    }
  } else {
    const dx = charState.targetX - charState.x;
    const dy = charState.targetY - charState.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 4) {
      charState.phase = 'idle';
      charState.idleTimer = 0;
      charState.frame = 0;
    } else {
      const nx = dx / dist;
      const ny = dy / dist;
      charState.x += nx * speed * dt;
      charState.y += ny * speed * dt;
      charState.dir = nx > 0 ? 1 : -1;

      charState.frameTimer += dt;
      if (charState.frameTimer >= frameInterval) {
        charState.frameTimer = 0;
        charState.frame = 1 - charState.frame;
      }
      charEl.innerHTML = CHAR_SPRITES.walk[charState.frame];
    }

    charEl.style.left = charState.x + 'px';
    charEl.style.top = charState.y + 'px';
    charEl.style.transform = charState.dir < 0 ? 'scaleX(-1)' : 'scaleX(1)';
  }

  charAnimFrame = requestAnimationFrame(updatePixelChar);
}

/* ─────────────────────────────────────
   WATER RIPPLE CLICK FX
   ───────────────────────────────────── */
function spawnWaterRipple(x, y) {
  // 3 concentric ripple rings
  [1, 2, 3].forEach(n => {
    const ring = document.createElement('div');
    ring.className = `water-ripple water-ripple-${n}`;
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 900);
  });

  // small water droplets
  const count = 7;
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'water-drop';
    const angle = (i / count) * Math.PI * 2;
    const dist = 30 + Math.random() * 25;
    drop.style.left = x + 'px';
    drop.style.top = y + 'px';
    drop.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    drop.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    drop.style.background = i % 2 === 0 ? 'var(--accent-3)' : 'var(--accent-1)';
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 600);
  }
}

function initWaterRipple() {
  document.addEventListener('mousedown', (e) => {
    spawnWaterRipple(e.clientX, e.clientY);
  });
  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    spawnWaterRipple(t.clientX, t.clientY);
  }, { passive: true });
}

/* ─────────────────────────────────────
   WATER MOUSE TRAIL
   ───────────────────────────────────── */
const mouseTrail = {
  points: [],
  mouse: { x: -999, y: -999 },
  lastSpawn: 0,
  active: false,
};

function initMouseTrail() {
  document.addEventListener('mousemove', (e) => {
    mouseTrail.mouse.x = e.clientX;
    mouseTrail.mouse.y = e.clientY;
    mouseTrail.active = true;
  });
  document.addEventListener('mouseleave', () => { mouseTrail.active = false; });

  // Touch support
  document.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mouseTrail.mouse.x = t.clientX;
    mouseTrail.mouse.y = t.clientY;
    mouseTrail.active = true;
  }, { passive: true });
  document.addEventListener('touchend', () => { mouseTrail.active = false; });

  requestAnimationFrame(tickMouseTrail);
}

function tickMouseTrail(timestamp) {
  // Spawn a new droplet every ~40ms while moving
  if (mouseTrail.active && timestamp - mouseTrail.lastSpawn > 40) {
    mouseTrail.lastSpawn = timestamp;
    spawnTrailDrop(mouseTrail.mouse.x, mouseTrail.mouse.y);
  }
  requestAnimationFrame(tickMouseTrail);
}

function spawnTrailDrop(x, y) {
  // Main teardrop orb
  const orb = document.createElement('div');
  orb.className = 'trail-orb';
  orb.style.left = x + 'px';
  orb.style.top  = y + 'px';
  // slight random drift so trail feels fluid
  orb.style.setProperty('--tdx', (Math.random() - 0.5) * 12 + 'px');
  orb.style.setProperty('--tdy', (Math.random() * 10 + 4) + 'px');
  document.body.appendChild(orb);
  setTimeout(() => orb.remove(), 700);

  // Tiny satellite droplet
  if (Math.random() < 0.5) {
    const sat = document.createElement('div');
    sat.className = 'trail-sat';
    const angle = Math.random() * Math.PI * 2;
    const r = 6 + Math.random() * 8;
    sat.style.left = (x + Math.cos(angle) * r) + 'px';
    sat.style.top  = (y + Math.sin(angle) * r) + 'px';
    sat.style.setProperty('--tdx', (Math.random() - 0.5) * 18 + 'px');
    sat.style.setProperty('--tdy', (Math.random() * 14 + 6) + 'px');
    document.body.appendChild(sat);
    setTimeout(() => sat.remove(), 500);
  }
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

  // Pixel character walker
  createPixelChar();
  charLastTime = performance.now();
  charAnimFrame = requestAnimationFrame(updatePixelChar);
  pickNewTarget();

  // Water ripple click FX
  initWaterRipple();

  // Water mouse trail
  initMouseTrail();

  // Music toggle button (fixed corner)
  const musicBtn = document.createElement('button');
  musicBtn.id = 'music-toggle';
  musicBtn.textContent = '🎵';
  musicBtn.title = 'Toggle Music';
  document.body.appendChild(musicBtn);
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMute();
    gsap.fromTo(musicBtn, { scale: 0.7 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
  });

  // Start landing music on first user interaction
  let musicStarted = false;
  const startLandingMusic = () => {
    if (musicStarted) return;
    musicStarted = true;
    startMusic('ph');
    document.removeEventListener('click', startLandingMusic);
    document.removeEventListener('keydown', startLandingMusic);
  };
  document.addEventListener('click', startLandingMusic);
  document.addEventListener('keydown', startLandingMusic);

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