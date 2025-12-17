// Controls how fast fade happens (smaller = slower)
const fadeStep = 0.05;

function fadeOutBGM() {
    if (!bgmAudio) return;
    const fade = setInterval(() => {
        if (bgmAudio.volume > fadeStep) {
            bgmAudio.volume -= fadeStep;
        } else {
            bgmAudio.volume = 0.3;
            clearInterval(fade);
        }
    }, 50);
}

function fadeInBGM() {
    if (!bgmAudio) return;
    const fade = setInterval(() => {
        if (bgmAudio.volume < 1 - fadeStep) {
            bgmAudio.volume += fadeStep;
        } else {
            bgmAudio.volume = 1;
            clearInterval(fade);
        }
    }, 50);
}

/*************************************************
 🔊 UNIVERSAL AUDIO MANAGER (supports all custom audio)
**************************************************/
const audioManager = {
    sounds: {},

    load: function (key, src) {
        const audio = new Audio(src);
        audio.preload = "auto";
        this.sounds[key] = audio;
    },

    play: function (key) {
        stopAudio();
        if (this.sounds[key]) {
            const sound = this.sounds[key].cloneNode();
            sound.play().catch(() => {});
        }
    }
};

/*************************************************
 🔊 GLOBAL AUDIO (ONLY THESE TWO!)
**************************************************/
audioManager.load("welcome", "../../../../audio/G1U2Welcome.mp3");
audioManager.load("howtoplay", "../../../../audio/G1U2HowToPlay.mp3");
audioManager.load("bgm", "../../../../audio/kids-game-gaming-background-music-295075.mp3");

window.addEventListener("load", () => {
    startBackgroundMusic();
    simulateLoading();
    setupEventListeners();
});
let bgmAudio = null;
let isMuted = false;

function startBackgroundMusic() {
    bgmAudio = audioManager.sounds["bgm"].cloneNode();
    bgmAudio.loop = true;
    bgmAudio.volume = 1;
    bgmAudio.play().catch(() => {});
}
function toggleMusic() {
    if (!bgmAudio) return;

    if (isMuted) {
        bgmAudio.muted = false;
        isMuted = false;
        document.getElementById("music-toggle").textContent = "🔊";
    } else {
        bgmAudio.muted = true;
        isMuted = true;
        document.getElementById("music-toggle").textContent = "🔇";
    }
}


/*************************************************
 🔊 SPEECH + AUDIO PRIORITY
**************************************************/
let currentSpeech = null;
let speed = 0.5 + Math.random() * 0.4; // speed between 0.5 and 0.9
let angle = Math.random() * Math.PI * 2;
function stopAudio() {
    speechSynthesis.cancel();

    if (currentSpeech) {
        currentSpeech.pause();
        currentSpeech.currentTime = 0;
        currentSpeech = null;
    }

    fadeInBGM(); // ⬅ restore background music
}



function playLocal(key) {
    stopAudio(); // stops speech + fades IN bgm, but we override with fadeOut

    // fade background "under" this audio
    fadeOutBGM();

    if (audioManager.sounds[key]) {
        currentSpeech = audioManager.sounds[key].cloneNode();
        currentSpeech.play().catch(() => {});

        // when audio ends → fade back in
        currentSpeech.onended = () => {
            fadeInBGM();
        };
    }
}

function speak(text) {
    stopAudio(); 
    fadeOutBGM();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;

    utter.onend = () => fadeInBGM();

    speechSynthesis.speak(utter);
}



/*************************************************
 🧠 GAME QUESTIONS (each with its own audio)
**************************************************/
// Game Questions With Full Audio
const gameQuestions = [

/* -------------------- 🌲 FOREST (Q1–Q4) -------------------- */

{
  scene: 'forest',
  question: "What color is the frog sitting on the rock?",
  questionAudio: "G1U2Q1.mp3",
  hintAudio: "G1U2Q1H.mp3",
  explanationAudio: "G1U2Q1E.mp3",

  targets: ['Green', 'Blue', 'Red', 'Yellow', 'Brown'],
  optionsAudio: {
    "Green": "Green.mp3",
    "Blue": "Blue.mp3",
    "Red": "Red.mp3",
    "Yellow": "Yellow.mp3",
    "Brown": "Brown.mp3"
  },

  correct: 'Green',
  explanation: "Excellent! The frog is Green!",
  hint: "Look near the pond for the frog."
},

{
  scene: 'forest',
  question: "What is special about the lezard's color?",
  questionAudio: "G1U2Q2.mp3",
  hintAudio: "G1U2Q2H.mp3",
  explanationAudio: "G1U2Q2E.mp3",

  targets: ['Blend', 'Bright', 'Shine', 'Dark', 'Spotted'],
  optionsAudio: {
    "Blend": "Blend.mp3",
    "Bright": "Bright.mp3",
    "Shine": "Shine.mp3",
    "Dark": "Dark.mp3",
    "Spotted": "Spotted.mp3"
  },

  correct: 'Blend',
  explanation: "Perfect! The lezard uses camouflage to Blend in!",
  hint: "The lezard blends in with its surroundings."
},

{
  scene: 'forest',
  question: "What color is the ladybug?",
  questionAudio: "G1U2Q3.mp3",
  hintAudio: "G1U2Q3H.mp3",
  explanationAudio: "G1U2Q3E.mp3",

  targets: ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple'],
  optionsAudio: {
    "Red": "Red.mp3",
    "Green": "Green.mp3",
    "Blue": "Blue.mp3",
    "Yellow": "Yellow.mp3",
    "Orange": "Orange.mp3",
    "Purple": "Purple.mp3"
  },

  correct: 'Red',
  explanation: "Yes! The ladybug is Red with black spots!",
  hint: "Look for the small insect on the leaf."
},

{
  scene: 'forest',
  question: "What color are the tree trunks?",
  questionAudio: "G1U2Q4.mp3",
  hintAudio: "G1U2Q4H.mp3",
  explanationAudio: "G1U2Q4E.mp3",

  targets: ['Brown', 'Green', 'Orange', 'Purple', 'Yellow'],
  optionsAudio: {
    "Brown": "Brown.mp3",
    "Green": "Green.mp3",
    "Orange": "Orange.mp3",
    "Purple": "Purple.mp3",
    "Yellow": "Yellow.mp3"
  },

  correct: 'Brown',
  explanation: "Correct! Tree trunks are Brown!",
  hint: "Look at the tall trees."
},


/* -------------------- 🌊 OCEAN (Q5–Q9) -------------------- */

{
  scene: 'ocean',
  question: "What color is the ocean water?",
  questionAudio: "G1U2Q5.mp3",
  hintAudio: "G1U2Q5H.mp3",
  explanationAudio: "G1U2Q5E.mp3",

  targets: ['Blue', 'Green', 'Red', 'Yellow', 'Brown'],
  optionsAudio: {
    "Blue": "Blue.mp3",
    "Green": "Green.mp3",
    "Red": "Red.mp3",
    "Yellow": "Yellow.mp3",
    "Brown": "Brown.mp3"
  },

  correct: 'Blue',
  explanation: "Amazing! The ocean is Blue!",
  hint: "Look at the color below the surface of the water."
},

{
  scene: 'ocean',
  question: "What color is the sun in the sky?",
  questionAudio: "G1U2Q6.mp3",
  hintAudio: "G1U2Q6H.mp3",
  explanationAudio: "G1U2Q6E.mp3",

  targets: ['Yellow', 'Blue', 'Red', 'Green', 'Orange'],
  optionsAudio: {
    "Yellow": "Yellow.mp3",
    "Blue": "Blue.mp3",
    "Red": "Red.mp3",
    "Green": "Green.mp3",
    "Orange": "Orange.mp3"
  },

  correct: 'Yellow',
  explanation: "Wonderful! The sun is Yellow!",
  hint: "Look up above the water."
},

{
  scene: 'ocean',
  question: "What can the octopus do to its color?",
  questionAudio: "G1U2Q7.mp3",
  hintAudio: "G1U2Q7H.mp3",
  explanationAudio: "G1U2Q7E.mp3",

  targets: ['Change', 'Glow', 'Flash', 'Sparkle', 'Darken'],
  optionsAudio: {
    "Change": "Change.mp3",
    "Glow": "Glow.mp3",
    "Flash": "Flash.mp3",
    "Sparkle": "Sparkle.mp3",
    "Darken": "Darken.mp3"
  },

  correct: 'Change',
  explanation: "Brilliant! The octopus can Change its color!",
  hint: "The octopus has a special ability to hide."
},

{
  scene: 'ocean',
  question: "What color is the dolphin?",
  questionAudio: "G1U2Q8.mp3",
  hintAudio: "G1U2Q8H.mp3",
  explanationAudio: "G1U2Q8E.mp3",

  targets: ['Gray', 'Blue', 'White', 'Yellow','Green'],
  optionsAudio: {
    "Gray": "Gray.mp3",
    "Blue": "Blue.mp3",
    "White": "White.mp3",
    "Yellow": "Yellow.mp3",
    "Green": "Green.mp3"
  },

  correct: 'Gray',
  explanation: "Perfect! The dolphin is Gray!",
  hint: "Look for the friendly swimming mammal."
},

{
  scene: 'ocean',
  question: "What color are the tropical fish?",
  questionAudio: "G1U2Q9.mp3",
  hintAudio: "G1U2Q9H.mp3",
  explanationAudio: "G1U2Q9E.mp3",

  targets: ['Colorful', 'Gray', 'Brown', 'White', 'Green'],
  optionsAudio: {
    "Colorful": "Colorful.mp3",
    "Gray": "Gray.mp3",
    "Brown": "Brown.mp3",
    "White": "White.mp3",
    "Green": "Green.mp3"
  },

  correct: 'Colorful',
  explanation: "Yes! Tropical fish are very Colorful!",
  hint: "Look at the small fish swimming around."
},


/* -------------------- 🏙️ CITY (Q10–Q13) -------------------- */

{
  scene: 'city',
  question: "What color is the STOP sign?",
  questionAudio: "G1U2Q10.mp3",
  hintAudio: "G1U2Q10H.mp3",
  explanationAudio: "G1U2Q10E.mp3",

  targets: ['Red', 'Green', 'Blue', 'Orange', 'White'],
  optionsAudio: {
    "Red": "Red.mp3",
    "Green": "Green.mp3",
    "Blue": "Blue.mp3",
    "Orange": "Orange.mp3",
    "White": "White.mp3"
  },

  correct: 'Red',
  explanation: "Excellent! STOP signs are Red!",
  hint: "Full Stop."
},

{
  scene: 'city',
  question: "What color means GO on a traffic light?",
  questionAudio: "G1U2Q11.mp3",
  hintAudio: "G1U2Q11H.mp3",
  explanationAudio: "G1U2Q11E.mp3",

  targets: ['Green', 'Red', 'Blue', 'Orange', 'White'],
  optionsAudio: {
    "Green": "Green.mp3",
    "Red": "Red.mp3",
    "Blue": "Blue.mp3",
    "Orange": "Orange.mp3",
    "White": "White.mp3"
  },

  correct: 'Green',
  explanation: "Perfect! Green means GO!",
  hint: "Think about traffic lights."
},

{
  scene: 'city',
  question: "What color is the cat on the sidewalk?",
  questionAudio: "G1U2Q12.mp3",
  hintAudio: "G1U2Q12H.mp3",
  explanationAudio: "G1U2Q12E.mp3",

  targets: ['Orange', 'White', 'Gray', 'Brown', 'Blue'],
  optionsAudio: {
    "Orange": "Orange.mp3",
    "White": "White.mp3",
    "Gray": "Gray.mp3",
    "Brown": "Brown.mp3",
    "Blue": "Blue.mp3"
  },

  correct: 'Orange',
  explanation: "Wonderful! The cat is Orange!",
  hint: "Look for the furry friend on the sidewalk."
},

{
  scene: 'city',
  question: "What color is the school bus?",
  questionAudio: "G1U2Q13.mp3",
  hintAudio: "G1U2Q13H.mp3",
  explanationAudio: "G1U2Q13E.mp3",

  targets: ['Yellow', 'Red', 'Blue', 'Orange', 'White'],
  optionsAudio: {
    "Yellow": "Yellow.mp3",
    "Red": "Red.mp3",
    "Blue": "Blue.mp3",
    "Orange": "Orange.mp3",
    "White": "White.mp3"
  },

  correct: 'Yellow',
  explanation: "Great! School buses are Yellow!",
  hint: "Look for the big vehicle."
}

];



/*************************************************
 🔊 AUTO-LOAD PER-QUESTION AUDIO
**************************************************/
gameQuestions.forEach(q => {
    if (q.questionAudio)
        audioManager.load(q.questionAudio.replace(".mp3",""), "../../../../audio/" + q.questionAudio);

    if (q.hintAudio)
        audioManager.load(q.hintAudio.replace(".mp3",""), "../../../../audio/" + q.hintAudio);

    if (q.explanationAudio)
        audioManager.load(q.explanationAudio.replace(".mp3",""), "../../../../audio/" + q.explanationAudio);

    if (q.optionsAudio) {
        Object.keys(q.optionsAudio).forEach(opt => {
            const f = q.optionsAudio[opt];
            audioManager.load(f.replace(".mp3",""), "../../../../audio/" + f);
        });
    }
});


/*************************************************
 🎨 SCENE & SPRITES
**************************************************/
const sceneBackgrounds = {
    forest: "../../../../images/forest-scene_compressed.jpg",
    ocean: "../../../../images/ocean-scene_compressed.jpg",
    city: "../../../../images/city-scene_compressed.jpg"
};

const targetSprites = {
    forest: "../../../../images/butterfly.png",
    ocean: "../../../../images/fish_final.png",
    city: "../../../../images/balloon_compressed.jpg"
};


/*************************************************
 🎮 GAME ENGINE VARIABLES
**************************************************/
let currentQuestionIndex = 0;
let isPlaying = false;
let targets = [];
let particles = [];
let backgroundImage = null;
let targetImage = null;
let animationId = null;

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("load", () => {
    simulateLoading();
    setupEventListeners();
});


/*************************************************
 ⏳ LOADING SCREEN
**************************************************/
function simulateLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById("progress-fill");
    const loadingPercent = document.getElementById("loading-percent");
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
           setTimeout(() => {
    loadingScreen.classList.add("hidden");
    document.getElementById("cover-screen").classList.remove("hidden");

    // ⭐ Ensure cover is visible before playing audio
    setTimeout(() => {
        playLocal("welcome");
    }, 150);
}, 500);

        }
        progressFill.style.width = progress + "%";
        loadingPercent.textContent = Math.floor(progress) + "%";
    }, 200);
}


/*************************************************
 🎛 BUTTON EVENTS
**************************************************/
function setupEventListeners() {
    document.getElementById("play-button").addEventListener("click", startGame);
    document.getElementById("help-button").addEventListener("click", showInstructions);
    document.getElementById("back-btn").addEventListener("click", backToCover);
    document.getElementById("hint-btn").addEventListener("click", showHint);
    document.getElementById("stop-btn").addEventListener("click", stopAudio);
    document.getElementById("close-instructions").addEventListener("click", closeInstructions);
    document.getElementById("continue-btn").addEventListener("click", continueGame);
document.getElementById("music-toggle").addEventListener("click", toggleMusic);
document.getElementById("speak-btn").addEventListener("click", replayQuestionAudio);


    document.getElementById("replay-button").addEventListener("click", () => {
        currentQuestionIndex = 0;
        document.getElementById("completion-screen").classList.add("hidden");
        startGame();
    });

    document.getElementById("home-button").addEventListener("click", () => {
        document.getElementById("completion-screen").classList.add("hidden");
        backToCover();
    });

    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("mousemove", handleHover);
    canvas.addEventListener("touchstart", handleTouch);

    window.addEventListener("resize", resizeCanvas);
}

function replayQuestionAudio() {
    const q = gameQuestions[currentQuestionIndex];

    stopAudio();    // stop what’s currently playing
    fadeOutBGM();   // lower background music volume

    if (q.questionAudio) {
        playLocal(q.questionAudio.replace(".mp3",""));
    } else {
        speak(q.question);
    }
}

/*************************************************
 ▶ START GAME
**************************************************/
function startGame() {
    stopAudio();
    document.getElementById("cover-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    resizeCanvas();
    currentQuestionIndex = 0;
    loadQuestion();
}

function showInstructions() {
    stopAudio();
    playLocal("howtoplay");
    document.getElementById("instructions-modal").classList.add("show");
}
function replayInstructions() {
       fadeOutBGM();
playLocal("howtoplay");
}

function closeInstructions() {
    stopAudio();
    document.getElementById("instructions-modal").classList.remove("show");
}

function backToCover() {
    stopAudio();
    if (animationId) cancelAnimationFrame(animationId);
    isPlaying = false;
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("cover-screen").classList.remove("hidden");
}


/*************************************************
 ❓ LOAD QUESTION (plays unique audio)
**************************************************/
function loadQuestion() {
    if (animationId) cancelAnimationFrame(animationId);  // ⭐ Stop previous loop

    if (currentQuestionIndex >= gameQuestions.length) {
        showCompletion();
        return;
    }

    const q = gameQuestions[currentQuestionIndex];
    document.getElementById("question-text").textContent = q.question;

    if (q.questionAudio) {
        playLocal(q.questionAudio.replace(".mp3",""));
    } else {
        speak(q.question);
    }

    backgroundImage = new Image();
    backgroundImage.src = sceneBackgrounds[q.scene];
    backgroundImage.onload = () => drawScene();

    targetImage = new Image();
    targetImage.src = targetSprites[q.scene];

    startRound();
}


/*************************************************
 🎯 TARGETS WITH THEIR OWN AUDIO
**************************************************/
function createTargets() {
    targets = [];
    const q = gameQuestions[currentQuestionIndex];

    q.targets.forEach(text => {
        targets.push({
            x: Math.random() * (canvas.width - 100),
            y: Math.random() * (canvas.height - 80),
          vx: Math.cos(angle) * speed,
vy: Math.sin(angle) * speed,
            text,
            width: 120,
            height: 80,

            read: () => {
                if (q.optionsAudio && q.optionsAudio[text]) {
                    playLocal(q.optionsAudio[text].replace(".mp3",""));
                } else {
                    speak(text);
                }
            }
        });
    });
}


/*************************************************
 💡 HINT AUDIO (unique per question)
**************************************************/
function showHint() {
    const q = gameQuestions[currentQuestionIndex];

    if (q.hintAudio) {
        playLocal(q.hintAudio.replace(".mp3",""));
    } else {
        speak(q.hint);
    }
}


/*************************************************
 🟢 CORRECT ANSWER — EXPLANATION AUDIO
**************************************************/
function showExplanation(text) {
    const q = gameQuestions[currentQuestionIndex];

    if (q.explanationAudio) {
        playLocal(q.explanationAudio.replace(".mp3",""));
    } else {
        speak(text);
    }

    document.getElementById("explanation-text").textContent = text;
    document.getElementById("explanation-modal").classList.add("show");
}

function continueGame() {
    document.getElementById("explanation-modal").classList.remove("show");
    currentQuestionIndex++;
    loadQuestion();
}


/*************************************************
 🎉 COMPLETION SCREEN
**************************************************/
function showCompletion() {
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("completion-screen").classList.remove("hidden");
}


/*************************************************
 🎨 CANVAS + ANIMATION (unchanged)
**************************************************/
function resizeCanvas() {
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const aspect = 16 / 10;

    let w = rect.width - 40;
    let h = w / aspect;

    if (h > rect.height - 40) {
        h = rect.height - 40;
        w = h * aspect;
    }

    canvas.width = w;
    canvas.height = h;

    if (backgroundImage && backgroundImage.complete)
        drawScene();
}

function startRound() {
    isPlaying = true;
    createTargets();
    gameLoop();
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
    targets.forEach(t => {
        t.x += t.vx;
        t.y += t.vy;

        if (t.x <= 0 || t.x >= canvas.width - t.width) t.vx *= -1;
        if (t.y <= 0 || t.y >= canvas.height - t.height) t.vy *= -1;
    });
}

function drawScene() {
    if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }
}

function drawTargets() {
    targets.forEach(t => {
        if (targetImage.complete) {
            ctx.drawImage(targetImage, t.x, t.y, 60, 60);
        }

        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillRect(t.x, t.y + 65, t.width, 35);

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.strokeRect(t.x, t.y + 65, t.width, 35);

        ctx.fillStyle = "#333";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.fillText(t.text, t.x + t.width / 2, t.y + 82);
    });
}

function drawParticles() {
    particles.forEach((p, i) => {
        p.life--;
        p.x += p.vx;
        p.y -= p.vy;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 60;
        ctx.fillRect(p.x, p.y, 5, 5);

        if (p.life <= 0) particles.splice(i, 1);
    });
    ctx.globalAlpha = 1;
}


/*************************************************
 🖱 INTERACTION (option audio included)
**************************************************/
function handleCanvasClick(e) {
    if (!isPlaying) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const q = gameQuestions[currentQuestionIndex];

    for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];

        if (x >= t.x && x <= t.x + t.width &&
            y >= t.y && y <= t.y + 100) {

            if (t.text === q.correct) {
                createParticles(x, y, "#4CAF50");
                showExplanation(q.explanation);
            } else {
                createParticles(x, y, "#f44336");
            }
            break;
        }
    }
}

function handleHover(e) {
    if (!isPlaying) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targets.forEach(t => {
        if (x >= t.x && x <= t.x + t.width &&
            y >= t.y && y <= t.y + 100) {
            t.read();
        }
    });
}

function handleTouch(e) {
    if (!isPlaying) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    targets.forEach(t => {
        if (x >= t.x && x <= t.x + t.width &&
            y >= t.y && y <= t.y + 100) {
            t.read();
        }
    });
}


/*************************************************
 ✨ PARTICLES
**************************************************/
function createParticles(x, y, color) {
    for (let i = 0; i < 30; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 3 + 1,
            life: 60,
            color
        });
    }
}