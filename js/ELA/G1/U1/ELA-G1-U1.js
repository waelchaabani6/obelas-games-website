// Imagination World Game - Grade 1
// With Cover Screen and Fixed GIF Saving

// ======== LOADING SCREEN MANAGER ========
const loadingManager = {
  totalAssets: 0,
  loadedAssets: 0,
  loadingScreen: null,
  loadingBar: null,
  loadingText: null,
  coverScreen: null,
  
  init: function() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.loadingBar = document.getElementById('loading-bar');
    this.loadingText = document.getElementById('loading-text');
    this.coverScreen = document.getElementById('cover-screen');
    
    // Hide cover screen initially
    this.coverScreen.style.display = 'none';
  },
  
  setTotalAssets: function(count) {
    this.totalAssets = count;
  },
  
  assetLoaded: function() {
    this.loadedAssets++;
    this.updateProgress();
  },
  
  updateProgress: function() {
    const percentage = Math.round((this.loadedAssets / this.totalAssets) * 100);
    this.loadingBar.style.width = percentage + '%';
    this.loadingText.textContent = `Loading assets: ${percentage}%`;
    
    if (this.loadedAssets >= this.totalAssets) {
      this.complete();
    }
  },
  
<<<<<<< HEAD
  complete: function() {
    setTimeout(() => {
      this.loadingScreen.style.opacity = '0';
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
        this.coverScreen.style.display = 'flex';
      }, 500);
    }, 500);
  }
=======
 complete: function() {
  setTimeout(() => {
    this.loadingScreen.style.opacity = '0';
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
      this.coverScreen.style.display = 'flex';

      // 🔊 Play welcome speech when cover screen shows
      stopSpeech();
      audioManager.play('welcome');

    }, 500);
  }, 500);
}

>>>>>>> 083307f40b179015ed9d3664af188e3328b335dd
};

// Game State
let currentStep = 0;
let selectedBackground = null;
let worldName = '';
let canvas = null;
let backgroundImage = null;
let animationFrameId = null;
let weatherParticles = [];
let weatherCanvas = null;
let weatherCtx = null;

// Audio Manager
const audioManager = {
  sounds: {},
  
  loadSound: function(key, path) {
    const audio = new Audio(path);
    audio.preload = 'auto';
    this.sounds[key] = audio;
  },
  
  play: function(key) {
  if (this.sounds[key]) {
    playSpeech(key);
  }
}

};
let currentSpeech = null;

function stopSpeech() {
  if (currentSpeech) {
    currentSpeech.pause();
    currentSpeech.currentTime = 0;
    currentSpeech = null;
  }
}

function playSpeech(key) {
  stopSpeech(); // stop any previously playing speech
  
  if (audioManager.sounds[key]) {
    currentSpeech = audioManager.sounds[key].cloneNode();
    currentSpeech.play().catch(() => {});
  }
}

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
window.addEventListener('load', () => {
  backgroundMusic.volume = 0;

  backgroundMusic.play().then(() => {
    musicToggle.textContent = '🔊';
    fadeMusic(0.3, 2000);   // fade in over 2 seconds
<<<<<<< HEAD
=======
    audioManager.loadSound('welcome', '../../../../audio/G1U1Welcome.mp3');
>>>>>>> 083307f40b179015ed9d3664af188e3328b335dd
  }).catch(() => {
    console.warn('Autoplay blocked — will start after user interaction.');
  });
});


// Toggle mute/unmute
musicToggle.addEventListener('click', () => {
if (isMusicMuted) {
  backgroundMusic.volume = 0;
  backgroundMusic.play().catch(() => {});
  fadeMusic(0.3, 1000); // fade in
  musicToggle.textContent = '🔊';
} else {
  backgroundMusic.pause();
  musicToggle.textContent = '🔇';
}

  isMusicMuted = !isMusicMuted;
});



// Game Data
const gameData = {
  backgrounds: [
    { id: 'backyard', name: 'Backyard', image: '../../../../images/backyard.png', audio: '../../../../audio/backyard.mp3' },
    { id: 'ocean', name: 'Ocean', image: '../../../../images/ocean.png', audio: '../../../../audio/ocean.mp3' },
    { id: 'snowy_hill', name: 'Snowy Hill', image: '../../../../images/snowy_hill.png', audio: '../../../../audio/snowy_hill.mp3' },
    { id: 'space', name: 'Space', image: '../../../../images/space.png', audio: '../../../../audio/space.mp3' },
    { id: 'city', name: 'City', image: '../../../../images/city.png', audio: '../../../../audio/city.mp3' }
  ],
  characters: [
    { id: 'child', name: 'Child', image: '../../../../images/happy_girl.png', audio: '../../../../audio/child.mp3' },
    { id: 'fox', name: 'Fox', image: '../../../../images/fox.png', audio: '../../../../audio/fox.mp3' },
<<<<<<< HEAD
    { id: 'cat', name: 'Cat', image: '../../../../images/cute_cat.png', audio: '../../../../audio/cat.mp3' },
=======
    { id: 'cat', name: 'Cat', image: '../../../../images/cute_cat.png', audio: '../../../../audio/catK2U1.mp3' },
>>>>>>> 083307f40b179015ed9d3664af188e3328b335dd
    { id: 'falcon', name: 'Falcon', image: '../../../../images/falcon.png', audio: '../../../../audio/falcon.mp3' },
    { id: 'tiger', name: 'Tiger', image: '../../../../images/tiger.png', audio: '../../../../audio/tiger.mp3' },
    { id: 'ladybug', name: 'Ladybug', image: '../../../../images/ladybug.png', audio: '../../../../audio/ladybug.mp3' },
    { id: 'lion', name: 'Lion', image: '../../../../images/lion.png', audio: '../../../../audio/lion.mp3' },
    { id: 'rabbit', name: 'Rabbit', image: '../../../../images/rabbit.png', audio: '../../../../audio/rabbit.mp3' }
  ],
  objects: [
    { id: 'ball', name: 'Ball', image: '../../../../images/ball.png', audio: '../../../../audio/ball.mp3' },
    { id: 'pail', name: 'Pail', image: '../../../../images/pail.png', audio: '../../../../audio/pail.mp3' },
    { id: 'tree', name: 'Tree', image: '../../../../images/tree.png', audio: '../../../../audio/tree.mp3' },
    { id: 'kite', name: 'Kite', image: '../../../../images/kite.png', audio: '../../../../audio/kite.mp3' },
    { id: 'butterfly', name: 'Butterfly', image: '../../../../images/butterfly.png', audio: '../../../../audio/butterfly.mp3' },
    { id: 'flower', name: 'Flower', image: '../../../../images/flower.png', audio: '../../../../audio/flower.mp3' },
    { id: 'cloud', name: 'Cloud', image: '../../../../images/cloud.png', audio: '../../../../audio/cloud.mp3' }
  ],
  weather: [
    { id: 'wind', name: 'Wind', image: '../../../../images/wind.png', audio: '../../../../audio/wind.mp3' },
    { id: 'tornado', name: 'Tornado', image: '../../../../images/tornado.png', audio: '../../../../audio/tornado.mp3' },
    { id: 'rain', name: 'Rain', image: '../../../../images/rain.png', animated: true, audio: '../../../../audio/rain.mp3' },
    { id: 'snow', name: 'Snow', image: '../../../../images/snow.png', animated: true, audio: '../../../../audio/snow.mp3' }
  ]
};

const steps = [
  { title: 'Tap a place where your story happens!', subtitle: 'Step 1 of 5', content: 'backgrounds',audio:'../../../../audio/step1.mp3' },
  { title: 'Tap to add character to your world!', subtitle: 'Step 2 of 5', content: 'characters',audio:'../../../../audio/step2.mp3' },
  { title: 'Add fun things your friends can use!', subtitle: 'Step 3 of 5', content: 'objects',audio:'../../../../audio/step3.mp3' },
  { title: "What's the weather in your world?", subtitle: 'Step 4 of 5', content: 'weather' ,audio:'../../../../audio/step4.mp3'},
  { title: 'Give your world a name!', subtitle: 'Step 5 of 5', content: 'input' ,audio:'../../../../audio/step5.mp3'}
];
steps.forEach(step => {
  if (step.audio) {
    audioManager.loadSound(step.title, step.audio);
  }
});
const stepAudioBtn = document.getElementById('step-audio-btn');
stepAudioBtn.addEventListener('click', () => {
  const current = steps[currentStep];
  stopSpeech();
  if (current.audio) {
    audioManager.play(current.title);
  }
});


// Weather particle class
class WeatherParticle {
  constructor(type, canvasWidth, canvasHeight) {
    this.type = type;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * -this.canvasHeight - 100;
    
    if (this.type === 'rain') {
      this.speed = 8 + Math.random() * 4;
      this.length = 15 + Math.random() * 10;
      this.width = 1 + Math.random();
      this.opacity = 0.3 + Math.random() * 0.4;
    } else if (this.type === 'snow') {
      this.speed = 1 + Math.random() * 2;
      this.size = 3 + Math.random() * 5;
      this.opacity = 0.6 + Math.random() * 0.4;
      this.drift = Math.random() * 2 - 1;
    }
  }
  
  update() {
    this.y += this.speed;
    
    if (this.type === 'snow') {
      this.x += this.drift;
    }
    
    if (this.y > this.canvasHeight) {
      this.reset();
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    if (this.type === 'rain') {
      ctx.strokeStyle = '#4A90E2';
      ctx.lineWidth = this.width;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.stroke();
    } else if (this.type === 'snow') {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

// Cover Screen Event Handlers
document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play-button');
  const helpButton = document.getElementById('help-button');
  const closeInstructions = document.getElementById('close-instructions');
  const instructionsModal = document.getElementById('instructions-modal');
  const coverScreen = document.getElementById('cover-screen');
  
  // Initialize loading manager
  loadingManager.init();
  
  // Calculate total assets to load
  const totalImages = gameData.backgrounds.length + gameData.characters.length + 
                      gameData.objects.length + gameData.weather.length + 1;
  loadingManager.setTotalAssets(totalImages);
  
  // Preload all images
  const allItems = [
    ...gameData.backgrounds,
    ...gameData.characters,
    ...gameData.objects,
    ...gameData.weather
  ];
  
  allItems.forEach(item => {
    const img = new Image();
    img.onload = () => loadingManager.assetLoaded();
    img.onerror = () => loadingManager.assetLoaded();
    img.src = item.image;
  });
  
  // Preload cover image
  const coverImg = new Image();
  coverImg.onload = () => loadingManager.assetLoaded();
  coverImg.onerror = () => loadingManager.assetLoaded();
  coverImg.src = '../../../../images/IMAGINATION_WORLD_COVER.png';
  
  // Preload audio for "How to Play"
  audioManager.loadSound('howtoplay', '../../../../audio/HowToPlayG1U1.mp3');
  
  // Preload all game audio
  gameData.backgrounds.forEach(item => audioManager.loadSound(item.id, item.audio));
  gameData.characters.forEach(item => audioManager.loadSound(item.id, item.audio));
  gameData.objects.forEach(item => audioManager.loadSound(item.id, item.audio));
  gameData.weather.forEach(item => audioManager.loadSound(item.id, item.audio));
  
  // Play button - start game
playButton.addEventListener('click', () => {
  stopSpeech();
  startGame();
});

  
  // Help button - show instructions
 helpButton.addEventListener('click', () => {
  stopSpeech();
  audioManager.play('howtoplay');
  instructionsModal.classList.add('show');
});

  
  // Close instructions and start game
closeInstructions.addEventListener('click', () => {
    stopSpeech();
    instructionsModal.classList.remove('show');
    startGame();
});
});


// Initialize Game
function startGame() {
  stopSpeech();

  document.getElementById('cover-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.add('active');

  initCanvas();
  loadStep(0);

  // FADE IN MUSIC
  if (!isMusicMuted) {
    backgroundMusic.volume = 0;       // start silent
    backgroundMusic.play().catch(() => {});
    fadeMusic(0.3, 1500);             // fade to 0.3 over 1.5 seconds
  }
}

<<<<<<< HEAD
=======
function replayInstructions() {
  // Always play the How-To audio, not the welcome
  stopSpeech();
   audioManager.play('howtoplay');
}

>>>>>>> 083307f40b179015ed9d3664af188e3328b335dd

// Initialize Fabric.js Canvas
function initCanvas() {
  canvas = new fabric.Canvas('imagination-canvas', {
    width: 1000,
    height: 600,
    backgroundColor: '#f0f9ff',
    selection: true,
    preserveObjectStacking: true
  });
  
  // Create overlay canvas for weather animations
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  weatherCanvas = document.createElement('canvas');
  weatherCanvas.id = 'weather-canvas';
  weatherCanvas.width = 1000;
  weatherCanvas.height = 600;
  weatherCanvas.style.position = 'absolute';
  weatherCanvas.style.top = '0';
  weatherCanvas.style.left = '0';
  weatherCanvas.style.pointerEvents = 'none';
  weatherCanvas.style.zIndex = '10';
  
  // Position it over the fabric canvas
  const fabricCanvas = document.getElementById('imagination-canvas');
  fabricCanvas.parentElement.style.position = 'relative';
  fabricCanvas.parentElement.appendChild(weatherCanvas);
  
  weatherCtx = weatherCanvas.getContext('2d');
  
  // Handle delete key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length > 0) {
        activeObjects.forEach(obj => {
          if (obj !== backgroundImage) {
            canvas.remove(obj);
          }
        });
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }
  });
  
  // Start animation loop
  startAnimationLoop();
}

// Animation loop for weather effects
function startAnimationLoop() {
  function animate() {
    if (weatherParticles.length > 0 && weatherCtx) {
      // Clear the weather canvas
      weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
      
      // Update and draw particles
      weatherParticles.forEach(particle => {
        particle.update();
        particle.draw(weatherCtx);
      });
    }
    
    animationFrameId = requestAnimationFrame(animate);
  }
  
  animate();
}

// Load Step Content
function loadStep(stepIndex) {
  currentStep = stepIndex;
  const step = steps[stepIndex];
  stopSpeech();
  // Play audio automatically when entering the step
  if (step.audio) {
    audioManager.play(step.title);
  }
  
  // Update step indicator
  document.getElementById('step-title').textContent = step.title;
  document.getElementById('step-number').textContent = step.subtitle;
  
  // Update buttons
  document.getElementById('btn-back').style.display = stepIndex === 0 ? 'none' : 'block';
  
  // Load content based on step
  const sidebarContent = document.getElementById('sidebar-content');
  sidebarContent.innerHTML = '';
  
  if (step.content === 'backgrounds') {
    loadBackgrounds();
  } else if (step.content === 'characters') {
    loadImageGrid(gameData.characters, addCharacterToCanvas);
  } else if (step.content === 'objects') {
    loadImageGrid(gameData.objects, addObjectToCanvas);
  } else if (step.content === 'weather') {
    loadImageGrid(gameData.weather, addWeatherToCanvas);
  } else if (step.content === 'input') {
    loadNameInput();
  }
}

// Load Backgrounds
function loadBackgrounds() {
  const grid = document.createElement('div');
  grid.className = 'image-grid';
  
  gameData.backgrounds.forEach(bg => {
    const item = document.createElement('div');
    item.className = 'image-item';
    if (selectedBackground === bg.id) {
      item.classList.add('selected');
    }
    
    item.innerHTML = `
      <img src="${bg.image}" alt="${bg.name}">
      <div class="image-item-label">${bg.name}</div>
    `;
    
    item.onclick = () => selectBackground(bg);
    grid.appendChild(item);
  });
  
  document.getElementById('sidebar-content').appendChild(grid);
}

// Select Background
function selectBackground(bg) {
  selectedBackground = bg.id;
  
  // Play audio for this background
  if (bg.audio) {
      stopSpeech();
    audioManager.play(bg.id);
  }
  
  // Update UI
  document.querySelectorAll('.image-item').forEach(item => {
    item.classList.remove('selected');
  });
  event.target.closest('.image-item').classList.add('selected');
  
  // Set canvas background
  fabric.Image.fromURL(bg.image, (img) => {
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);
    
    img.scale(scale);
    img.set({
      left: canvas.width / 2,
      top: canvas.height / 2,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
      hasControls: false,
      hasBorders: false,
      lockMovementX: true,
      lockMovementY: true
    });
    
    if (backgroundImage) {
      canvas.remove(backgroundImage);
    }
    
    backgroundImage = img;
    canvas.add(img);
    canvas.sendToBack(img);
    canvas.renderAll();
  }, { crossOrigin: 'anonymous' });
}

// Load Image Grid
function loadImageGrid(items, clickHandler) {
  const grid = document.createElement('div');
  grid.className = 'image-grid';
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'image-item';
    
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="image-item-label">${item.name}</div>
    `;
    
    div.onclick = () => {
      // Play audio for this item
      if (item.audio) {
      stopSpeech();
audioManager.play(item.id);

      }
      clickHandler(item);
    };
    grid.appendChild(div);
  });
  
  document.getElementById('sidebar-content').appendChild(grid);
}

// Add Character to Canvas
function addCharacterToCanvas(item) {
  addImageToCanvas(item.image, 150, 'character');
}

// Add Object to Canvas
function addObjectToCanvas(item) {
  addImageToCanvas(item.image, 120, 'object');
}

// Add Weather to Canvas
function addWeatherToCanvas(item) {
  if (item.animated) {
    // For animated weather (rain, snow)
    addAnimatedWeather(item);
  } else {
    addImageToCanvas(item.image, 180, 'weather');
  }
}

// Add animated weather effects
function addAnimatedWeather(item) {
  // Clear existing weather particles
  weatherParticles = [];
  
  if (item.id === 'rain') {
    // Create rain particles
    for (let i = 0; i < 100; i++) {
      weatherParticles.push(new WeatherParticle('rain', canvas.width, canvas.height));
    }
    playSound('pop');
  } else if (item.id === 'snow') {
    // Create snow particles
    for (let i = 0; i < 80; i++) {
      weatherParticles.push(new WeatherParticle('snow', canvas.width, canvas.height));
    }
    playSound('pop');
  }
}

// Generic function to add image to canvas
function addImageToCanvas(imageUrl, maxSize, type) {
  fabric.Image.fromURL(imageUrl, (img) => {
    if (!img) return;
    
    // Scale image
    const scale = Math.min(maxSize / img.width, maxSize / img.height);
    img.scale(scale);
    
    // Smart positioning
    let left, top;
    if (type === 'character') {
      left = canvas.width / 2 + (Math.random() - 0.5) * 200;
      top = canvas.height - 150;
    } else if (type === 'weather') {
      left = canvas.width / 2 + (Math.random() - 0.5) * 300;
      top = 100;
    } else {
      left = 200 + Math.random() * (canvas.width - 400);
      top = 150 + Math.random() * (canvas.height - 300);
    }
    
    img.set({
      left: left,
      top: top,
      selectable: true,
      hasControls: true,
      hasBorders: true,
      cornerSize: 12,
      transparentCorners: false,
      cornerColor: '#4CAF50',
      cornerStrokeColor: '#fff',
      borderColor: '#4CAF50',
      borderScaleFactor: 2
    });
    
    // Add shadow
    img.set({
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 3,
        offsetY: 3
      })
    });
    
    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();
    
    // Play sound effect
    playSound('pop');
  }, { crossOrigin: 'anonymous' });
}

// Load Name Input
function loadNameInput() {
  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  inputGroup.innerHTML = `
    <label class="input-label">Give your world a name!</label>
    <input type="text" class="input-field" id="world-name-input" 
           placeholder="My Amazing World" maxlength="30">
  `;
  
  document.getElementById('sidebar-content').appendChild(inputGroup);
  
  // Focus input
  setTimeout(() => {
    document.getElementById('world-name-input').focus();
  }, 100);
}

// Navigation
function nextStep() {
  if (currentStep === 0 && !selectedBackground) {
    alert('Please pick a place first!');
    return;
  }
  
  if (currentStep === 4) {
    // Get world name
    const input = document.getElementById('world-name-input');
    worldName = input ? input.value.trim() : '';
    if (!worldName) {
      worldName = 'My Imagination World';
    }
    
    // Go to celebrate screen
    showCelebrate();
  } else {
    loadStep(currentStep + 1);
  }
}

function previousStep() {
  if (currentStep > 0) {
    loadStep(currentStep - 1);
  }
}

// Show Celebrate Screen
function showCelebrate() {
  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('celebrate-screen').classList.add('active');
  
  document.getElementById('world-name-display').textContent = worldName;
  
  // Create confetti
  createConfetti();
  
  // Play celebration sound
  playSound('celebrate');
}

// Create Confetti Animation
function createConfetti() {
  const confettiContainer = document.getElementById('confetti');
  confettiContainer.innerHTML = '';
  
  const colors = ['#4CAF50', '#FFB300', '#2563eb', '#EF4444', '#8B5CF6'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.animation = `fall ${2 + Math.random() * 3}s linear infinite`;
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confettiContainer.appendChild(confetti);
  }
  
  // Add CSS animation
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.innerHTML = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Save World - with proper GIF support using gif.js library
function saveWorld() {
  const btn = event.target;
  const originalText = btn.innerHTML;
  
  try {
    // Create a temporary canvas to combine fabric canvas and weather overlay
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // If there are weather animations, create animated GIF
    if (weatherParticles.length > 0) {
      btn.innerHTML = '⏳ Creating GIF...';
      btn.disabled = true;
      
      // Load gif.js library if not already loaded
      if (typeof GIF === 'undefined') {
        const script = document.createElement('script');
        script.src = '../../../../js/ELA/G1/U1/gif.js';
        script.onload = () => {
          captureFramesForGIF(tempCanvas, tempCtx, btn, originalText);
        };
        script.onerror = () => {
          console.error('Failed to load gif.js');
          // Fallback to PNG
          saveCanvasAsPNG(tempCanvas, tempCtx);
          btn.innerHTML = originalText;
          btn.disabled = false;
          playSound('success');
        };
        document.head.appendChild(script);
      } else {
        captureFramesForGIF(tempCanvas, tempCtx, btn, originalText);
      }
    } else {
      // No animation, save as PNG
      saveCanvasAsPNG(tempCanvas, tempCtx);
      playSound('success');
    }
  } catch (err) {
    console.error('Save Error:', err);
    alert('Error saving. Please try again.');
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Capture frames and create GIF
async function captureFramesForGIF(tempCanvas, tempCtx, btn, originalText) {
  try {
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: tempCanvas.width,
      height: tempCanvas.height,
      workerScript: '../../../../js/ELA/G1/U1/gif.worker.js'
    });
    
    const frameCount = 20;
    const delay = 100;
    
    // Capture frames
    for (let i = 0; i < frameCount; i++) {
      // Clear temp canvas
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw fabric canvas
      const fabricCanvasElement = canvas.lowerCanvasEl;
      tempCtx.drawImage(fabricCanvasElement, 0, 0);
      
      // Update and draw weather particles
      weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
      weatherParticles.forEach(particle => {
        particle.update();
        particle.draw(weatherCtx);
      });
      
      // Draw weather overlay
      tempCtx.drawImage(weatherCanvas, 0, 0);
      
      // Add frame to GIF
      gif.addFrame(tempCanvas, { copy: true, delay: delay });
      
      // Wait a bit
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Render GIF
    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${worldName.replace(/\s+/g, '_')}.gif`;
      link.href = url;
      link.click();
      
      btn.innerHTML = originalText;
      btn.disabled = false;
      playSound('success');
    });
    
    gif.on('error', (err) => {
      console.error('GIF Error:', err);
      // Fallback to PNG
      saveCanvasAsPNG(tempCanvas, tempCtx);
      btn.innerHTML = originalText;
      btn.disabled = false;
      playSound('success');
    });
    
    gif.render();
    
  } catch (err) {
    console.error('GIF Creation Error:', err);
    // Fallback to PNG
    saveCanvasAsPNG(tempCanvas, tempCtx);
    btn.innerHTML = originalText;
    btn.disabled = false;
    playSound('success');
  }
}

// Save canvas as PNG
function saveCanvasAsPNG(tempCanvas, tempCtx) {
  // Draw the fabric canvas
  const fabricCanvasElement = canvas.lowerCanvasEl;
  tempCtx.drawImage(fabricCanvasElement, 0, 0);
  
  // Draw the weather overlay if it exists
  if (weatherParticles.length > 0 && weatherCanvas) {
    tempCtx.drawImage(weatherCanvas, 0, 0);
  }
  
  const dataURL = tempCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${worldName.replace(/\s+/g, '_')}.png`;
  link.href = dataURL;
  link.click();
}

// Play Again
function playAgain() {
  // Reset game state
  currentStep = 0;
  selectedBackground = null;
  worldName = '';
  weatherParticles = [];
  
  // Clear weather canvas
  if (weatherCtx) {
    weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
  }
  
  // Clear canvas
  canvas.clear();
  canvas.backgroundColor = '#f0f9ff';
  backgroundImage = null;
  
  // Go back to cover screen
  document.getElementById('celebrate-screen').classList.remove('active');
  document.getElementById('cover-screen').classList.remove('hidden');
}

// Return to Cover Screen
function returnToCover() {
 
    // Reset game state
    currentStep = 0;
    selectedBackground = null;
    worldName = '';
    weatherParticles = [];
    
    // Clear weather canvas
    if (weatherCtx) {
      weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
    }
    
    // Clear canvas
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#f0f9ff';
      backgroundImage = null;
    }
    
    // Go back to cover screen
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('celebrate-screen').classList.remove('active');
    document.getElementById('cover-screen').classList.remove('hidden');
  
}

// Help Overlay
function showHelp() {
  document.getElementById('help-overlay').style.display = 'block';
}

function hideHelp() {
  document.getElementById('help-overlay').style.display = 'none';
}

// Sound Effects (simple beep sounds using Web Audio API)
function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'pop') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'celebrate') {
      oscillator.frequency.value = 523.25; // C5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'success') {
      oscillator.frequency.value = 659.25; // E5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  } catch (e) {
    // Silent fail if audio not supported
    console.log('Audio not supported');
  }
}
