// Game Questions
const gameQuestions = [
  // Forest Scene
  { scene: 'forest', question: "What color is the frog sitting on the rock?", targets: ['Green', 'Blue', 'Red', 'Yellow', 'Brown'], correct: 'Green', explanation: "Excellent! The frog is green!", hint: "Look near the pond for the frog." },
  { scene: 'forest', question: "What is special about the lezard's color?", targets: ['Blend', 'Bright', 'Shine', 'Dark', 'Spotted'], correct: 'Blend', explanation: "Perfect! The lezard uses camouflage to blend in!", hint: "The lezard blends in with its surroundings." },
  { scene: 'forest', question: "What color is the ladybug?", targets: ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple'], correct: 'Red', explanation: "Yes! The ladybug is red with black spots!", hint: "Look for the small insect on the leaf." },
  { scene: 'forest', question: "What color are the tree trunks?", targets: ['Brown', 'Green', 'Gray', 'White', 'Black', 'Yellow'], correct: 'Brown', explanation: "Correct! Tree trunks are brown!", hint: "Look at the tall trees." },
  
  // Ocean Scene
  { scene: 'ocean', question: "What color is the ocean water?", targets: ['Blue', 'Green', 'Red', 'Yellow', 'Brown'], correct: 'Blue', explanation: "Amazing! The ocean is blue!", hint: "Look at the color below the surface of the water" },
  { scene: 'ocean', question: "What color is the sun in the sky?", targets: ['Yellow', 'Blue', 'Red', 'Green', 'Orange'], correct: 'Yellow', explanation: "Wonderful! The sun is yellow!", hint: "Look up above the water." },
  { scene: 'ocean', question: "What can the octopus do to its color?", targets: ['Change', 'Glow', 'Flash', 'Sparkle', 'Darken'], correct: 'Change', explanation: "Brilliant! The octopus can change its color!", hint: "The octopus has a special ability to hide." },
  { scene: 'ocean', question: "What color is the dolphin?", targets: ['Gray', 'Blue', 'White', 'Black','Green'], correct: 'Gray', explanation: "Perfect! The dolphin is gray!", hint: "Look for the friendly swimming mammal." },
  { scene: 'ocean', question: "What color are the tropical fish?", targets: ['Colorful', 'Gray', 'Brown', 'White', 'Green'], correct: 'Colorful', explanation: "Yes! Tropical fish are very colorful!", hint: "Look at the small fish swimming around." },
  
  // City Scene
  { scene: 'city', question: "What color is the STOP sign?", targets: ['Red', 'Green', 'Blue', 'Orange', 'White'], correct: 'Red', explanation: "Excellent! STOP signs are red!", hint: "Full Stop" },
  { scene: 'city', question: "What color means GO on a traffic light?", targets: ['Green', 'Black', 'Blue', 'Orange', 'White'], correct: 'Green', explanation: "Perfect! Green means GO!", hint: "Think about traffic lights." },
  { scene: 'city', question: "What color is the cat on the sidewalk?", targets: ['Orange', 'White', 'Gray', 'Brown', 'Blue'], correct: 'Orange', explanation: "Wonderful! The cat is orange!", hint: "Look for the furry friend on the sidewalk." },
  { scene: 'city', question: "What color is the school bus?", targets: ['Yellow', 'Red', 'Blue', 'Orange', 'White'], correct: 'Yellow', explanation: "Great! School buses are yellow!", hint: "Look for the big vehicle." }
];

const sceneBackgrounds = {
  forest: '../../../../images/forest-scene_compressed.jpg',
  ocean: '../../../../images/ocean-scene_compressed.jpg',
  city: '../../../../images/city-scene_compressed.jpg'
};

const targetSprites = {
  forest: '../../../../images/butterfly.png',
  ocean: '../../../../images/fish_final.png',
  city: '../../../../images/balloon_compressed.jpg'
};

// Game State
// Game State
let currentQuestionIndex = 0;
let isPlaying = false;
let targets = [];
let particles = [];
let backgroundImage = null;
let targetImage = null;
let animationId = null;

// Canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Initialize
window.addEventListener('load', () => {
  simulateLoading();
  setupEventListeners();
});

function simulateLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  const progressFill = document.getElementById('progress-fill');
  const loadingPercent = document.getElementById('loading-percent');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.getElementById('cover-screen').classList.remove('hidden');
      }, 500);
    }
    progressFill.style.width = progress + '%';
    loadingPercent.textContent = Math.floor(progress) + '%';
  }, 200);
}

function setupEventListeners() {
  document.getElementById('play-button').addEventListener('click', startGame);
  document.getElementById('help-button').addEventListener('click', showInstructions);
  document.getElementById('back-btn').addEventListener('click', backToCover);
  document.getElementById('hint-btn').addEventListener('click', showHint);
  document.getElementById('stop-btn').addEventListener('click', stopAudio);
  // document.getElementById('start-round-btn').addEventListener('click', startRound);
  document.getElementById('close-instructions').addEventListener('click', closeInstructions);
  document.getElementById('continue-btn').addEventListener('click', continueGame);

  // Replay & Home now properly reset completion screen
  document.getElementById('replay-button').addEventListener('click', () => {
    currentQuestionIndex = 0;
    document.getElementById('completion-screen').classList.add('hidden');
    startGame();
  });

  document.getElementById('home-button').addEventListener('click', () => {
    document.getElementById('completion-screen').classList.add('hidden');
    backToCover();
  });

  canvas.addEventListener('click', handleCanvasClick);

  // 🔊 AUDIO FEATURE — Add hover & touch listening
  canvas.addEventListener('mousemove', handleHover);
  canvas.addEventListener('touchstart', handleTouch);

  window.addEventListener('resize', resizeCanvas);
}

function startGame() {
  stopAudio();
  document.getElementById('completion-screen').classList.add('hidden');
  document.getElementById('cover-screen').classList.add('hidden');
  document.getElementById('game-container').classList.remove('hidden');
  resizeCanvas();
  currentQuestionIndex = 0;
  loadQuestion();
}

function showInstructions() {
  document.getElementById('instructions-modal').classList.add('show');
}

function closeInstructions() {
  document.getElementById('instructions-modal').classList.remove('show');
}

function backToCover() {
  stopAudio();
  if (animationId) cancelAnimationFrame(animationId);
  isPlaying = false;
  document.getElementById('game-container').classList.add('hidden');
  document.getElementById('cover-screen').classList.remove('hidden');
}

function loadQuestion() {
  if (currentQuestionIndex >= gameQuestions.length) {
    showCompletion();
    return;
  }

  const question = gameQuestions[currentQuestionIndex];
  document.getElementById('question-text').textContent = question.question;

  backgroundImage = new Image();
  backgroundImage.src = sceneBackgrounds[question.scene];
  backgroundImage.onload = () => { drawScene(); };

  targetImage = new Image();
  targetImage.src = targetSprites[question.scene];

  startRound();
}

function resizeCanvas() {
  const container = canvas.parentElement;
  const rect = container.getBoundingClientRect();
  const aspectRatio = 16 / 10;

  let width = rect.width - 40;
  let height = width / aspectRatio;

  if (height > rect.height - 40) {
    height = rect.height - 40;
    width = height * aspectRatio;
  }

  canvas.width = width;
  canvas.height = height;

  if (backgroundImage && backgroundImage.complete) {
    drawScene();
  }
}

function startRound() {
  // document.getElementById('start-round-btn').classList.add('hidden');
  isPlaying = true;
  createTargets();
  gameLoop();
}

function createTargets() {
  targets = [];
  const question = gameQuestions[currentQuestionIndex];

  question.targets.forEach((text, index) => {
    const target = {
      x: Math.random() * (canvas.width - 100),
      y: Math.random() * (canvas.height - 80),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      text: text,
      width: 120,
      height: 80
    };

    // 🔊 AUDIO FEATURE — add per-target reader
    target.read = () => readText(text);

    targets.push(target);
  });
}

function gameLoop() {
  if (!isPlaying) return;

  updateTargets();
  drawScene();
  drawTargets();
  drawParticles();

  animationId = requestAnimationFrame(gameLoop);
}

function updateTargets() {
  targets.forEach(target => {
    target.x += target.vx;
    target.y += target.vy;

    if (target.x <= 0 || target.x >= canvas.width - target.width) target.vx *= -1;
    if (target.y <= 0 || target.y >= canvas.height - target.height) target.vy *= -1;
  });
}

function drawScene() {
  if (backgroundImage && backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function drawTargets() {
  targets.forEach(target => {
    if (targetImage && targetImage.complete) {
      ctx.drawImage(targetImage, target.x, target.y, 60, 60);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(target.x, target.y + 65, target.width, 35);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(target.x, target.y + 65, target.width, 35);

    ctx.fillStyle = '#333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(target.text, target.x + target.width / 2, target.y + 82);
  });
}

function drawParticles() {
  particles.forEach((particle, index) => {
    particle.life--;
    particle.y -= particle.vy;
    particle.x += particle.vx;

    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.life / 60;
    ctx.fillRect(particle.x, particle.y, 5, 5);

    if (particle.life <= 0) {
      particles.splice(index, 1);
    }
  });
  ctx.globalAlpha = 1;
}

function handleCanvasClick(e) {
  if (!isPlaying) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const question = gameQuestions[currentQuestionIndex];

  for (let i = targets.length - 1; i >= 0; i--) {
    const target = targets[i];
    if (x >= target.x && x <= target.x + target.width &&
        y >= target.y && y <= target.y + 100) {

      if (target.text === question.correct) {
        createParticles(x, y, '#4CAF50');
        showExplanation(question.explanation);
      } else {
        createParticles(x, y, '#f44336');
      }
      break;
    }
  }
}

// 🔊 AUDIO FEATURE — Hover on desktop
function handleHover(e) {
  if (!isPlaying) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  targets.forEach(target => {
    if (x >= target.x && x <= target.x + target.width &&
        y >= target.y && y <= target.y + 100) {
      target.read();
    }
  });
}

// 🔊 AUDIO FEATURE — Touch on tablet
function handleTouch(e) {
  if (!isPlaying) return;

  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  targets.forEach(target => {
    if (x >= target.x && x <= target.x + target.width &&
        y >= target.y && y <= target.y + 100) {
      target.read();
    }
  });
}

function createParticles(x, y, color) {
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 5,
      vy: Math.random() * 3 + 1,
      life: 60,
      color: color
    });
  }
}

function showExplanation(text) {
  isPlaying = false;
  document.getElementById('explanation-text').textContent = text;
  document.getElementById('explanation-modal').classList.add('show');
}

function continueGame() {
  document.getElementById('explanation-modal').classList.remove('show');
  currentQuestionIndex++;
  loadQuestion();
}

function showCompletion() {
  document.getElementById('game-container').classList.add('hidden');
  document.getElementById('completion-screen').classList.remove('hidden');
}

function showHint() {
  const question = gameQuestions[currentQuestionIndex];
  alert(question.hint);
}

function readQuestion() {
  const question = gameQuestions[currentQuestionIndex];
  readText(question.question);
}

function stopAudio() {
  speechSynthesis.cancel();
}

// 🔊 AUDIO FEATURE — Generic reader
function readText(text) {
  stopAudio();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}
