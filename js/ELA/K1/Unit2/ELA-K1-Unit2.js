
/** ====== Asset Definitions ====== */
const FAMILY_BLURBS = {
  mother: "A mother is a woman who cares for her family.",
  father: "A father is a man who cares for his family.",
  brother: "A brother is a boy in your family.",
  sister: "A sister is a girl in your family.",
  grandmother: "A grandmother is an older woman in your family.",
  grandfather: "A grandfather is an older man in your family.",
};

const STORY_FEEDBACK = {
  cereal: { sense: "taste", expl: "Cereal is food we can eat at breakfast." },
  milk: { sense: "taste", expl: "Milk is a drink we can drink with breakfast." },
  ball: { sense: "touch", expl: "We can throw and catch a ball when we play outside." },
  toy: { sense: "touch", expl: "We can hold and play with toys." },
  food: { sense: "taste", expl: "Food is something we eat at dinner." },
  pillow: { sense: "touch", expl: "A soft pillow helps our head rest at bedtime." },
  blanket: { sense: "touch", expl: "A blanket keeps us warm at night." }
};

/** ====== Assets ====== */
const imagePaths = [
  '../../../../images/father_256_clean.webp',
  '../../../../images/mother_256.webp',
  '../../../../images/grandfather_256.webp',
  '../../../../images/grandmother_256.webp',
  '../../../../images/sister_256.webp',
  '../../../../images/brother_256.webp',
  '../../../../images/family_breakfast_cereal.webp',
  '../../../../images/milk.webp',
  '../../../../images/ball.webp',
  '../../../../images/family_playing_toy.webp',
  '../../../../images/family_dinner_food.webp',
  '../../../../images/pillow.webp',
  '../../../../images/blanket.webp',
  '../../../../images/learning_buddy.webp',
  '../../../../images/level-up-congrats-blue-v2.webp',
  '../../../../images/FamilyPuzzleGame_50kb_final.webp'
];

const audioPaths = [
  '../../../../audio/kids-game-gaming-background-music-295075.mp3',
  '../../../../audio/applause.mp3',
  "../../../../audio/K1U1covergame.mp3",
  "../../../../audio/K1U1HowToPlay.mp3",
  "../../../../audio/K1-U2-1.mp3",
  "../../../../audio/mother.mp3",
  "../../../../audio/father.mp3",
  "../../../../audio/brother.mp3",
  "../../../../audio/sister.mp3",
  "../../../../audio/grandmother.mp3",
  "../../../../audio/grandfather.mp3",
];

const LEVEL_STORAGE_KEY = 'familyTreeLevel';
const LEVEL_UP_IMG_SRC = '../../../../images/level-up-congrats-blue-v2.webp';
// Loading screen elements
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');
const coverScreen = document.getElementById('cover-screen');

const totalAssets = imagePaths.length + audioPaths.length;
let loadedCount = 0;

function updateProgress() {
  loadedCount++;
  const percent = Math.round((loadedCount / totalAssets) * 100);
  progressBar.style.width = percent + '%';
  loadingText.textContent = `Loading... ${percent}%`;

  if (loadedCount >= totalAssets) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      coverScreen.classList.remove('hidden');
    }, 400);
  }
}

function preloadAssets() {
  const promises = [];

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

  promises.forEach(p => p.then(updateProgress));

  Promise.allSettled(promises).then(() => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      coverScreen.classList.remove('hidden');
    }, 400);
  });
}

window.addEventListener('load', preloadAssets);

/** ====== AUDIO PLAYBACK (RECORDED AUDIO ONLY) ====== */
let currentAudio = null;
let audioSequenceStopped = false;

const audioMap = {
  "welcome-message": "../../../../audio/K1U1covergame.mp3",
  "How to Play": "../../../../audio/K1U2HowToPlay.mp3",
  "Choose the word that matches with the picture.": "../../../../audio/K1-U2-1.mp3",
  "Which word matches this picture?": "../../../../audio/K1-U1-2.mp3",
  "Correct!": "../../../../audio/K1U1Correct.mp3",
  "Try again.": "../../../../audio/K1U1TryAgain.mp3",
  "mother": "../../../../audio/mother.mp3",
  "father": "../../../../audio/father.mp3",
  "brother": "../../../../audio/brother.mp3",
  "sister": "../../../../audio/sister.mp3",
  "grandmother": "../../../../audio/grandmother.mp3",
  "grandfather": "../../../../audio/grandfather.mp3",
  "cereal": "../../../../audio/cereal.mp3",
  "milk": "../../../../audio/milk.mp3",
  "ball": "../../../../audio/ball.mp3",
  "toy": "../../../../audio/toy.mp3",
  "food": "../../../../audio/food.mp3",
  "pillow": "../../../../audio/pillow.mp3",
  "blanket": "../../../../audio/blanket.mp3",
  "Look for the boy in the family.": "../../../../audio/K1-U2-1-hint.mp3",
  "Look for the woman who takes care of the family.": "../../../../audio/K1-U2-2-hint.mp3",
  "Look for the man who is a parent.": "../../../../audio/K1-U2-3-hint.mp3",
  "Look for the girl in the family.": "../../../../audio/K1-U2-4-hint.mp3",
  "Look for the older woman in the family.": "../../../../audio/K1-U2-5-hint.mp3",
  "Look for the older man in the family.": "../../../../audio/K1-U2-6-hint.mp3",
  'Correct! We match the picture with the word "mother". A mother is a woman who cares for her family.': "../../../../audio/K1-U2-2-explanation.mp3",
  'Correct! We match the picture with the word "father". A father is a man who cares for his family.': "../../../../audio/K1-U2-3-explanation.mp3",
  'Correct! We match the picture with the word "sister". A sister is a girl in your family.': "../../../../audio/K1-U2-4-explanation.mp3",
  'Correct! We match the picture with the word "grandmother". A grandmother is an older woman in your family.': "../../../../audio/K1-U2-5-explanation.mp3",
  'Correct! We match the picture with the word "grandfather". A grandfather is an older man in your family.': "../../../../audio/K1-U2-6-explanation.mp3",
  'Correct! We match the picture with the word "brother". A brother is a boy in your family.': "../../../../audio/K1-U2-1-Explanation.mp3",
  'Try again. We are matching the picture with the word "brother". A brother is a boy in your family.': "../../../../audio/K1-U2-1-tryagainExplanation.mp3",
  'Try again. We are matching the picture with the word "mother". A mother is a woman who cares for her family.': "../../../../audio/K1-U2-2-tryagainExplanation.mp3",
  'Try again. We are matching the picture with the word "father". A father is a man who cares for his family.': "../../../../audio/K1-U2-3-tryagainExplanation.mp3",
  'Try again. We are matching the picture with the word "grandmother". A grandmother is an older woman in your family.': "../../../../audio/K1-U2-4-tryagainExplanation.mp3",
  'Try again. We are matching the picture with the word "sister". A sister is a girl in your family.': "../../../../audio/K1-U2-5-tryagainExplanation.mp3",
  'Try again. We are matching the picture with the word "grandfather". A grandfather is an older man in your family.': "../../../../audio/K1-U2-6-tryagainExplanation.mp3",
   "Family Tree Complete! 🎉": "../../../../audio/K1-U2-l1.mp3",
};

function speakText(key) {
  stopAudio();
  if (!key) return;
  const src = audioMap[key] || key;
  currentAudio = new Audio(src);
  currentAudio.play().catch(err => console.log("❌ Audio play failed:", err));
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.onended = null;
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  } else {
    console.log("⚠️ No audio was playing");
  }
  audioSequenceStopped = true;
}

function playApplauseSound() {
  stopAudio();
  currentAudio = new Audio('../../../../audio/applause.mp3');
  currentAudio.play().catch(err => console.log("Applause play failed:", err));
}

/* ======== Assets ======== */
const characterImages = {
  father: '../../../../images/father_256_clean.webp',
  mother: '../../../../images/mother_256.webp',
  grandfather: '../../../../images/grandfather_256.webp',
  grandmother: '../../../../images/grandmother_256.webp',
  sister: '../../../../images/sister_256.webp',
  brother: '../../../../images/brother_256.webp'
};

const storyImages = {
  cereal: '../../../../images/family_breakfast_cereal.webp',
  milk: '../../../../images/milk.webp',
  ball: '../../../../images/ball.webp',
  toy: '../../../../images/family_playing_toy.webp',
  food: '../../../../images/family_dinner_food.webp',
  pillow: '../../../../images/pillow.webp',
  blanket: '../../../../images/blanket.webp'
};

/* ======== Game Data ======== */
const gameRounds = [
  {
    round: 1,
    vocabulary: ["mother", "father", "brother", "sister", "grandfather", "grandmother"],
    scenarios: [
      { text: "Which word matches this picture?", correctImage: "brother", mcqOptions: ["grandmother", "mother", "brother"], familyMember: "brother" },
      { text: "Which word matches this picture?", correctImage: "mother", mcqOptions: ["grandfather", "mother", "sister"], familyMember: "mother" },
      { text: "Which word matches this picture?", correctImage: "father", mcqOptions: ["father", "brother", "grandmother"], familyMember: "father" },
      { text: "Which word matches this picture?", correctImage: "sister", mcqOptions: ["sister", "grandfather", "father"], familyMember: "sister" },
      { text: "Which word matches this picture?", correctImage: "grandmother", mcqOptions: ["mother", "grandmother", "brother"], familyMember: "grandmother" },
      { text: "Which word matches this picture?", correctImage: "grandfather", mcqOptions: ["grandfather", "sister", "mother"], familyMember: "grandfather" }
    ]
  }
];

const storyScenarios = [
  { text: "What do we eat for breakfast?", scene: "breakfast", position: 1, correctItem: "cereal", items: ["cereal", "ball", "pillow"] },
  { text: "What do we drink with breakfast?", scene: "breakfast", position: 2, correctItem: "milk", items: ["milk", "toy", "blanket"] },
  { text: "What do we play with outside?", scene: "playing", position: 1, correctItem: "ball", items: ["food", "ball", "cereal"] },
  { text: "What toys do we play with?", scene: "playing", position: 2, correctItem: "toy", items: ["pillow", "milk", "toy"] },
  { text: "What do we eat for dinner?", scene: "dinner", position: 1, correctItem: "food", items: ["food", "ball", "blanket"] },
  { text: "What do we use to sleep?", scene: "bedtime", position: 1, correctItem: "pillow", items: ["cereal", "pillow", "toy"] },
  { text: "What keeps us warm at night?", scene: "bedtime", position: 2, correctItem: "blanket", items: ["ball", "food", "blanket"] }
];

/* ======== Game State ======== */
let currentRound = 0;
let currentScenario = 0;
let currentPhase = 2;
let revealedMembers = new Set();

let inStoryMode = false;
let storyIndex = 0;
let revealedStoryItems = new Set();

let currentAudioText = '';
let explanationNextStep = null;
let questionAudioPlaying = false;

/* ======== Controls ======== */
function playCurrentAudio() {
  playQuestionAudio();
}

function playQuestionAudio() {
  stopAudio();

  if (inStoryMode) {
    const s = storyScenarios[storyIndex];
    if (!s) return;
    speakText(s.text);
    return;
  }

  const round = gameRounds[currentRound];
  const s = round?.scenarios[currentScenario];
  if (!s) return;

  const questionAudioSrc = audioMap[s.text] || s.text;
  currentAudio = new Audio(questionAudioSrc);
  currentAudio.play().catch(err => console.log("Audio play failed:", err));

  currentAudio.onended = () => {
    let i = 0;
    const playNextOption = () => {
      if (i >= s.mcqOptions.length) return;
      const option = s.mcqOptions[i];
      currentAudio = new Audio(audioMap[option] || option);
      currentAudio.play().catch(err => console.log("Audio play failed:", err));
      currentAudio.onended = () => {
        i++;
        playNextOption();
      };
    };
    playNextOption();
  };
}

function continueFromExplanation() {
  stopAudio();

  // Hide the explanation modal
  const modal = document.getElementById('explanation-modal');
  if (modal) {
    modal.classList.remove('show');
  }

  // Execute next step if provided
  if (typeof explanationNextStep === "function") {
    const next = explanationNextStep;
    explanationNextStep = null;
    next();
  }
}


/* ======== Background Music ======== */
let musicPlaying = true;
let musicAvailable = false;
const bgMusic = document.getElementById('background-music');
const musicBtn = document.getElementById('music-control');

bgMusic.addEventListener('canplay', () => {
  musicAvailable = true;
});

function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🔇';
    musicBtn.title = 'Unmute Music';
    musicPlaying = false;
  } else {
    bgMusic.play().catch(err => {
      alert('Unable to play music. Please check your browser settings.');
    });
    musicBtn.textContent = '🔊';
    musicBtn.title = 'Mute Music';
    musicPlaying = true;
  }
}

function startBackgroundMusic() {
  if (!musicAvailable) {
    return;
  }
  
  bgMusic.play().catch(err => {
    document.addEventListener('click', function playOnFirstClick() {
      if (!musicPlaying) return;
      bgMusic.play().catch(e => console.log('Music play failed:', e));
      document.removeEventListener('click', playOnFirstClick);
    }, { once: true });
  });
  musicPlaying = true;
  musicBtn.textContent = '🔊';
  musicBtn.title = 'Mute Music';
}
function replayInstructions() {
  // Always play the How-To audio, not the welcome
  stopAudio();

  speakText("How to Play");

    
}
function showInstructions() {
  stopAudio();
    speakText("How to Play");

  document.getElementById("instructions-modal").classList.add("active");
  replayInstructions();
}
/* ======== Instructions Modal ======== */
// function showInstructions() {
//   document.getElementById('instructions-modal').classList.add('active');
// }

function closeInstructions() {
  document.getElementById('instructions-modal').classList.remove('active');
    stopAudio();

}

/* ======== Menu ======== */
function startGame() {
  document.getElementById('cover-screen').classList.add('hidden');
  document.getElementById('game-container').classList.add('active');
  startBackgroundMusic();
  initializeGame();
}

function backToMenu() {
  document.getElementById('cover-screen').classList.remove('hidden');
  document.getElementById('game-container').classList.remove('active');
  resetGame();
}

function backToActivities() { 
  backToMenu(); 
}

function chooseLevel() { 
  alert("Choose level feature coming soon!"); 
}

function reviewMode() { 
  alert("Review mode feature coming soon!"); 
}

/* ======== Init / Reset ======== */
function resetGame() {
  currentRound = 0;
  currentScenario = 0;
  currentPhase = 2;
  revealedMembers.clear();
  revealedStoryItems.clear();
  inStoryMode = false;
  storyIndex = 0;
  resetFamilyTree();
  resetStoryBook();
  hideAllSections();
}

function initializeGame() {
  resetFamilyTree();
  resetStoryBook();
  inStoryMode = false;
  storyIndex = 0;
  showPhase2();
  loadScenario();
}

function hideAllSections() {
  document.getElementById('phase1').classList.add('hidden');
  document.getElementById('phase2').classList.remove('active');
  document.getElementById('story-section').classList.remove('active');
  document.getElementById('level-complete').style.display = 'none';
}

/* ======== Family Tree Helpers ======== */
function resetFamilyTree() {
  document.querySelectorAll('.tree-member').forEach(member => {
    member.classList.remove('revealed');
    const image = member.querySelector('.member-image');
    const emoji = image.querySelector('.emoji');
    const memberType = member.dataset.member;
    const emojis = { father: '👨', mother: '👩', grandfather: '👴', grandmother: '👵', sister: '👧', brother: '👦' };
    image.style.backgroundImage = '';
    if (emoji) { 
      emoji.textContent = emojis[memberType];
      emoji.style.display = 'block';
    }
  });
  revealedMembers.clear();
  document.getElementById('text-display').textContent = 'Click Start to begin building your family tree!';
}

function revealFamilyMember(memberType) {
  if (revealedMembers.has(memberType)) return;
  revealedMembers.add(memberType);
  const treeMember = document.querySelector(`[data-member="${memberType}"]`);
  if (!treeMember) return;
  treeMember.classList.add('revealed');
  const memberImage = treeMember.querySelector('.member-image');
  const emoji = memberImage.querySelector('.emoji');
  if (emoji) emoji.style.display = 'none';
  memberImage.style.backgroundImage = `url(${characterImages[memberType]})`;
  createSparkleEffect(treeMember);
}

function createSparkleEffect(element) {
  const rect = element.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = rect.left + rect.width / 2 + 'px';
    sparkle.style.top = rect.top + rect.height / 2 + 'px';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    sparkle.style.transform = `rotate(${i * 45}deg) translateY(-30px)`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

/* ======== Phase Management ======== */
function showPhase1() {
  currentPhase = 1;
  document.getElementById('phase1').classList.remove('hidden');
  document.getElementById('phase2').classList.remove('active');
  document.getElementById('story-section').classList.remove('active');
}

function showPhase2() {
  currentPhase = 2;
  document.getElementById('phase1').classList.add('hidden');
  document.getElementById('phase2').classList.add('active');
  document.getElementById('story-section').classList.remove('active');
}

/* ======== Scenario Loading ======== */
function setInstruction(text) {
  const el = document.getElementById('instruction-text');
  if (el) el.textContent = text;
}

function loadScenario() {
  const round = gameRounds[currentRound];
  const scenario = round.scenarios[currentScenario];
  startPhase2();
}

function loadImageOptions(scenario) {
  const container = document.getElementById('image-options');
  container.innerHTML = '';
  scenario.images.forEach(imageKey => {
    const option = document.createElement('div');
    option.className = 'image-option';
    option.style.backgroundImage = `url(${characterImages[imageKey]})`;
    option.onclick = () => selectImage(imageKey, scenario.correctImage, option, scenario);
    container.appendChild(option);
  });
}

/* ======== Feedback Overlay (FIXED) ======== */
function showExplanation(correct, explanationText, callback) {

  // // Set title and text
  // document.getElementById('explanation-title').textContent = 
  //     correct ? 'Well done!' : 'Try Again!';
  document.getElementById('explanation-text').textContent = explanationText;

  // Show modal
  const modal = document.getElementById('explanation-modal');
  modal.classList.add('show');

  // Applause + Fireworks if correct
  if (correct) {
    playApplauseSound();
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    launchFireworks(cx, cy);
  }

  // Speak feedback (2 sec delay ONLY if correct)
  setTimeout(() => {
    speakText(explanationText);
  }, correct ? 2000 : 0);

  // Save the callback so the continue button can trigger it
  explanationNextStep = callback;
}


/* ======== Phase 1: Image selection ======== */
function selectImage(selected, correct, element, scenario) {
  const allOptions = document.querySelectorAll('.image-option');
  allOptions.forEach(opt => opt.style.pointerEvents = 'none');

  if (selected === correct) {
    element.classList.add('correct');
    revealFamilyMember(scenario.familyMember);
    const feedback = `Yes—${scenario.familyMember}! We say: "This is my ${scenario.familyMember}." ${FAMILY_BLURBS[scenario.familyMember]}`;
    showExplanation(true, feedback, () => { startPhase2(); });
  } else {
    element.classList.add('wrong');
    const feedback = `Let's look again. We are finding ${scenario.familyMember} — ${FAMILY_BLURBS[scenario.familyMember]}`;
    showExplanation(false, feedback, () => {
      element.classList.remove('wrong');
      allOptions.forEach(opt => opt.style.pointerEvents = 'auto');
    });
  }
}

/* ======== Phase 2: MCQ ======== */
function startPhase2() {
  currentPhase = 2;
  showPhase2();

  const round = gameRounds[currentRound];
  const scenario = round.scenarios[currentScenario];

  const instructionText = "Choose the word that matches with the picture.";
  const questionText = "Which word matches this picture?";

  setInstruction(instructionText);

  const largeImageContainer = document.getElementById('large-image');
  largeImageContainer.style.backgroundImage = `url(${characterImages[scenario.correctImage]})`;

  document.getElementById('mcq-question').textContent = questionText;
  setupMCQOptions(scenario);

  stopAudio();
  audioSequenceStopped = false;
  questionAudioPlaying = true;

  // 1) PLAY INSTRUCTION
  currentAudio = new Audio(audioMap[instructionText] || audioMap["instructions"]);
  currentAudio.play().catch(err => console.log("Instruction play failed:", err));

  currentAudio.onended = () => {
    if (audioSequenceStopped) {
      return;
    }

    // 2) PLAY QUESTION
    currentAudio = new Audio(audioMap[questionText] || audioMap["question"]);
    currentAudio.play().catch(err => console.log("Question play failed:", err));

    currentAudio.onended = () => {
      if (audioSequenceStopped) {
        return;
      }

      // 3) PLAY MCQ OPTIONS
      let i = 0;
      function playNextOption() {
        if (audioSequenceStopped) {
          questionAudioPlaying = false;
          return;
        }
        if (i >= scenario.mcqOptions.length) {
          questionAudioPlaying = false;
          return;
        }

        const word = scenario.mcqOptions[i];
        currentAudio = new Audio(audioMap[word] || "");
        currentAudio.play().catch(err => console.log("Option audio failed:", word));

        currentAudio.onended = () => {
          i++;
          playNextOption();
        };
      }
      playNextOption();
    };
  };
}

function setupMCQOptions(scenario) {
  const container = document.getElementById('word-options');
  container.innerHTML = '';

  scenario.mcqOptions.forEach(word => {
    const button = document.createElement('button');
    button.className = 'word-button';
    button.textContent = word;
    button.onclick = (e) => selectMCQWord(e, word, scenario);
    button.onmouseenter = () => { 
      stopAudio();
      speakText(word); 
    };
    container.appendChild(button);
  });
}

function selectMCQWord(e, selectedWord, scenario) {
  const allButtons = document.querySelectorAll('#word-options .word-button');
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedWord === scenario.familyMember) {
    e.target.classList.add('correct');
    const msg = `Correct! We match the picture with the word "${scenario.familyMember}". ${FAMILY_BLURBS[scenario.familyMember]}`;
    playApplauseSound();
    showFireworks(); // optional, but matches Unit 1 style

    showExplanation(true, msg, () => { completeScenario(); });
  } else {
    e.target.classList.add('wrong');
    const msg = `Try again. We are matching the picture with the word "${scenario.familyMember}". ${FAMILY_BLURBS[scenario.familyMember]}`;
    showExplanation(false, msg, () => {
      e.target.classList.remove('wrong');
      allButtons.forEach(btn => btn.disabled = false);
    });
  }
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
function completeScenario() {
  currentScenario++;
  const round = gameRounds[currentRound];
  if (currentScenario >= round.scenarios.length) {
    showSectionComplete('Family Tree Complete! 🎉');
  } else {
    loadScenario();
  }
}

function showSectionComplete(message) {
  setInstruction('Great! Continue to the next part.');
  speakThen('Great job building your family! Now, help with our day together.', () => startStoryMode());
}

function speakThen(text, next) {
  speakText(text);
  if (currentAudio && typeof next === 'function') {
    currentAudio.onended = next;
  }
}

/* ======== Story Mode ======== */
function startStoryMode() {
  inStoryMode = true;
  storyIndex = 0;
  setInstruction('Pick the item that fits the scene.');
  document.getElementById('phase1').classList.add('hidden');
  document.getElementById('phase2').classList.remove('active');
  document.getElementById('story-section').classList.add('active');
  loadStoryScenario();
}

function resetStoryBook() {
  document.querySelectorAll('.story-item').forEach(item => {
    item.classList.remove('revealed');
    item.style.backgroundImage = '';
  });
  revealedStoryItems.clear();
  document.getElementById('story-text-display').textContent = 'Complete the family day story by adding the missing items!';
  document.getElementById('story-options').innerHTML = '';
}
function revealStoryItem(scene, position, itemType) {
  const key = `${scene}-${position}`;
  if (revealedStoryItems.has(key)) return;
  revealedStoryItems.add(key);
  const storyItem = document.querySelector(`.story-item[data-scene="${scene}"][data-position="${position}"]`);
  if (!storyItem) return;
  storyItem.classList.add('revealed');
  storyItem.style.backgroundImage = `url(${storyImages[itemType]})`;
  createSparkleEffect(storyItem);
}

function loadStoryScenario() {
  if (storyIndex >= storyScenarios.length) { showGameComplete(); return; }
  const scenario = storyScenarios[storyIndex];
  setInstruction(scenario.text);
  currentAudioText = scenario.text;
  document.getElementById('story-text-display').textContent = scenario.text;
  loadStoryOptions(scenario);
  speakText(scenario.text);
}

function loadStoryOptions(scenario) {
  const container = document.getElementById('story-options');
  container.innerHTML = '';
  scenario.items.forEach(itemKey => {
    const opt = document.createElement('div');
    opt.className = 'story-option';
    opt.style.backgroundImage = `url(${storyImages[itemKey]})`;
    opt.onclick = () => selectStoryItem(itemKey, scenario.correctItem, opt, scenario);
    container.appendChild(opt);
  });
}

function selectStoryItem(selected, correct, el, scenario) {
  const all = document.querySelectorAll('.story-option');
  all.forEach(o => o.style.pointerEvents = 'none');

  if (selected === correct) {
    el.classList.add('correct');
    revealStoryItem(scenario.scene, scenario.position, scenario.correctItem);
    const msg = buildStoryFeedback(true, scenario, selected);
    showExplanation(true, msg, () => {
      storyIndex++;
      if (storyIndex >= storyScenarios.length) showGameComplete();
      else loadStoryScenario();
    });
  } else {
    el.classList.add('wrong');
    const msg = buildStoryFeedback(false, scenario, selected);
    showExplanation(false, msg, () => {
      el.classList.remove('wrong');
      all.forEach(o => o.style.pointerEvents = 'auto');
    });
  }
}

function buildStoryFeedback(isCorrect, scenario, pickedKey) {
  const correctKey = scenario.correctItem;
  const info = STORY_FEEDBACK[correctKey];
  if (isCorrect) {
    const sceneNoun = scenario.scene === 'breakfast' ? 'breakfast'
                    : scenario.scene === 'dinner' ? 'dinner'
                    : scenario.scene === 'playing' ? 'play time'
                    : 'bedtime';
    return `Yes—${correctKey}! In ${sceneNoun}, this is the right choice. ${info.expl}`;
  } else {
    if (scenario.scene === 'breakfast') return `Not quite. Think about breakfast. We eat foods, like fruit or cereal, in the morning.`;
    if (scenario.scene === 'dinner') return `Not quite. Think about dinner. We eat food during dinner time.`;
    if (scenario.scene === 'playing') return `Not quite. Think about play time. We hold and play with toys or throw a ball.`;
    if (scenario.scene === 'bedtime') return `Not quite. Think about bedtime. We use a pillow and a blanket when we sleep.`;
    return `Not quite. Think again about what fits best here.`;
  }
}

/* ======== End Game ======== */
function showGameComplete() {
  // Hide all game sections
  document.getElementById('phase1').classList.add('hidden');
  document.getElementById('phase2').classList.remove('active');
  document.getElementById('story-section').classList.remove('active');
  document.getElementById('story-section').style.display = 'none';
  
  // Show level-up overlay
  const completeText = "Congratulations! You've completed the Family Tree and Day with My Family!";
  currentAudioText = completeText;
  speakText(completeText);
  
  // Launch fireworks
  setTimeout(() => launchFireworks(window.innerWidth / 2, window.innerHeight / 2), 200);
  setTimeout(() => launchFireworks(window.innerWidth / 3, window.innerHeight / 2), 500);
  setTimeout(() => launchFireworks(window.innerWidth * 0.7, window.innerHeight / 2), 800);
  
  // Show the level-up overlay
  showLevelUpOverlay();
}

function launchFireworks(x, y) {
  for (let i = 0; i < 15; i++) {
    const fw = document.createElement("div");
    fw.className = "firework";
    fw.style.left = x + "px"; fw.style.top = y + "px";
    fw.style.background = ["#ff4757", "#1e90ff", "#2ed573", "#ffa502", "#eccc68"][Math.floor(Math.random() * 5)];
    fw.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(fw);
    setTimeout(() => fw.remove(), 1200);
  }
}

/* ======== Misc ======== */
function nextStep() {
  if (!inStoryMode) startStoryMode();
  else {
    storyIndex++;
    if (storyIndex >= storyScenarios.length) showGameComplete();
    else loadStoryScenario();
  }
}

/* ======== Hints ======== */
function playHint() {
  if (inStoryMode) {
    const scenario = storyScenarios[storyIndex];
    speakText(`Look for the ${scenario.correctItem}. Think about what we use during ${scenario.scene}.`);
  } else {
    const round = gameRounds[currentRound];
    const scenario = round.scenarios[currentScenario];
    const member = scenario.familyMember;
    const hints = {
      mother: "Look for the woman who takes care of the family.",
      father: "Look for the man who is a parent.",
      brother: "Look for the boy in the family.",
      sister: "Look for the girl in the family.",
      grandmother: "Look for the older woman in the family.",
      grandfather: "Look for the older man in the family."
    };
    speakText(hints[member] || "Look carefully at the pictures.");
  }
}

/* ======== Boot ======== */
window.addEventListener('load', () => {
  document.getElementById('cover-screen').classList.remove('hidden');
});
function replayQuestion() {
  // Hide explanation modal if open
  const modal = document.getElementById('explanation-modal');
  if (modal) modal.classList.remove('show');

  stopAudio?.();

  // === Story Mode ===
  if (inStoryMode) {
    const s = storyScenarios[storyIndex];
    if (!s) return;

    // Reset visuals
    document.getElementById('story-text-display').textContent = s.text;

    const optionsContainer = document.getElementById('story-options');
    optionsContainer.innerHTML = '';

    s.items.forEach(itemKey => {
      const opt = document.createElement('div');
      opt.className = 'story-option';
      opt.style.backgroundImage = `url(${storyImages[itemKey]})`;
      opt.onclick = () => selectStoryItem(itemKey, s.correctItem, opt, s);
      optionsContainer.appendChild(opt);
    });

    setInstruction(s.text);
    return;
  }

  // === MCQ Mode ===
  const round = gameRounds[currentRound];
  const s = round?.scenarios[currentScenario];
  if (!s) return;

  // Reset MCQ question
  setInstruction("Choose the word that matches with the picture.");
  document.getElementById('mcq-question').textContent = s.text;

  const container = document.getElementById('word-options');
  container.innerHTML = '';

  s.mcqOptions.forEach(word => {
    const button = document.createElement('button');
    button.className = 'word-button';
    button.textContent = word;
    button.disabled = false;
    button.onclick = (e) => selectMCQWord(e, word, s);

    // Hover speak
    button.onmouseenter = () => {
      speakText(word);
    };

    container.appendChild(button);
  });
}

function showLevelUpOverlay() {
  const overlay = document.getElementById('level-up-overlay');
  overlay.style.display = 'flex';
  speakText("Level up! Congratulations! You completed the Family Tree and Day with My Family!");
  setTimeout(() => launchFireworks(window.innerWidth / 2, window.innerHeight / 2), 300);
}

