    const FORCE_TTS_VOICE_NAME = "Google US English";
    const SFX_ENABLED = false;

    const PREVIEW_OPTIONS_ON_START = false;
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

    const sfx = {
      ctx: null,
      init() { if (!SFX_ENABLED) return; if (this.ctx) return; this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
      tone({ freq = 660, dur = .2, type = 'sine', vol = .4 } = {}) {
        if (!SFX_ENABLED || !this.ctx) return;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = type; o.frequency.value = freq;
        g.gain.setValueAtTime(vol, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
        o.connect(g).connect(this.ctx.destination);
        o.start(); o.stop(this.ctx.currentTime + dur);
      },
      pop() { this.tone({ freq: 280, dur: .1, type: 'triangle', vol: .35 }); },
      ding() { this.tone({ freq: 880, dur: .2, type: 'sine', vol: .45 }); this.tone({ freq: 1320, dur: .14, type: 'sine', vol: .35 }); },
      buzz() { this.tone({ freq: 180, dur: .25, type: 'square', vol: .45 }); }
    };

    let selectedVoice = null;
    function pickForcedVoice() {
      if (!('speechSynthesis' in window)) return null;
      const voices = speechSynthesis.getVoices() || [];
      let v = voices.find(v => v.name === FORCE_TTS_VOICE_NAME)
            || voices.find(v => v.name && v.name.toLowerCase().includes(FORCE_TTS_VOICE_NAME.toLowerCase()));
      if (!v) v = voices.find(v => (v.lang || '').toLowerCase().startsWith('en'));
      return v || null;
    }
    function ensureVoiceReady() {
      return new Promise(resolve => {
        if (!('speechSynthesis' in window)) return resolve();
        const tryPick = () => { selectedVoice = pickForcedVoice(); resolve(); };
        const existing = speechSynthesis.getVoices();
        if (existing && existing.length) return tryPick();
        speechSynthesis.onvoiceschanged = tryPick;
        speechSynthesis.getVoices();
      });
    }

    function speak(text, source='general') {
      if (!('speechSynthesis' in window) || !text) return;
      const clean = stripEmoji(text);
      const u = new SpeechSynthesisUtterance(clean);
      u.rate = 0.82;  u.pitch = 1.05;  u.volume = 1.0;
      if (selectedVoice) { u.voice = selectedVoice; u.lang = selectedVoice.lang || 'en-US'; }
      else { u.lang = 'en-US'; }
      speechSynthesis.cancel();
      currentSpeechSource = source;
      u.onend = () => { if (currentSpeechSource === source) currentSpeechSource = null; };
      speechSynthesis.speak(u);
    }
    function speakText(text) { speak(text, 'general'); }
    function stripEmoji(s='') { return s.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, ''); }
    function stopSpeaking() { if ('speechSynthesis' in window) speechSynthesis.cancel(); currentSpeechSource = null; }

    function stopHoverSpeech() {
      if (currentSpeechSource === 'hover') {
        speechSynthesis.cancel();
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
      speak(spoken, 'general');
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
      sfx.init(); if (SFX_ENABLED) sfx.tone({ freq: 520, dur: .07, type: 'triangle' });
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
          const x0 = 80 + Math.random() * (canvas.width  - 160);
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
        '#00BFFF'  // Deep sky blue
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
      if (SFX_ENABLED) sfx.pop();
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
            if (SFX_ENABLED) sfx.ding();
            createParticles(b.x, b.y, '#22c55e');
            shootingGame.balloons.splice(i, 1);
            setTimeout(() => { stopShootingGame(); showExplanation(true); }, 650);
          } else {
            if (SFX_ENABLED) sfx.buzz();
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
  const pad = Math.max(10, radius * 0.12);           // visual padding
  const maxW = (radius * 2) - pad * 2;               // usable width
  const maxH = (radius * 2) - pad * 2;               // usable height

  const fontFamily = isEmoji
    ? `'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif`
    : `Arial, Helvetica, sans-serif`;

  // Reasonable starting bounds
  let lo = 8;                                        // min px
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
      document.getElementById('explanation-title').textContent = correct ? 'Well done!' : 'Nice try!';
      const text = buildFriendlyFeedback(q);
      document.getElementById('explanation-text').textContent = text;
      document.getElementById('explanation-overlay').style.display = 'flex';
      lastExplanationSpoken = text;
      
      // Play applause sound for correct answers
    if (correct) {
  playApplause(3000); // 1 second applause
}

      
      speakText(text);
    }

    function continueGame() {
       stopApplause(); 
      stopSpeaking();
      stopHoverSpeech();
      readingQueueAbort = true;
      hoverLocked = false;

      document.getElementById('explanation-overlay').style.display = 'none';
      currentQuestion++;
      if (currentQuestion >= gameQuestions.length) { showGameComplete(); } else { loadQuestion(); }
    }

function showGameComplete() {
  // bump and persist "level"
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


    function restartGame() {
       stopApplause();    
      currentQuestion = 0;
      stopSpeaking();
      
      // Remove level up overlay if it exists
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
      document.addEventListener('visibilitychange', () => { if (document.hidden) stopSpeaking(); });
      await ensureVoiceReady();
    });
  // Voice instruction on cover screen load
let coverVoiceSpoken = false;

function speakCoverInstruction() {
  if (!('speechSynthesis' in window) || coverVoiceSpoken) return;
  coverVoiceSpoken = true;
  
  const text = "Welcome to the Five Senses Shooting Game! Press the green play button to start, or press the question mark button to learn how to play.";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.05;
  utterance.volume = 1.0;
  utterance.lang = 'en-US';
  
  // Wait a bit for voices to load
  setTimeout(() => {
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.includes('Google US English')) 
                  || voices.find(v => v.lang.startsWith('en'));
    if (voice) utterance.voice = voice;
    
    speechSynthesis.speak(utterance);
  }, 500);
}

// Show instructions modal
function showInstructions() {
  const modal = document.getElementById('instructions-modal');
  if (modal) {
    modal.classList.add('active');
    
    // Speak instructions
    if ('speechSynthesis' in window) {
      const text = "Here's how to play: Press the green play button to start. Listen carefully to the question about the five senses. Click on balloons to pop them and find the correct answer. Use the hint button if you need help. Click the speaker button to hear the question again. Click the stop button to stop all sounds. Have fun learning about your five senses!";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  }
}

// Replay instructions audio
function replayInstructions() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const text = "Here's how to play: Press the green play button to start. Listen carefully to the question about the five senses. Click on balloons to pop them and find the correct answer. Use the hint button if you need help. Click the speaker button to hear the question again. Click the stop button to stop all sounds. Have fun learning about your five senses!";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

// Close instructions modal
function closeInstructions() {
  const modal = document.getElementById('instructions-modal');
  if (modal) {
    modal.classList.remove('active');
    speechSynthesis.cancel();
  }
}

// Auto-play voice instruction when cover loads
window.addEventListener('DOMContentLoaded', () => {
  const coverScreen = document.getElementById('cover-screen');
  if (coverScreen && coverScreen.style.display !== 'none') {
    speakCoverInstruction();
  }
});

// Also speak when returning to cover
function backToActivities() {
    stopApplause(); 
  const gameContainer = document.getElementById('game-container');
  const coverScreen = document.getElementById('cover-screen');
  
  if (gameContainer) gameContainer.classList.remove('active');
  if (coverScreen) {
    coverScreen.style.display = 'flex';
    coverScreen.classList.remove('hidden');
    coverVoiceSpoken = false;
    setTimeout(speakCoverInstruction, 300);
  }
}function setEndStateUI(on) {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  if (on) {
    topbar.classList.add('end-state');
  } else {
    topbar.classList.remove('end-state');
  }
}
/* ======== Background Music ======== */
let musicPlaying = false;
let musicAvailable = false;
const bgMusic = document.getElementById('background-music');
const musicBtn = document.getElementById('music-control');

// Try to play automatically once the page loads
window.addEventListener('load', () => {
  if (!bgMusic) return;

  bgMusic.addEventListener('canplay', () => {
    musicAvailable = true;
    bgMusic.volume = 0.5; // optional: adjust volume
    bgMusic.play()
      .then(() => {
        musicPlaying = true;
        musicBtn.textContent = '🔊';
        console.log('Background music started automatically.');
      })
      .catch(err => {
        console.warn('Autoplay was blocked by the browser.', err);
        musicBtn.textContent = '🔇';
      });
  });

 
});

function toggleMusic() {

  if (musicPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🔇';
    musicPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        musicBtn.textContent = '🔊';
        musicPlaying = true;
      })
      .catch(err => {
        console.log('Music play failed:', err);
        alert('Unable to play music. Please check your browser settings.');
      });
  }
}
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

function playApplause(maxMs = 1000) {          // default: 1 second
  const a = ensureApplause();
  try {
    if (applauseTimer) clearTimeout(applauseTimer);
    a.currentTime = 0;
    a.play().catch(() => {});
    applauseTimer = setTimeout(stopApplause, maxMs);
  } catch (e) {}
}

function stopApplause() {
  try {
    if (applauseTimer) { clearTimeout(applauseTimer); applauseTimer = null; }
    if (applauseEl) { applauseEl.pause(); applauseEl.currentTime = 0; }
  } catch (e) {}
}
