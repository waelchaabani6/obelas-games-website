

// ======== PRELOAD ASSETS ========
const imagePaths = [
  // 🎬 Cover and UI
  '../../../../images/game_cover_title.png',
  '../../../../images/learning_buddy.webp',
  '../../../../images/levelup.png',

  // Zone 1
  '../../../../images/G2/U2/G2U2Scene1Q1.png',  
  '../../../../images/G2/U2/G2U2Scene1Q2.webp', 
  '../../../../images/G2/U2/G2U2Scene1Q3.png',  
  '../../../../images/G2/U2/G2U2Scene1Q4.webp',  
  '../../../../images/G2/U2/Reflection_Question.webp', 

  // Zone 2
  '../../../../images/G2/U2/G2U2Scene1Q5.webp',  
  '../../../../images/G2/U2/G2U2Scene1Q6.webp', 
  '../../../../images/G2/U2/G2U2Scene1Q7.webp',  
  '../../../../images/G2/U2/Reflection2_Question.webp', 

  // Zone 3
  '../../../../images/G2/U2/G2U2Scene1Q8.webp',  
  '../../../../images/G2/U2/G2U2Scene1Q9.png',  
  '../../../../images/G2/U2/G2U2Scene1Q10.webp',
  '../../../../images/G2/U2/Reflection3_Question.webp', 

  // Zone 4
  '../../../../images/G2/U2/G2U2Scene1Q11.png', 
  '../../../../images/G2/U2/G2U2Scene1Q12.png',  
  '../../../../images/G2/U2/G2U2Scene1Q13.png',  
  '../../../../images/G2/U2/Reflection4_Question.webp', 

  // Zone 5
  '../../../../images/G2/U2/G2U2Scene1Q18.webp', 
  '../../../../images/G2/U2/G2U2Scene1Q19.png', 
  '../../../../images/G2/U2/G2U2Scene1Q20.webp', 
  '../../../../images/G2/U2/Reflection5_Question.png', 
];


const audioPaths = [
  // Global
    '../../../../audio/G2/U2/G2U2covergame.mp3',
  '../../../../audio/kids-game-gaming-background-music-295075.mp3',
  '../../../../audio/G2/U2/G2U2Howtoplay.mp3',
 
];

// ======== Optimized Preloader ========
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');
// const coverScreen = document.getElementById('cover-screen');

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

  // preload images fully
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

  // preload audio metadata only (fast)
  audioPaths.forEach(src => {
    const audio = new Audio();
    promises.push(
      new Promise(resolve => {
        audio.preload = 'metadata';
        audio.onloadedmetadata = resolve; // faster than oncanplaythrough
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

    // 🔊 Play welcome message like K1
    speak("G2U2covergame.mp3");
  }, 400);
});

}

window.addEventListener('load', preloadAssets);


// Game State
let currentSceneIndex = 0;
let selectedChoices = [];
let droppedWords = [];
let usedWords = [];
let sortedItems = [];
let showFeedback = false;
let isCorrect = false;
let canProceed = false;
let musicPlaying = false;
let draggedWord = null;

// DOM Elements
const coverScreen = document.getElementById('cover-screen');
const gameContainer = document.getElementById('game-container');
const completionScreen = document.getElementById('completion-screen');
const instructionsModal = document.getElementById('instructions-modal');
const sceneContainer = document.getElementById('scene-container');
const questionText = document.getElementById('question-text');
const progressDisplay = document.getElementById('progress-display');
const musicControl = document.getElementById('music-control');
const explanationModal = document.getElementById('explanation-modal');

// Audio Elements
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const celebrationSound = document.getElementById('celebration-sound');

// Applause Element
let applauseEl = null;
let applauseTimer = null;

function ensureApplause() {
  if (!applauseEl) {
    applauseEl = new Audio('../../../../audio/applause.mp3');
    applauseEl.volume = 0.5;
  }
  return applauseEl;
}

function playApplause(maxMs = 1500) {
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


// Event Listeners
document.getElementById('play-button').addEventListener('click', startGame);
document.getElementById('help-button').addEventListener('click', showInstructions);
document.getElementById('close-instructions').addEventListener('click', closeInstructions);
document.getElementById('back-button').addEventListener('click', backToHome);
document.getElementById('hint-button').addEventListener('click', playHint);
document.getElementById('speak-button').addEventListener('click', playQuestion);
document.getElementById('stop-button').addEventListener('click', stopSpeech);
document.getElementById('replay-button').addEventListener('click', startGame);
document.getElementById('home-button').addEventListener('click', backToHome);
// musicControl.addEventListener('click', toggleMusic);

// ======== GLOBAL BACKGROUND MUSIC ========
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicMuted = false;
// ======== MUSIC FADING UTILITIES ========
let fadeInterval = null;

function fadeMusic(targetVolume, duration = 500) {
  if (fadeInterval) clearInterval(fadeInterval);

  const startVolume = backgroundMusic.volume;
  const steps = 20;
  const stepTime = duration / steps;
  let currentStep = 0;

  fadeInterval = setInterval(() => {
    currentStep++;
    const newVolume =
      startVolume + (targetVolume - startVolume) * (currentStep / steps);
    backgroundMusic.volume = Math.max(0, Math.min(1, newVolume));
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      fadeInterval = null;
    }
  }, stepTime);
}

// Try autoplay
// ======== AUTOPLAY BACKGROUND MUSIC ON PAGE LOAD ========
window.addEventListener('load', () => {
    const audio = document.getElementById('background-music');
    if (!audio) return;

    audio.volume = 0.3; // gentle volume
    const playPromise = audio.play();

    // Handle autoplay restrictions gracefully
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Autoplay blocked — wait for user interaction
            console.log("Autoplay blocked. Waiting for user interaction...");
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

// When switching screens, don't restart the music
function startGame() {
  // 🔇 STOP ALL AUDIO IMMEDIATELY WHEN GAME STARTS
  stopSpeech(); // stop currentSpeech (from speak())
  document.querySelectorAll('audio').forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
  stopApplause(); // stop applause if playing

  coverScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  completionScreen.classList.add('hidden');

  currentSceneIndex = 0;
  resetSceneState();
  renderScene();

  // Restore background music ONLY if not muted
  if (!isMusicMuted && backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {});
  }
}

function showCompletionScreen() {
  gameContainer.classList.add('hidden');
  completionScreen.classList.remove('hidden');

  // Keep background music state consistent
  if (!isMusicMuted && backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {});
  }
}

function showInstructions() {
  instructionsModal.classList.add('show');
  speak('G2U2Howtoplay.mp3');
}

function closeInstructions() {
  stopSpeech();

  // 🔥 HARD STOP for all audio nodes
  document.querySelectorAll('audio').forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  instructionsModal.classList.remove('show');
}

function replayInstructions() {
speak('G2U2HowToPlay.mp3');
}
function backToHome() {
  gameContainer.classList.add('hidden');
  completionScreen.classList.add('hidden');
  coverScreen.classList.remove('hidden');
  currentSceneIndex = 0;
  resetSceneState();
}

function resetSceneState() {
  selectedChoices = [];
  droppedWords = [];
  usedWords = [];
  sortedItems = [];
  showFeedback = false;
  isCorrect = false;
  canProceed = false;
  draggedWord = null;
}

// Explanation Modal
function showExplanation(title, explanation, callback) {
    const modal = document.getElementById("explanation-modal");
    const textEl = document.getElementById("explanation-text");
  const continueBtn = document.getElementById('continue-button');
    // Combine the title + explanation into one block
    textEl.innerHTML = `${explanation}`;

    modal.classList.add("show");

  const newBtn = continueBtn.cloneNode(true);
  continueBtn.parentNode.replaceChild(newBtn, continueBtn);

  document.getElementById('continue-button').addEventListener('click', () => {
    modal.classList.remove('show');
    if (callback) callback();
      stopSpeech();
  });
}


// ========== LOCAL AUDIO FUNCTIONS ==========
function speak(audioFileName) {
  stopSpeech();
  if (!audioFileName) return;

  // Fade down background music before speech
  if (!isMusicMuted && !backgroundMusic.paused) fadeMusic(0.1, 400);

  const audioPath = `../../../../audio/G2/U2/${audioFileName}`;
  const audio = new Audio(audioPath);
  // audio.volume = 1.0;
  audio.play().catch((err) => console.warn('Audio playback failed:', err));
  window.currentSpeech = audio;

  // When speech finishes, fade music back up
  audio.addEventListener('ended', () => {
    if (!isMusicMuted) fadeMusic(0.3, 800);
  });
}


function stopSpeech() {
  if (window.currentSpeech) {
    window.currentSpeech.pause();
    window.currentSpeech.currentTime = 0;
  }
}

function playHint() {
  const scene = gameScenes[currentSceneIndex];
  if (scene.hintAudio) speak(scene.hintAudio);
}

function playQuestion() {
  const scene = gameScenes[currentSceneIndex];
  if (scene.questionAudio) speak(scene.questionAudio);
}

// Scene Rendering
function renderScene() {
  const scene = gameScenes[currentSceneIndex];
  questionText.textContent = scene.question;
  sceneContainer.innerHTML = '';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'scene-image-container';
  const img = document.createElement('img');
  img.src = scene.image;
  img.alt = scene.title;
  img.className = 'scene-image';
  imageContainer.appendChild(img);
  sceneContainer.appendChild(imageContainer);

  const contentContainer = document.createElement('div');
  contentContainer.className = 'scene-content';
  sceneContainer.appendChild(contentContainer);

  if (scene.type === 'choice') {
    renderChoiceScene(scene, contentContainer);
  }
}

function renderChoiceScene(scene, contentContainer) {
  const storyText = document.createElement('div');
  storyText.className = 'scene-text';
  const textSpan = document.createElement('span');
  textSpan.textContent = scene.storyText;
  storyText.appendChild(textSpan);

  const speakerBtn = document.createElement('button');
  speakerBtn.className = 'audio-speaker-btn';
  speakerBtn.innerHTML = '🔊';
  speakerBtn.title = 'Play story';
  speakerBtn.addEventListener('click', () => {
    if (scene.storyAudio) speak(scene.storyAudio);
  });
  storyText.appendChild(speakerBtn);

  contentContainer.appendChild(storyText);

  const choicesContainer = document.createElement('div');
  choicesContainer.className = 'choice-buttons';

  scene.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice-button';

    const choiceContent = document.createElement('span');
    choiceContent.innerHTML = `${choice.emoji ? `<span style="margin-right: 0.5rem">${choice.emoji}</span>` : ''}${choice.text}`;
    button.appendChild(choiceContent);

    const speakerBtn = document.createElement('button');
    speakerBtn.className = 'audio-speaker-btn';
    speakerBtn.innerHTML = '🔊';
    speakerBtn.title = 'Play choice';
    speakerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (choice.audio) speak(choice.audio);
    });
    button.appendChild(speakerBtn);

    button.addEventListener('click', () => handleChoiceClick(index, choice, button));
    choicesContainer.appendChild(button);
  });

  contentContainer.appendChild(choicesContainer);
}

function handleChoiceClick(index, choice, button) {
  if (showFeedback) return;
  showFeedback = true;
if (choice.correct) {
    button.classList.add('correct');
    const scene = gameScenes[currentSceneIndex];

    // 🎉 New: Play applause
    playApplause();
    showFireworks(); // optional, but matches Unit 1 style

    if (scene.explanationAudio) speak(scene.explanationAudio);

    showExplanation('Great Job!', scene.explanation, () => {
      setTimeout(() => moveToNextScene(), 100);
    });
}
else {
    button.classList.add('incorrect');
    setTimeout(() => {
      button.classList.remove('incorrect');
      showFeedback = false;
    }, 1000);
  }
}

function moveToNextScene() {
  currentSceneIndex++;
  resetSceneState();

  if (currentSceneIndex < gameScenes.length) {
    renderScene();
  } else {
    showCompletion();
  }
}

function showCompletion() {
  gameContainer.classList.add('hidden');
  completionScreen.classList.remove('hidden');
 celebrationSound.play().catch(() => {});
playApplause();     // 🎉 Add applause
showFireworks();    // optional, but matches Unit 1

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
