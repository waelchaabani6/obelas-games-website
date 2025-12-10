// ===== Loading Screen Setup =====
const imagePaths = [
  '../../../../images/K1/U1/fivesensesgamecover_new.webp',
  '../../../../images/learning_buddy.webp',
  '../../../../images/levelup.png'
];
const audioPaths = [
  '../../../../audio/kids-game-gaming-background-music-295075.mp3',
  '../../../../audio/applause.mp3'
];
// Optimized Preloader
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');
const coverScreen = document.getElementById('cover-screen');
// 🖼️ + 🔊 Your asset arrays (already defined)
const totalAssets = imagePaths.length + audioPaths.length;
let loadedCount = 0;
function updateProgress() {
  loadedCount++;
  const percent = Math.round((loadedCount / totalAssets) * 100);
  progressBar.style.width = percent + '%';
  loadingText.textContent = `Loading... ${percent}%`;
  if (loadedCount >= totalAssets) {
    // small delay for smoother UX
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      coverScreen.classList.remove('hidden');
    }, 400);
  }
}
function preloadAssets() {
  const promises = [];
  // Preload images fully
  imagePaths.forEach(src => {
    const img = new Image();
    promises.push(
      new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      })
    );
  });
  // Preload audio metadata only (fast)
  audioPaths.forEach(src => {
    const audio = new Audio();
    promises.push(
      new Promise(resolve => {
        audio.preload = 'metadata';
        audio.onloadedmetadata = resolve;
        audio.onerror = resolve;
        audio.src = src;
      })
    );
  });
  // Track real progress as files resolve
  promises.forEach(p => p.then(updateProgress));
  // When all finished (ensures screen hides if some fail)
  Promise.allSettled(promises).then(() => {
   setTimeout(() => {
  loadingScreen.classList.add('hidden');
  coverScreen.classList.remove('hidden');
  // 🔊 Play welcome message
  speak("welcome-message");
}, 400);
  });
}
window.addEventListener('load', preloadAssets);
// const SFX_ENABLED = false;
// const PREVIEW_OPTIONS_ON_START = false;
const HOVER_SPEAK_ENABLED = true;
const HOVER_SPEAK_COOLDOWN_MS = 1800;
const HOVER_SPEAK_DISTANCE = 72;
// --- Level Up config ---
const LEVEL_STORAGE_KEY = 'fiveSensesLevel';
const LEVEL_UP_IMG_SRC = '../../../../images/levelup.png'; // put your image here
const gameQuestions = [
  { type: 'letter', question: "Click on the letter 'S' to hear the word SEE!", targets: ['L','T','R','M','S','B'], correct: 'S', explanation: "Yes, S starts SEE!" },
  { type: 'letter', question: "Click on the letter 'H' to hear the word HEAR!", targets: ['H','P','K','D','N','F'], correct: 'H', explanation: "Yes, H starts HEAR!" },
  { type: 'letter', question: "Click on the letter 'T' to hear the word TASTE!", targets: ['T','W','Q','V','X','Z'], correct: 'T', explanation: "Yes, T starts TASTE!" },
  { type: 'rhyme', question: "Which word rhymes with SEE?", targets: ['BEE','CAR','FROG','HAT','SUN','BOX'], correct: 'BEE', explanation: "Yes, BEE rhymes with SEE!" },
  { type: 'rhyme', question: "Which word rhymes with HEAR?", targets: ['EAR','CAT','FISH','TREE','BALL','BOOK'], correct: 'EAR', explanation: "Yes, EAR rhymes with HEAR!" },
  { type: 'rhyme', question: "Which word rhymes with NOSE?", targets: ['ROSE','BIRD','CAKE','STAR','MOON','FROG'], correct: 'ROSE', explanation: "Yes, ROSE rhymes with NOSE!" },
  { type: 'syllable', question: "Which word has TWO syllables like 'HEA-RING'?", targets: ['SEEING','LOOK','HEAR','FEEL','TASTE','SMELL'], correct: 'SEEING', explanation: "Yes, SEEING has two syllables like HEARING!" },
  { type: 'syllable', question: "Which word has TWO syllables like 'TOUCH-ING'?", targets: ['FEELING','SEE','HEAR','LOOK','SMELL','TASTE'], correct: 'FEELING', explanation: "Yes, FEELING has two syllables like TOUCHING!" },
  { type: 'syllable', question: "Which word has TWO syllables like 'SMELL-ING'?", targets: ['TASTING','SEE','HEAR','FEEL','LOOK','TOUCH'], correct: 'TASTING', explanation: "Yes, TASTING has two syllables like SMELLING!" },
  { type: 'sense-item', question: "What do you use to see a bright, shining star?", targets: ['👁️','👂','👃','👅','🤚','🦶'], correct: '👁️', explanation: "Yes, you use your EYES to see!" },
  { type: 'sense-item', question: "What do you use to smell flowers?", targets: ['👁️','👂','👃','👅','🤚','🦶'], correct: '👃', explanation: "Yes, you use your NOSE to smell!" },
  { type: 'sense-item', question: "What do you use to taste ice cream?", targets: ['👁️','👂','👃','👅','🤚','🦶'], correct: '👅', explanation: "Yes, you use your TONGUE to taste!" },
  { type: 'sense-item', question: "Which sense do you use to hear RING RING?", targets: ['👁️','👂','👃','👅','🤚','🦶'], correct: '👂', explanation: "Yes, you use your EARS to hear!" },
];
let currentQuestion = 0, gameStarted = false;
let lastExplanationSpoken = '';
const shootingGame = { canvas: null, ctx: null, running: false, balloons: [], particles: [], crosshair: { x: 200, y: 200 }, animationId: null, question: null };
const lastSpokenAt = new Map();
let readingQueueAbort = false;
let currentSpeechSource = null;
let hoverLocked = false;
function stopSpeech() {
  if (window.currentSpeech) {
    window.currentSpeech.pause();
    window.currentSpeech.currentTime = 0;
  } else {
    console.log("No currentSpeech to stop");
  }
}
function speak(text, source = null) {
  stopSpeech();
  currentSpeechSource = source;
  const audioMap = {
      "welcome-message": "../../../../audio/K1/U1/K1U1covergame.mp3",
      "How to Play": "../../../../audio/K1/U1/K1U1HowToPlay.mp3",
      // ===== RHYMING LEVELS =====
      "Click on the letter 'S' to hear the word SEE!": "../../../../audio/K1/U1/K1-U1-Q1.mp3",
      "Click on the letter 'H' to hear the word HEAR!": "../../../../audio/K1/U1/K1-U1-Q2.mp3",
      "Click on the letter 'T' to hear the word TASTE!": "../../../../audio/K1/U1/K1-U1-Q3.mp3",
      "Which word rhymes with SEE?": "../../../../audio/K1/U1/K1-U1-Q4.mp3",
       "Which sense do you use to hear RING RING?": "../../../../audio/K1/U1/K1-U1-Q8.mp3",
      // Explanations (friendly feedback)
      "Yes, S starts SEE! Can you say the word slowly with me? S...": "../../../../audio/K1/U1/q01_explanation.mp3",
      "Yes, H starts HEAR! Can you say the word slowly with me? H...": "../../../../audio/K1/U1/q02_explanation.mp3",
      "Yes, T starts TASTE! Can you say the word slowly with me? T...": "../../../../audio/K1/U1/q03_explanation.mp3",
      "Yes, BEE rhymes with SEE!": "../../../../audio/fivesenses/K1/U1/q04_explanation.mp3",
      "Yes, EAR rhymes with HEAR!": "../../../../audio/fivesenses/K1/U1/q05_explanation.mp3",
      "Yes, ROSE rhymes with NOSE!": "../../../../audio/fivesenses/K1/U1/q06_explanation.mp3",
      "Yes, SEEING has two syllables like HEARING!": "../../../../audio/K1/U1/fivesenses/q07_explanation.mp3",
      "Yes, FEELING has two syllables like TOUCHING!": "../../../../audio/K1/U1/fivesenses/q08_explanation.mp3",
      "Yes, TASTING has two syllables like SMELLING!": "../../../../audio/K1/U1/fivesenses/q09_explanation.mp3",
      "Yes, you use your EYES to see!": "../../../../audio/fivesenses/K1/U1/q10_explanation.mp3",
      "Yes, you use your NOSE to smell!": "../../../../audio/fivesenses/K1/U1/q11_explanation.mp3",
      "Yes, you use your TONGUE to taste!": "../../../../audio/fivesenses/K1/U1/q12_explanation.mp3",
      "Yes, you use your EARS to hear!": "../../../../audio/fivesenses/K1/U1/q13_explanation.mp3",
      "Great job! CAT and HAT rhyme because they end with the same -AT sound! MAP and CAP rhyme with the -AP sound!": "../../../../audio/K2-U1-1-Explanation.mp3",
      "Listen for the -AG and -ED sounds!": "../../../../audio/K2-U1-2-Hint.mp3",
      "Excellent! BAG and RAG rhyme with the -AG sound! RED and BED rhyme with the -ED sound!": "../../../../audio/K2-U1-2-Explanation.mp3",
      "Listen for the -AN and -OP sounds!": "../../../../audio/K2-U1-3-Hint.mp3",
      "Wonderful! MAN and VAN rhyme with the -AN sound! MOP and TOP rhyme with the -OP sound!": "../../../../audio/K2-U1-3-Explanation.mp3",
      // ===== VOCABULARY LEVELS =====
      "Starts with 'S'.": "../../../../audio/K1/U1/K1-U1-Q1-hint.mp3",
      "Starts with 'H'.": "../../../../audio/K1/U1/K1-U1-Q2-hint.mp3",
      "Starts with 'T'.": "../../../../audio/K1/U1/K1-U1-Q3-hint.mp3",
      "Listen for the word that starts with 'B'.": "../../../../audio/K1/U1/K1-U1-Q4-hint.mp3",
      "Listen for the word that starts with 'E'.": "../../../../audio/K1/U1/K1-U1-Q5-hint.mp3",
      "S": "../../../../audio/K1/U1/The letter S.mp3",
      "L": "../../../../audio/K1/U1/The letter L.mp3",
      "T": "../../../../audio/K1/U1/The letter T.mp3",
      "R": "../../../../audio/K1/U1/The letter R.mp3",
      "M": "../../../../audio/K1/U1/The letter M.mp3",
      "B": "../../../../audio/K1/U1/The letter B.mp3",
      "H": "../../../../audio/K1/U1/The letter H.mp3",
      "P": "../../../../audio/K1/U1/The letter P.mp3",
      "K": "../../../../audio/K1/U1/The letter K.mp3",
      "D": "../../../../audio/K1/U1/The letter D.mp3",
      "N": "../../../../audio/K1/U1/The letter N.mp3",
      "F": "../../../../audio/K1/U1/The letter F.mp3",
      "W": "../../../../audio/K1/U1/The letter W.mp3",
      "Q": "../../../../audio/K1/U1/The letter Q.mp3",
      "V": "../../../../audio/K1/U1/The letter V.mp3",
      "X": "../../../../audio/K1/U1/The letter X.mp3",
      "Z": "../../../../audio/K1/U1/The letter Z.mp3",
       "HAT.": "../../../../audio/K1/U1/hat.mp3",
      "CAT.": "../../../../audio/K1/U1/cat.mp3",
      "BALL.": "../../../../audio/K1/U1/ball.mp3",
      "TREE.": "../../../../audio/K1/U1/tree.mp3",
      "CAR.": "../../../../audio/K1/U1/car.mp3",
      "BEE.": "../../../../audio/K1/U1/bee.mp3",
      "CAKE.": "../../../../audio/K1/U1/cake.mp3",
      "SUN.": "../../../../audio/K1/U1/sun.mp3",
      "BOX.": "../../../../audio/K1/U1/box.mp3",
      "FROG.": "../../../../audio/K1/U1/frog.mp3",
      "Yes, BEE rhymes with SEE!": "../../../../audio/K1/U1/q04_explanation.mp3",
      "Which word rhymes with HEAR?": "../../../../audio/K1/U1/K1-U1-Q5.mp3",
      "FISH.": "../../../../audio/K1/U1/fish.mp3",
      "EAR.": "../../../../audio/K1/U1/ear.mp3",
      "BOOK.": "../../../../audio/K1/U1/book.mp3",
      "Yes, EAR rhymes with HEAR!": "../../../../audio/K1/U1/q05_explanation.mp3",
      "Listen for the word that starts with 'R'.": "../../../../audio/K1/U1/K1-U1-Q6-hint.mp3",
      "Which word rhymes with NOSE?": "../../../../audio/K1/U1/K1-U1-Q6.mp3",
      "ROSE.": "../../../../audio/K1/U1/rose.mp3",
      "MOON.": "../../../../audio/K1/U1/moon.mp3",
      "STAR.": "../../../../audio/K1/U1/star.mp3",
      "BIRD.": "../../../../audio/K1/U1/bird.mp3",
      "SEE.": "../../../../audio/K1/U1/see.mp3",
      "TOUCH.": "../../../../audio/K1/U1/touch.mp3",
      "Yes, ROSE rhymes with NOSE!": "../../../../audio/K1/U1/q06_explanation.mp3",
      "Listen for the word that starts with 'S'.": "../../../../audio/K1/U1/K1-U1-Q7-hint.mp3",
      "Which word has TWO syllables like 'HEA-RING'?": "../../../../audio/K1/U1/K1-U1-Q7.mp3",
      "FEEL.": "../../../../audio/K1/U1/feel.mp3",
      "LOOK.": "../../../../audio/K1/U1/look.mp3",
      "TASTE.": "../../../../audio/K1/U1/taste.mp3",
      "HEAR.": "../../../../audio/K1/U1/hear.mp3",
      "SEEING.": "../../../../audio/K1/U1/seeing.mp3",
      "Yes, SEEING has two syllables like HEARING!": "../../../../audio/K1/U1/q07_explanation.mp3",
      "Listen for the word that starts with 'F'.": "../../../../audio/K1/U1/K1-U1-Q8-hint.mp3",
      "Which word has TWO syllables like 'TOUCH-ING'?": "../../../../audio/K1/U1/K1-U1-Q8.mp3",
      "SMELL.": "../../../../audio/K1/U1/smell.mp3",
      "FEELING.": "../../../../audio/K1/U1/feeling.mp3",
      "Yes, FEELING has two syllables like TOUCHING!": "../../../../audio/K1/U1/q08_explanation.mp3",
      "Listen for the word that starts with 'T'.": "../../../../audio/K1/U1/K1-U1-Q9-hint.mp3",
      "Which word has TWO syllables like 'SMELL-ING'?": "../../../../audio/K1/U1/K1-U1-Q9.mp3",
      "FEEL.": "../../../../audio/K1/U1/feel.mp3",
      "TASTING.": "../../../../audio/K1/U1/tasting.mp3",
      "Yes, TASTING has two syllables like SMELLING!": "../../../../audio/K1/U1/q09_explanation.mp3",
      "Use your eyes.": "../../../../audio/K1/U1/K1-U1-Q10-hint.mp3",
      "What do you use to see a bright, shining star?": "../../../../audio/K1/U1/K1-U1-Q10.mp3",
      "tongue": "../../../../audio/K1/U1/tongue.mp3",
      "feet": "../../../../audio/K1/U1/feet.mp3",
      "ears": "../../../../audio/K1/U1/ears.mp3",
      "hands": "../../../../audio/K1/U1/hands.mp3",
      "eyes": "../../../../audio/K1/U1/eyes.mp3",
      "Yes, you use your EYES to see!": "../../../../audio/K1/U1/q10_explanation.mp3",
      "Use your nose.": "../../../../audio/K1/U1/K1-U1-Q11-hint.mp3",
      "What do you use to smell flowers?": "../../../../audio/K1/U1/K1-U1-Q11.mp3",
      "nose": "../../../../audio/K1/U1/nose.mp3",
      "Yes, you use your NOSE to smell!": "../../../../audio/K1/U1/q11_explanation.mp3",
      "Use your tongue.": "../../../../audio/K1/U1/K1-U1-Q12-hint.mp3",
      "What do you use to taste ice cream?": "../../../../audio/K1/U1/K1-U1-Q12.mp3",
      "Yes, you use your TONGUE to taste!": "../../../../audio/K1/U1/q12_explanation.mp3",
      "Use your ears.": "../../../../audio/K1/U1/K1-U1-Q13-hint.mp3",
      "Yes, you use your EARS to hear!": "../../../../audio/K1/U1/K1-U1-Q13.mp3",
      "Level up! Congratulations! You finished all the Five Senses challenges.": "../../../../audio/K1/U1/levelup.mp3",
       
  };
  // Match the letter after "The letter "
  let letterMatch = text.trim().match(/the letter (\w)/i);
  if (letterMatch) {
      const letter = letterMatch[1].toUpperCase();
      const audioFile = audioMap[letter];
      if (audioFile) {
          window.currentSpeech = new Audio(audioFile);
          window.currentSpeech.volume = 1.0;
          window.currentSpeech.play().catch(err => {
              console.warn("Audio playback failed for:", text, err);
              console.log("Error playing letter audio:", err);
          });
      } else {
          console.warn("⚠️ No matching audio found for letter:", letter);
      }
  } else {
      // Fallback: try exact match from audioMap for full phrases
      const normalized = text.trim();
      const matchedKey = Object.keys(audioMap).find(k => k === normalized);
      const audioFile = matchedKey ? audioMap[matchedKey] : null;
      if (audioFile) {
          window.currentSpeech = new Audio(audioFile);
          window.currentSpeech.volume = 1.0;
          window.currentSpeech.play().catch(err => {
              console.warn("Audio playback failed for:", text, err);
              console.log("Error playing phrase audio:", err);
          });
      } else {
          console.warn("⚠️ Could not find a letter or audio for text:", text);
      }
  }
}
function speakText(text) {
  speak(text);
}
function stripEmoji(s='') { return s.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, ''); }
function stopSpeaking() {
  stopSpeech();
  currentSpeechSource = null;
}
function stopHoverSpeech() {
  if (currentSpeechSource === 'hover') {
    stopSpeech();
    currentSpeechSource = null;
  }
}
function estimateSpeakMs(text) {
  const chars = (text || '').length;
  const perChar = 55;
  const base = 700;
  return Math.min(6000, Math.max(1200, base + chars * perChar));
}
function playHint(){
  const btn = document.getElementById('hint-btn');
  const q = gameQuestions[currentQuestion];
  const { spoken, icon } = buildHint(q);
  const prev = btn.querySelector('[aria-hidden="true"]');
  if (prev) prev.textContent = icon;
  stopSpeaking();
  speak(spoken);
}
function buildHint(q){
  if (q.type === 'letter'){
    const letter = q.correct.toString().charAt(0).toUpperCase();
    return { spoken: `Starts with '${letter}'.`, icon: letter };
  }
  if (q.type === 'rhyme' || q.type === 'syllable'){
    const first = q.correct.toString().charAt(0).toUpperCase();
    return { spoken: `Listen for the word that starts with '${first}'.`, icon: first };
  }
  if (q.type === 'sense-item'){
    const map = { '👁️':'eyes', '👂':'ears', '👃':'nose', '👅':'tongue', '🤚':'hands', '🦶':'feet' };
    const part = map[q.correct] || 'the right sense';
    return { spoken: `Use your ${part}.`, icon: q.correct };
  }
  return { spoken: 'Here is a little hint.', icon: '💡' };
}
function startGame() {
  document.getElementById('cover-screen').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('cover-screen').style.display = 'none';
    document.getElementById('game-container').classList.add('active');
    gameStarted = true;
    loadQuestion();
  }, 500);
}
function backToActivities() {
  stopSpeaking();
  stopShootingGame();
  document.getElementById('game-container').classList.remove('active');
  const cover = document.getElementById('cover-screen');
  cover.style.display = 'flex';
  requestAnimationFrame(() => cover.classList.remove('hidden'));
  coverVoiceSpoken = false;
  setTimeout(speakCoverInstruction, 300);
}
function loadQuestion() {
  // Stop all audio when moving to new question
  stopSpeaking();
  stopHoverSpeech();
  readingQueueAbort = true;
 
  const q = gameQuestions[currentQuestion];
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('next-btn').style.display = 'none';
  const progress = (currentQuestion / gameQuestions.length) * 100;
  const bar = document.getElementById('progress-bar'); if (bar) bar.style.width = progress + '%';
  const hintBtnIcon = document.getElementById('hint-btn').querySelector('[aria-hidden="true"]');
  if (hintBtnIcon) hintBtnIcon.textContent = '💡';
  loadShootingGame(q);
  startShootingGame();
  hoverLocked = false;
  speakText(q.question);

}
function playQuestion(){
  const q = gameQuestions[currentQuestion];
  if (!q) return;
  hoverLocked = true;
  stopSpeaking();
  speakText(q.question);
  const qDelay = estimateSpeakMs(q.question);
  setTimeout(() => { hoverLocked = false; }, qDelay);
}
function stopAudio(){
  stopSpeaking();
  hoverLocked = false;
  readingQueueAbort = true;
}
function loadShootingGame(question) {
  const gameArea = document.getElementById('game-area');
  const canvas = document.getElementById('shooting-canvas');
  const playButton = document.getElementById('play-button');
  shootingGame.canvas = canvas;
  shootingGame.ctx = canvas.getContext('2d');
  shootingGame.question = question;
  shootingGame.running = false;
  shootingGame.balloons = [];
  shootingGame.particles = [];
  lastSpokenAt.clear();
  readingQueueAbort = false;
  playButton.style.display = 'block';
  const rect = gameArea.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  drawInitialState();
}
function drawInitialState() {
  const ctx = shootingGame.ctx, canvas = shootingGame.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#87CEEB'); gradient.addColorStop(1, '#E0F6FF');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawClouds(ctx, canvas);
}
function drawClouds(ctx, canvas) {
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  drawCloud(ctx, 100, 60, 60); drawCloud(ctx, canvas.width - 140, 90, 50); drawCloud(ctx, canvas.width / 2, 60, 45);
}
function drawCloud(ctx, x, y, size) {
  ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.arc(x + size * .6, y, size * .8, 0, Math.PI * 2); ctx.arc(x + size * 1.2, y, size, 0, Math.PI * 2);
  ctx.arc(x + size * .3, y - size * .5, size * .7, 0, Math.PI * 2); ctx.arc(x + size * .9, y - size * .5, size * .7, 0, Math.PI * 2); ctx.fill();
}
function startShootingGame() {
  document.getElementById('play-button').style.display = 'none';
  shootingGame.running = true;
  createBalloons();
  shootingGame.canvas.addEventListener('mousemove', updateCrosshair);
  shootingGame.canvas.addEventListener('click', shootBalloon);
  shootingGame.canvas.addEventListener('touchstart', handleTouch, { passive: false });
  shootingGame.canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  if (HOVER_SPEAK_ENABLED) {
    shootingGame.canvas.addEventListener('mousemove', hoverSpeakHandler);
    shootingGame.canvas.addEventListener('mouseleave', stopHoverSpeech);
    shootingGame.canvas.addEventListener('touchstart', hoverSpeakTouchHandler, { passive: true });
    shootingGame.canvas.addEventListener('touchend', stopHoverSpeech, { passive: true });
    shootingGame.canvas.addEventListener('touchcancel', stopHoverSpeech, { passive: true });
  }
  animateShootingGame();
}
function getHintRect(){ return { x: -9999, y: -9999, w: 0, h: 0 }; }
function pick(arr, n){
  const pool = [...arr];
  const out = [];
  while (n > 0 && pool.length) {
    const i = (Math.random() * pool.length) | 0;
    out.push(pool.splice(i, 1)[0]);
    n--;
  }
  return out;
}
function createBalloons() {
  shootingGame.balloons = [];
  const canvas = shootingGame.canvas;
  const q = shootingGame.question;
  const MAX_BALLOONS = 5;
  const all = Array.isArray(q.targets) ? [...q.targets] : [];
  if (!all.includes(q.correct)) all.push(q.correct);
  const distractors = all.filter(item => item !== q.correct);
  const count = Math.min(MAX_BALLOONS, all.length);
  const chosen = [q.correct, ...pick(distractors, Math.max(0, count - 1))];
  const items = shuffle(chosen);
  const hintRect = getHintRect();
  items.forEach(item => {
    let placed = false, tries = 0;
    // Larger balloons for better visibility and engagement
    const radius = /[\p{Extended_Pictographic}]/u.test(item) ? 85 : 75;
    while (!placed && tries < 220) {
      tries++;
      const x0 = 80 + Math.random() * (canvas.width - 160);
      const y0 = 140 + Math.random() * (canvas.height - 280);
      const candidate = {
        x: x0, y: y0, item,
        color: getRandomBalloonColor(),
        radius,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
      };
      if (!intersectsHint(candidate, hintRect) &&
          !overlapsExisting(candidate, shootingGame.balloons)) {
        shootingGame.balloons.push(candidate);
        placed = true;
      }
    }
  });
}
function intersectsHint(b, r) {
  return b.x + b.radius > r.x && b.x - b.radius < r.x + r.w &&
         b.y + b.radius > r.y && b.y - b.radius < r.y + r.h;
}
function overlapsExisting(b, arr) {
  return arr.some(o => Math.hypot(b.x - o.x, b.y - o.y) < (b.radius + o.radius + 20));
}
function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function getRandomBalloonColor() {
  // More vibrant and colorful balloons for children
  const colors = [
    '#FF6B6B', // Bright red
    '#FF69B4', // Hot pink
    '#FFD700', // Gold
    '#FF8C00', // Dark orange
    '#32CD32', // Lime green
    '#00CED1', // Dark turquoise
    '#9370DB', // Medium purple
    '#FF1493', // Deep pink
    '#00FF7F', // Spring green
    '#FF4500', // Orange red
    '#8A2BE2', // Blue violet
    '#FFB6C1', // Light pink
    '#7FFF00', // Chartreuse
    '#FF69B4', // Hot pink
    '#00BFFF' // Deep sky blue
  ];
  return colors[(Math.random() * colors.length) | 0];
}
function updateCrosshair(e) {
  const r = shootingGame.canvas.getBoundingClientRect();
  shootingGame.crosshair.x = e.clientX - r.left;
  shootingGame.crosshair.y = e.clientY - r.top;
}
function handleTouch(e) {
  e.preventDefault();
  const r = shootingGame.canvas.getBoundingClientRect();
  const t = e.touches[0];
  shootingGame.crosshair.x = t.clientX - r.left;
  shootingGame.crosshair.y = t.clientY - r.top;
  if (HOVER_SPEAK_ENABLED && !hoverLocked) hoverSpeakAt(t.clientX, t.clientY);
  shootBalloon(e);
}
function handleTouchMove(e) {
  e.preventDefault();
  const r = shootingGame.canvas.getBoundingClientRect();
  const t = e.touches[0];
  shootingGame.crosshair.x = t.clientX - r.left;
  shootingGame.crosshair.y = t.clientY - r.top;
}
function shootBalloon(e) {
  let clickX, clickY;
  if (e.type === 'touchstart') {
    const r = shootingGame.canvas.getBoundingClientRect(), t = e.touches[0];
    clickX = t.clientX - r.left; clickY = t.clientY - r.top;
  } else {
    const r = shootingGame.canvas.getBoundingClientRect();
    clickX = e.clientX - r.left; clickY = e.clientY - r.top;
  }
  for (let i = shootingGame.balloons.length - 1; i >= 0; i--) {
    const b = shootingGame.balloons[i];
    const d = Math.hypot(clickX - b.x, clickY - b.y);
    if (d < b.radius) {
      const isCorrect = b.item === shootingGame.question.correct;
      if (isCorrect) {
        // if (SFX_ENABLED) sfx.ding();
        createParticles(b.x, b.y, '#22c55e');
        shootingGame.balloons.splice(i, 1);
        setTimeout(() => { stopShootingGame(); showExplanation(true); }, 650);
      } else {
        // if (SFX_ENABLED) sfx.buzz();
        createParticles(b.x, b.y, '#ef4444');
        b.x += (Math.random() - .5) * 16; b.y += (Math.random() - .5) * 16;
      }
      break;
    }
  }
}
function createParticles(x, y, color = '#ffd700') {
  for (let i = 0; i < 26; i++) {
    shootingGame.particles.push({ x, y, vx: (Math.random() - .5) * 12, vy: (Math.random() - .5) * 12, life: 1, color, size: 3 + Math.random() * 4 });
  }
}
function animateShootingGame() {
  if (!shootingGame.running) return;
  const ctx = shootingGame.ctx, canvas = shootingGame.canvas;
  drawInitialState();
  shootingGame.balloons.forEach(b => {
    b.x += b.vx; b.y += b.vy;
    if (b.x - b.radius < 0 || b.x + b.radius > canvas.width) b.vx *= -1;
    if (b.y - b.radius < 0 || b.y + b.radius + 40 > canvas.height) b.vy *= -1;
    drawBalloon(ctx, b);
  });
  shootingGame.particles = shootingGame.particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.vy += .35; p.life -= .02;
    if (p.life > 0) { ctx.save(); ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); return true; }
    return false;
  });
  drawCrosshair(ctx);
  shootingGame.animationId = requestAnimationFrame(animateShootingGame);
}
// --- Balloon text fitting ---
function isEmojiText(t){ return /[\p{Extended_Pictographic}]/u.test(t); }
function measureTextWH(ctx, text, fontPx, fontFamily='Arial', fontWeight='bold'){
  ctx.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
  const m = ctx.measureText(text);
  const h = (m.actualBoundingBoxAscent || fontPx*0.8) + (m.actualBoundingBoxDescent || fontPx*0.2);
  const w = m.width;
  return { w, h };
}
/**
 * Find the largest font size that fits within the balloon.
 * We keep a small padding so text never touches the balloon edge.
 */
function fitFontToBalloon(ctx, text, radius){
  const isEmoji = isEmojiText(text);
  const pad = Math.max(10, radius * 0.12); // visual padding
  const maxW = (radius * 2) - pad * 2; // usable width
  const maxH = (radius * 2) - pad * 2; // usable height
  const fontFamily = isEmoji
    ? `'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif`
    : `Arial, Helvetica, sans-serif`;
  // Reasonable starting bounds
  let lo = 8; // min px
  let hi = isEmoji ? Math.round(radius * 1.15)
                   : (/^[A-Za-z]$/.test(text) ? Math.round(radius * 1.05)
                                              : Math.round(radius * 0.75));
  // Binary search for best size
  let best = lo;
  while (lo <= hi) {
    const mid = ((lo + hi) / 2) | 0;
    const { w, h } = measureTextWH(ctx, text, mid, fontFamily);
    if (w <= maxW && h <= maxH) { best = mid; lo = mid + 1; }
    else { hi = mid - 1; }
  }
  return { fontPx: best, fontFamily };
}
function drawBalloon(ctx, b) {
  // shadow
  ctx.save();
  ctx.globalAlpha = .25;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(b.x + 6, b.y + 6, b.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // body
  ctx.fillStyle = b.color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fill();
  // highlight
  ctx.fillStyle = 'rgba(255,255,255,.35)';
  ctx.beginPath();
  ctx.arc(b.x - 14, b.y - 14, b.radius * .32, 0, Math.PI * 2);
  ctx.fill();
  // string
  ctx.strokeStyle = '#333';
  ctx.lineWidth = Math.max(2, Math.round(b.radius * 0.04));
  ctx.beginPath();
  ctx.moveTo(b.x, b.y + b.radius);
  ctx.lineTo(b.x, b.y + b.radius + 44);
  ctx.stroke();
  // --- fitted text ---
  const isEmoji = isEmojiText(b.item);
  const { fontPx, fontFamily } = fitFontToBalloon(ctx, b.item, b.radius);
  // outline width scales with size
  const outline = Math.max(2, Math.round(fontPx * 0.08));
  ctx.font = `bold ${fontPx}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Emoji/letters read best with a subtle outline for contrast
  ctx.lineWidth = outline;
  ctx.strokeStyle = '#333';
  ctx.fillStyle = '#fff';
  // slight vertical nudge for emoji fonts so they look visually centered
  const nudgeY = isEmoji ? Math.round(fontPx * 0.05) : 2;
  ctx.strokeText(b.item, b.x, b.y + nudgeY);
  ctx.fillText(b.item, b.x, b.y + nudgeY);
}
function drawCrosshair(ctx) {
  const x = shootingGame.crosshair.x, y = shootingGame.crosshair.y;
  ctx.strokeStyle = '#ff0000'; ctx.lineWidth = 3; ctx.beginPath();
  ctx.moveTo(x - 28, y); ctx.lineTo(x + 28, y);
  ctx.moveTo(x, y - 28); ctx.lineTo(x, y + 28);
  ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.stroke();
}
function stopShootingGame() {
   stopApplause();
  shootingGame.running = false;
  readingQueueAbort = true;
  if (shootingGame.animationId) cancelAnimationFrame(shootingGame.animationId);
  if (shootingGame.canvas) {
    shootingGame.canvas.removeEventListener('mousemove', updateCrosshair);
    shootingGame.canvas.removeEventListener('click', shootBalloon);
    shootingGame.canvas.removeEventListener('touchstart', handleTouch);
    shootingGame.canvas.removeEventListener('touchmove', handleTouchMove);
    if (HOVER_SPEAK_ENABLED) {
      shootingGame.canvas.removeEventListener('mousemove', hoverSpeakHandler);
      shootingGame.canvas.removeEventListener('mouseleave', stopHoverSpeech);
      shootingGame.canvas.removeEventListener('touchstart', hoverSpeakTouchHandler);
      shootingGame.canvas.removeEventListener('touchend', stopHoverSpeech);
      shootingGame.canvas.removeEventListener('touchcancel', stopHoverSpeech);
    }
  }
}
function optionToSpeech(item) {
  const senseMap = { '👁️':'eyes', '👂':'ears', '👃':'nose', '👅':'tongue', '🤚':'hands', '🦶':'feet' };
  if (/[\p{Extended_Pictographic}]/u.test(item)) {
    const word = senseMap[item] || 'picture';
    return ` ${word} `;
  }
  if (/^[A-Za-z]$/.test(item)) return `The letter ${item.toUpperCase()}.`;
  if (/^[A-Za-z]+$/.test(item)) return `${item}.`;
  return `${item}.`;
}
function hoverSpeakHandler(e) {
  if (!HOVER_SPEAK_ENABLED || !shootingGame.running || hoverLocked) return;
  const r = shootingGame.canvas.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  maybeSpeakNearest(x, y);
}
function hoverSpeakTouchHandler(e) {
  if (!HOVER_SPEAK_ENABLED || !shootingGame.running || hoverLocked) return;
  const t = e.touches?.[0]; if (!t) return;
  hoverSpeakAt(t.clientX, t.clientY);
}
function hoverSpeakAt(clientX, clientY) {
  const r = shootingGame.canvas.getBoundingClientRect();
  const x = clientX - r.left, y = clientY - r.top;
  maybeSpeakNearest(x, y);
}
function maybeSpeakNearest(x, y) {
  let best = null, bestD = Infinity;
  for (const b of shootingGame.balloons) {
    const d = Math.hypot(x - b.x, y - b.y);
    if (d < bestD) { bestD = d; best = b; }
  }
  const threshold = best ? Math.max(best.radius * 0.8, HOVER_SPEAK_DISTANCE) : HOVER_SPEAK_DISTANCE;
  if (best && bestD <= threshold) {
    const now = performance.now();
    const last = lastSpokenAt.get(best.item) || 0;
    if (now - last >= HOVER_SPEAK_COOLDOWN_MS) {
      lastSpokenAt.set(best.item, now);
      speak(optionToSpeech(best.item), 'hover');
    }
  } else {
    stopHoverSpeech();
  }
}
function waitMs(ms) { return new Promise(res => setTimeout(res, ms)); }
function buildFriendlyFeedback(q){
  if(q.type === 'letter'){
    return `${q.explanation} Can you say the word slowly with me? ${q.correct}...`;
  }
  if(q.type === 'rhyme'){
    return `${q.explanation}`;
  }
  if(q.type === 'syllable'){
    return `${q.explanation} `;
  }
  if(q.type === 'sense-item'){
    const map = { '👁️':'eyes', '👂':'ears', '👃':'nose', '👅':'tongue', '🤚':'hands', '🦶':'feet' };
    return `${q.explanation} `;
  }
  return q.explanation;
}
function showExplanation(correct) {
 
  const q = gameQuestions[currentQuestion];
  // const titleEl = document.getElementById('explanation-title');
  // if (titleEl) {
  // titleEl.textContent = correct ? 'Well done!' : 'Nice try!';
  // }
  const text = buildFriendlyFeedback(q);
  const textEl = document.getElementById('explanation-text');
  if (textEl) {
    textEl.textContent = text;
  }
  // Show modal
  const modal = document.getElementById('explanation-modal');
  if (modal) {
    modal.classList.add('show');
  }
  lastExplanationSpoken = text;
  if (correct) {
    showFireworks();
    playApplause(3000);
  }
  speakText(text);
}
function showFireworks() {
    const container = document.createElement('div');
    container.className = 'fireworks-canvas';
    document.body.appendChild(container);
    const colors = ['#ff3838', '#ffd93b', '#3b9eff', '#4eff8e', '#ff73ff'];
    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            const burstX = Math.random() * window.innerWidth;
            const burstY = Math.random() * (window.innerHeight * 0.5);
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = `${burstX}px`;
                particle.style.top = `${burstY}px`;
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                particle.style.position = 'fixed';
                particle.style.pointerEvents = 'none';
                particle.style.boxShadow = `0 0 8px ${particle.style.background}, 0 0 16px ${particle.style.background}`;
                container.appendChild(particle);
                // Random launch direction
                const angle = Math.random() * 2 * Math.PI;
                const distance = 60 + Math.random() * 120;
                const xTarget = Math.cos(angle) * distance;
                const yTarget = Math.sin(angle) * distance;
                const duration = 900 + Math.random() * 400;
                particle.animate(
                    [
                        { transform: 'translate(0, 0)', opacity: 1 },
                        { transform: `translate(${xTarget}px, ${yTarget}px)`, opacity: 0 }
                    ],
                    { duration, easing: 'cubic-bezier(.3,0,.7,1)', fill: 'forwards' }
                );
                setTimeout(() => particle.remove(), duration + 100);
            }
        }, burst * 400);
    }
    setTimeout(() => container.remove(), 3000);
}
// Hide modal on button click
document.getElementById('continue-button').addEventListener('click', () => {
  const modal = document.getElementById('explanation-modal');
  if (modal) modal.classList.remove('show');
});
function continueGame() {
   stopApplause();
  stopSpeaking();
  stopHoverSpeech();
  readingQueueAbort = true;
  hoverLocked = false;
  currentQuestion++;
  if (currentQuestion >= gameQuestions.length) { showGameComplete(); } else { loadQuestion(); }
}
function showGameComplete() {
  const prev = parseInt(localStorage.getItem(LEVEL_STORAGE_KEY) || '0', 10);
  const nextLevel = prev + 1;
  localStorage.setItem(LEVEL_STORAGE_KEY, String(nextLevel));
  // Hide game area and create full-page level up screen
  document.getElementById('game-area').style.display = 'none';
  const bar = document.getElementById('progress-bar'); if (bar) bar.style.width = '100%';
  // Create full-page overlay for level up screen
  const overlay = document.createElement('div');
  overlay.id = 'levelup-overlay';
  overlay.className = 'levelup-fullpage-overlay';
  overlay.innerHTML = `
    <div class="levelup-fullpage-content">
      <img class="levelup-fullpage-image" src="${'../../../../images/levelup.png'}"
           alt="Level up! Congratulations!">
           <div class="levelup-buttons-top">
        <button onclick="restartGame()" class="levelup-btn-top play-again">🔄 Play Again</button>
        <a href='../../../../html/ELA/K1/ELA-K1-UnitMap.html' class="levelup-btn-top back-map" aria-label="Back to Unit Map">🏠 Back</a>
      </div>
    </div>
  `;
  // Add overlay to body
  document.body.appendChild(overlay);
  // celebratory TTS
  speakText(`Level up! Congratulations! You finished all the Five Senses challenges.`);
 
  // Hide topbar
  const topbar = document.querySelector('.topbar');
  if (topbar) topbar.style.display = 'none';
}
function showHowToPlay() {
  stopSpeech();
  document.getElementById("instructions-modal").classList.add("active");
  replayInstructions();
}
function showInstructions() {
  showHowToPlay();
}
function replayInstructions() {
  stopSpeech();
  speak("How to Play");
}
function closeInstructions() {
  const modal = document.getElementById('instructions-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  stopSpeech();
}
function restartGame() {
   stopApplause();
  currentQuestion = 0;
  stopSpeaking();
 
  const levelupOverlay = document.getElementById('levelup-overlay');
  if (levelupOverlay) levelupOverlay.remove();
 
  // Show topbar again
  const topbar = document.querySelector('.topbar');
  if (topbar) topbar.style.display = 'flex';
 
  document.getElementById('game-area').style.display = 'block';
  document.getElementById('cover-screen').style.display = 'flex';
  document.getElementById('cover-screen').classList.remove('hidden');
  document.getElementById('game-container').classList.remove('active');
  gameStarted = false;
  setEndStateUI(false);
}
function replayQuestion() {
    stopApplause();
  const overlay = document.getElementById('explanation-overlay');
  if (overlay) overlay.style.display = 'none';
  stopSpeaking();
  stopShootingGame();
  loadQuestion();
}
window.addEventListener('load', async () => {
  document.getElementById('cover-screen').style.display = 'flex';
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopSpeaking();
  });
  // await ensureVoiceReady();
});
// Cover voice
let coverVoiceSpoken = false;
function speakCoverInstruction() {
  if (coverVoiceSpoken) return;
  coverVoiceSpoken = true;
  // speak("welcome-message");
}
function setEndStateUI(on) {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  if (on) {
    topbar.classList.add('end-state');
  } else {
    topbar.classList.remove('end-state');
  }
}
// ======== GLOBAL BACKGROUND MUSIC ========
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicMuted = false;
// Try autoplay
window.addEventListener('load', () => {
  backgroundMusic.volume = 0.3;
  backgroundMusic.play().then(() => {
    musicToggle.textContent = '🔊';
  }).catch(() => {
    console.warn('Autoplay blocked — will start after user interaction.');
  });
});
// Toggle mute/unmute
musicToggle.addEventListener('click', () => {
  if (isMusicMuted) {
    backgroundMusic.play().catch(() => {});
    musicToggle.textContent = '🔊';
  } else {
    backgroundMusic.pause();
    musicToggle.textContent = '🔇';
  }
  isMusicMuted = !isMusicMuted;
});
// --- Applause control ---
let applauseEl = null;
let applauseTimer = null;
function ensureApplause() {
    if (!applauseEl) {
        applauseEl = new Audio('../../../../audio/applause.mp3');
        applauseEl.volume = 0.5;
    }
    return applauseEl;
}
function playApplause(maxMs = 1500) { // default: 1 second
    const a = ensureApplause();
    try {
        if (applauseTimer) clearTimeout(applauseTimer);
        a.currentTime = 0;
        a.play().catch(() => { console.log("Applause play failed"); });
        applauseTimer = setTimeout(stopApplause, maxMs);
    } catch (e) { console.log("Applause error:", e); }
}
function stopApplause() {
    try {
        if (applauseTimer) { clearTimeout(applauseTimer); applauseTimer = null; }
        if (applauseEl) { applauseEl.pause(); applauseEl.currentTime = 0; }
    } catch (e) { console.log("Stop applause error:", e); }
}
window.addEventListener('load', () => {
    const audio = document.getElementById('background-music');
    if (!audio) return;
    audio.volume = 0.3; // gentle volume
    const playPromise = audio.play();
    // Handle autoplay restrictions gracefully
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Autoplay blocked — wait for user interaction
            const startAudio = () => {
                audio.play().catch(() => {});
                document.removeEventListener('click', startAudio);
                document.removeEventListener('touchstart', startAudio);
            };
            document.addEventListener('click', startAudio);
            document.addEventListener('touchstart', startAudio);
        });
    }
});
// Auto-play voice instruction when cover loads
window.addEventListener('DOMContentLoaded', () => {
  const coverScreen = document.getElementById('cover-screen');
  if (coverScreen && coverScreen.style.display !== 'none') {
    speakCoverInstruction();
  }
});