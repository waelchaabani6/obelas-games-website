// DOM Elements
const gameContainer = document.getElementById('game-container');
const completionScreen = document.getElementById('completion-screen');
const instructionsModal = document.getElementById('instructions-modal');
const sceneContainer = document.getElementById('scene-container');
const questionText = document.getElementById('question-text');
const progressDisplay = document.getElementById('progress-display');
const musicControl = document.getElementById('music-control');
const explanationModal = document.getElementById('explanation-modal');
// === Loading Screen Setup ===
const imagePaths = [
     '../../../../images/card_back.webp',
  '../../../../images/rhyme_cat.png',
  '../../../../images/rhyme_hat.png',
  '../../../../images/rhyme_map.png',
  '../../../../images/rhyme_cap.png',
  '../../../../images/rhyme_bag.png',
  '../../../../images/rhyme_rag.png',
  '../../../../images/rhyme_red.png',
  '../../../../images/rhyme_bed.png',
  '../../../../images/rhyme_man.png',
  '../../../../images/rhyme_van.png',
  '../../../../images/rhyme_mop.png',
  '../../../../images/rhyme_top.png',
  '../../../../images/vocab_bakery.png',
  '../../../../images/vocab_garden.png',
  '../../../../images/market.png',
  '../../../../images/vocab_rug.png',
  '../../../../images/vocab_scarf.png',
  '../../../../images/wave.webp',
  '../../../../images/meet.png',
  '../../../../images/vocab_board_game.png',
  '../../../../images/vocab_rope.png',
  '../../../../images/vocab_soccer.png',
  '../../../../images/vocab_ice.png',
  '../../../../images/vocab_old.png',
  '../../../../images/vocab_bracelet.png',
  '../../../../images/vocab_doll.webp',
  '../../../../images/vocab_parade.png',
  '../../../../images/vocab_ice_skating.png',
  '../../../../images/vocab_money.png',
  '../../../../images/friend.webp',
  '../../../../images/levelup.png'
];

const audioPaths = [
  '../../../../audio/kids-game-gaming-background-music-295075.mp3',
  '../../../../audio/K2U1HowToPlay.mp3'
];

// ======== Optimized Preloader ========
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

  // 🔊 Play welcome message
  speak("welcome-message");
}, 400);

  });
}

window.addEventListener('load', preloadAssets);


// ========== KG2 Unit 1 - Complete Matching Card Game ==========
// All Rhyming and Vocabulary Activities from Lessons 1-3

// Game State
let currentLevel = 0; 
let matchesFound = 0;
let flippedCards = [];
let canFlip = true;
let currentSpeech = null;

// Complete Game Levels Data
const gameLevels = [
    // ========== RHYMING LEVELS ==========

    // Level 1
    {
        type: 'matching',
        question: 'Match the rhyming words that end with the same sound!',
        hint: 'Listen for words that sound the same at the end',
        pairs: [
            { word: 'CAT', image: '../../../../images/rhyme_cat.png', rhyme: 'at' },
            { word: 'HAT', image: '../../../../images/rhyme_hat.png', rhyme: 'at' },
            { word: 'MAP', image: '../../../../images/rhyme_map.png', rhyme: 'ap' },
            { word: 'CAP', image: '../../../../images/rhyme_cap.png', rhyme: 'ap' },
        ],
        explanation:
            'Great job! CAT and HAT rhyme because they end with the same -AT sound! MAP and CAP rhyme with the -AP sound!',
    },

    // Level 2
    {
        type: 'matching',
        question: 'Match the rhyming words that end with the same sound!',
        hint: 'Listen for the -AG and -ED sounds!',
        pairs: [
            { word: 'BAG', image: '../../../../images/rhyme_bag.png', rhyme: 'ag' },
            { word: 'RAG', image: '../../../../images/rhyme_rag.png', rhyme: 'ag' },
            { word: 'RED', image: '../../../../images/rhyme_red.png', rhyme: 'ed' },
            { word: 'BED', image: '../../../../images/rhyme_bed.png', rhyme: 'ed' },
        ],
        explanation:
            'Excellent! BAG and RAG rhyme with the -AG sound! RED and BED rhyme with the -ED sound!',
    },

    // Level 3
    {
        type: 'matching',
        question: 'Match the rhyming words that end with the same sound!',
        hint: 'Listen for the -AN and -OP sounds!',
        pairs: [
            { word: 'MAN', image: '../../../../images/rhyme_man.png', rhyme: 'an' },
            { word: 'VAN', image: '../../../../images/rhyme_van.png', rhyme: 'an' },
            { word: 'MOP', image: '../../../../images/rhyme_mop.png', rhyme: 'op' },
            { word: 'TOP', image: '../../../../images/rhyme_top.png', rhyme: 'op' },
        ],
        explanation:
            'Wonderful! MAN and VAN rhyme with the -AN sound! MOP and TOP rhyme with the -OP sound!',
    },

    // ========== VOCABULARY LEVELS (ALL FLIPPING) ==========

    // Level 4
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Which picture shows the bakery where yummy bread is baked, and which one shows the garden where flowers and veggies grow',
        pairs: [
            { front: '../../../../images/vocab_bakery.png', back: 'bakery', group: 'bakery' },
            { front: '../../../../images/vocab_garden.png', back: 'garden', group: 'garden' },
        ],
        explanation:
            'Great work! A bakery is where bread is made and a garden is where plants grow!',
    },

    // Level 5
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Find where we buy food and what’s on the floor.',
        pairs: [
            { front: '../../../../images/market.png', back: 'market', group: 'market' },
            { front: '../../../../images/vocab_rug.png', back: 'rug', group: 'rug' },
        ],
        explanation:
            'Excellent! A market is where we buy food, and a rug is soft carpet on the floor!',
    },

    // Level 6
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Find things we wear and how we greet friends.',
        pairs: [
            { front: '../../../../images/vocab_scarf.png', back: 'scarf', group: 'scarf' },
            { front: '../../../../images/wave.webp', back: 'wave', group: 'wave' },
        ],
        explanation:
            'Perfect! A scarf keeps us warm, and we wave to say hello!',
    },

    // Level 7
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Find what we do with friends and the games we play.',
        pairs: [
            { front: '../../../../images/meet.png', back: 'meet', group: 'meet' },
            { front: '../../../../images/vocab_board_game.png', back: 'board game', group: 'board game' },
        ],
        explanation:
            'Wonderful! We meet our friends and play fun board games together!',
    },

    // Level 8
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Find what we jump with and the sport with a ball.',
        pairs: [
            { front: '../../../../images/vocab_rope.png', back: 'rope', group: 'rope' },
            { front: '../../../../images/vocab_soccer.png', back: 'soccer', group: 'soccer' },
        ],
        explanation:
            'Great job! We jump with a rope and play soccer with a ball!',
    },

    // Level 9
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Find something cold and something old.',
        pairs: [
            { front: '../../../../images/vocab_ice.png', back: 'ice', group: 'ice' },
            { front: '../../../../images/vocab_old.png', back: 'old', group: 'old' },
        ],
        explanation:
            'Excellent! Ice is frozen water, and old means someone has lived many years!',
    },

    // Level 10
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Find jewelry we wear and toys we play with.',
        pairs: [
            { front: '../../../../images/vocab_bracelet.png', back: 'bracelet', group: 'bracelet' },
            { front: '../../../../images/vocab_doll.webp', back: 'doll', group: 'doll' },
        ],
        explanation:
            'Perfect! A bracelet is jewelry we wear, and a doll is a toy we play with!',
    },

    // Level 11
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'Find something we watch and a winter activity.',
        pairs: [
            { front: '../../../../images/vocab_parade.png', back: 'parade', group: 'parade' },
            { front: '../../../../images/vocab_ice_skating.png', back: 'ice skating', group: 'ice skating' },
        ],
        explanation:
            'Wonderful! We watch parades and go ice skating in winter!',
    },

    // Level 12
    {
        type: 'vocab-matching',
        question: 'Match each picture to the correct word!',
        hint: 'We use money to buy toys and treats and Which picture shows a friend you love to play with',
        pairs: [
            { front: '../../../../images/vocab_money.png', back: 'money', group: 'money' },
            { front: '../../../../images/friend.webp', back: 'friend', group: 'friend' },
        ],
       explanation:
    'Excellent! Money is what we use to buy things we need and want! Friends are the people we love to spend time and play with!',

    },
];


// ========== GAME FUNCTIONS ==========

function startGame() {
  // 🔇 Stop welcome message and any other audio, like K2 U2
  stopSpeech();
  document.querySelectorAll('audio').forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  coverScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  completionScreen.classList.add('hidden');

  // Only play if not muted
  if (!isMusicMuted && backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {});
  }

  loadLevel();
}



function loadLevel() {
    stopSpeech();
    const level = gameLevels[currentLevel];
    // document.getElementById('level-number').textContent = currentLevel + 1;
    document.getElementById('question-text').textContent = level.question;

    matchesFound = 0;
    flippedCards = [];
    canFlip = true;

    if (level.type === 'matching') {
        loadMatchingLevel(level);
    } else if (level.type === 'vocab-matching') {
        loadVocabMatchingLevel(level);
    } else {
        loadVocabularyLevel(level);
    }


    // Speak the question
    setTimeout(() => playQuestion(), 500);
}

function loadMatchingLevel(level) {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
    grid.className = 'cards-grid';

    document.getElementById('total-matches').textContent = '2';
    document.getElementById('matches-found').textContent = '0';

    // Shuffle cards
    const shuffled = level.pairs.sort(() => Math.random() - 0.5);

    shuffled.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.word = card.word;
        cardEl.dataset.rhyme = card.rhyme;
        cardEl.dataset.index = index;

        cardEl.innerHTML = `
            <div class="card-inner">
                <div class="card-back">
                    <div class="card-back-content">
                        <div class="card-back-icon">?</div>
                    </div>
                </div>
                <div class="card-front">
                    <img src="${card.image}" alt="${card.word}">
                    <div class="card-word">${card.word}</div>
                </div>
            </div>
        `;

        cardEl.addEventListener('click', () => flipCard(cardEl, card));
        grid.appendChild(cardEl);
    });
}
function loadVocabMatchingLevel(level) {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
    grid.className = 'cards-grid';

    document.getElementById('total-matches').textContent = level.pairs.length / 2;
    document.getElementById('matches-found').textContent = '0';

    // Duplicate and shuffle cards (image + word)
    const allCards = [];
    level.pairs.forEach(pair => {
        allCards.push({ type: 'image', content: pair.front, group: pair.group });
        allCards.push({ type: 'word', content: pair.back, group: pair.group });
    });

    const shuffled = allCards.sort(() => Math.random() - 0.5);

    shuffled.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.group = item.group;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-back">
                    <div class="card-back-icon">?</div>
                </div>
                <div class="card-front">
                    ${item.type === 'image'
                ? `<img src="${item.content}" alt="${item.group}">`
                : `<div class="card-word">${item.content.charAt(0).toUpperCase() + item.content.slice(1)}</div>`}
                </div>
            </div>
        `;

        card.addEventListener('click', () => flipVocabCard(card, item));
        grid.appendChild(card);
    });
}


function flipCard(cardEl, cardData) {
    if (!canFlip || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    cardEl.classList.add('flipped');
    flippedCards.push({ element: cardEl, data: cardData });

    // Speak the image's word name
    speak(cardData.word);

    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(() => checkMatch(), 300);
    }
}

function flipVocabCard(cardEl, cardData) {
    
    if (!canFlip || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    cardEl.classList.add('flipped');
    flippedCards.push({ element: cardEl, data: cardData });

    // Speak the word or image name
    speak(cardData.type === 'word' ? cardData.content : cardData.group);

    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(() => {
            const [card1, card2] = flippedCards;

            if (card1.data.group === card2.data.group && card1.data.type !== card2.data.type) {
                card1.element.classList.add('matched');
                card2.element.classList.add('matched');
                matchesFound++;
                document.getElementById('matches-found').textContent = matchesFound;
                playApplause();
                showFireworks();

                flippedCards = [];
                canFlip = true;

// --- Wait until all cards are flipped and matched before showing feedback ---
if (matchesFound === parseInt(document.getElementById('total-matches').textContent)) {
    const allCards = document.querySelectorAll('.card');
    const flippedCount = [...allCards].filter(c => c.classList.contains('flipped') || c.classList.contains('matched')).length;

    // Ensure all 4 cards (2 pairs) are visible before giving feedback
    if (flippedCount >= allCards.length) {
        setTimeout(() => showExplanation(), 1500);
    } else {
        // Wait until remaining cards are flipped
        const checkInterval = setInterval(() => {
            const nowFlipped = [...allCards].filter(c => c.classList.contains('flipped') || c.classList.contains('matched')).length;
            if (nowFlipped >= allCards.length) {
                clearInterval(checkInterval);
                setTimeout(() => showExplanation(), 800);
            }
        }, 300);
    }
}


            } else {
                card1.element.classList.add('wrong');
                card2.element.classList.add('wrong');
                setTimeout(() => {
                    card1.element.classList.remove('flipped', 'wrong');
                    card2.element.classList.remove('flipped', 'wrong');
                    flippedCards = [];
                    canFlip = true;
                }, 700);
            }
        }, 800);
    }
}



function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.data.rhyme === card2.data.rhyme) {
        // Match found!
        setTimeout(() => {
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            matchesFound++;
            document.getElementById('matches-found').textContent = matchesFound;

            // Play celebration
            playApplause();
            showFireworks();

            flippedCards = [];
            canFlip = true;

            // Check if level complete
            if (matchesFound === 2) {
                setTimeout(() => showExplanation(), 1500);
            }
        }, 800);
    } else {
        card1.element.classList.add('wrong');
        card2.element.classList.add('wrong');

        setTimeout(() => {
            card1.element.classList.remove('flipped', 'wrong');
            card2.element.classList.remove('flipped', 'wrong');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }


}

function loadVocabularyLevel(level) {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
    grid.className = 'vocabulary-grid';

    // Loop through each sentence (can be 1 or 2)
    level.sentences.forEach(sentence => {
        const vocabContainer = document.createElement('div');
        vocabContainer.className = 'vocabulary-container';

        // Image
        const imgEl = document.createElement('img');
        imgEl.src = sentence.image;
        imgEl.alt = sentence.answer;
        imgEl.className = 'vocabulary-image';
        vocabContainer.appendChild(imgEl);

        // Sentence and word bank area
        const contentEl = document.createElement('div');
        contentEl.className = 'vocabulary-content';

        // Sentence
        const sentenceEl = document.createElement('div');
        sentenceEl.className = 'vocabulary-sentence';
        sentenceEl.innerHTML = sentence.text.replace(
            sentence.blank,
            `<span class="drop-zone" data-answer="${sentence.answer}"></span>`
        );
        contentEl.appendChild(sentenceEl);

        // Word bank
        const wordBankEl = document.createElement('div');
        wordBankEl.className = 'word-bank';
        const shuffledOptions = sentence.options.sort(() => Math.random() - 0.5);
        shuffledOptions.forEach(option => {
            const wordEl = document.createElement('div');
            wordEl.className = 'word-option';
            wordEl.textContent = option;
            wordEl.draggable = true;
            wordEl.dataset.word = option;

            wordEl.addEventListener('dragstart', handleDragStart);
            wordEl.addEventListener('click', () => speak(option));
            wordBankEl.appendChild(wordEl);
        });

        contentEl.appendChild(wordBankEl);
        vocabContainer.appendChild(contentEl);
        grid.appendChild(vocabContainer);
    });

    // Set up all drop zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
    });
}


function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.word);
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove('drag-over');

    const word = e.dataTransfer.getData('text/plain');
    const correctAnswer = dropZone.dataset.answer;

    // Remove dragging state
    document.querySelectorAll('.word-option').forEach(w => w.classList.remove('dragging'));

    if (word === correctAnswer) {
        // Insert word correctly and keep drop-zone styling
        dropZone.innerHTML = `<span class="correct-word">${word}</span>`;
        dropZone.classList.add('correct');

        // Remove the word from the bank
        const wordEl = document.querySelector(`.word-option[data-word="${word}"]`);
        if (wordEl) wordEl.remove();

        // Celebrate
        playApplause();
        showFireworks();

        // Delay next step
        setTimeout(() => showExplanation(), 1500);
    } else {
        dropZone.classList.add('incorrect');
        setTimeout(() => {
            dropZone.classList.remove('incorrect');
        }, 1000);
    }
}


function showExplanation() {
    const level = gameLevels[currentLevel];
    const modal = document.getElementById('explanation-modal');
    const text = document.getElementById('explanation-text');

   text.textContent = level.explanation.charAt(0).toUpperCase() + level.explanation.slice(1);
    modal.classList.add('show');

    speak(level.explanation);
}


function closeExplanation() {
    document.getElementById('explanation-modal').classList.remove('show');
}

function nextLevel() {
    closeExplanation();

    if (currentLevel < gameLevels.length - 1) {
        currentLevel++;
        loadLevel();
    } else {
        showCompletion();
    }
}

function showCompletion() {
    stopApplause();
    stopSpeech();

    //  // bump and persist "level"
    //   const prev = parseInt(localStorage.getItem(LEVEL_STORAGE_KEY) || '0', 10);
    //   const nextLevel = prev + 1;
    //   localStorage.setItem(LEVEL_STORAGE_KEY, String(nextLevel));

    // Hide game area and create full-page level up screen
    document.getElementById('game-container').style.display = 'none';

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
        <a href='../../../../html/ELA/K2/ELA-K2-UnitMap.html' class="levelup-btn-top back-map" aria-label="Back to Unit Map">🏠 Back</a>
      </div>
    </div>
  `;

    // Add overlay to body
    document.body.appendChild(overlay);



    // Hide topbar
    const topbar = document.querySelector('.topbar');
    if (topbar) topbar.style.display = 'none';

    // Play celebration sound
    speak('Congratulations! You completed all levels!');
    playApplause();

    // Optional: Fireworks animation
    showFireworks();
}
function restartGame() {
    // Stop any sounds
    stopApplause();
    stopSpeech();

    // Remove the completion overlay if present
    const overlay = document.getElementById('levelup-overlay');
    if (overlay) overlay.remove();

    // Make sure topbar is visible again
    const topbar = document.querySelector('.topbar');
    if (topbar) topbar.style.display = '';

    // Close any open modals (explanation / level completion)
    const expModal = document.getElementById('explanation-modal');
    if (expModal) expModal.classList.remove('show');
    const levelDone = document.getElementById('level-completion-modal');
    if (levelDone) levelDone.classList.remove('show');

    // Reset game state
    currentLevel = 0;
    matchesFound = 0;
    flippedCards = [];
    canFlip = true;

    // Show the game, hide the cover
    const cover = document.getElementById('cover-screen');
    const container = document.getElementById('game-container');
    if (cover) cover.classList.add('hidden');
    if (container) {
        container.classList.remove('hidden');
        container.style.display = 'block';
    }

    // Load level 1 fresh
    loadLevel();
}

function backToHome() {
    stopApplause();
    stopSpeech();
    document.getElementById('cover-screen').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');


}

function showHowToPlay() {
  // When user presses "How to Play" on cover
  stopSpeech();
  document.getElementById("instructions-modal").classList.add("active");
  replayInstructions();
}

function showInstructions() {
  // If some other button calls this name, route to same behavior
  showHowToPlay();
}

function replayInstructions() {
  // Always play the How-To audio, not the welcome
  stopSpeech();
  speak("How to Play");
}

function closeInstructions() {
 stopSpeech();
 document.getElementById('instructions-modal').classList.remove('active');
}



// ========== AUDIO FUNCTIONS ==========

// ========== CUSTOM AUDIO SPEAK FUNCTION (No Browser Voice) ==========

// Replaces browser speech synthesis with pre-recorded audio playback
// ======= UPDATED SPEAK FUNCTION WITH FULL COVERAGE =======

function speak(text) {
    stopSpeech();

    const audioMap = {
        "welcome-message": "../../../../audio/K2U1covergame.mp3",
      "How to Play": "../../../../audio/K2U1HowToPlay.mp3",
        // ===== RHYMING LEVELS =====
        "Match the rhyming words that end with the same sound!": "../../../../audio/K2-U1-1.mp3",

        "Listen for words that sound the same at the end": "../../../../audio/K2-U1-1-Hint.mp3",
        "Great job! CAT and HAT rhyme because they end with the same -AT sound! MAP and CAP rhyme with the -AP sound!": "../../../../audio/K2-U1-1-Explanation.mp3",

        "Listen for the -AG and -ED sounds!": "../../../../audio/K2-U1-2-Hint.mp3",
        "Excellent! BAG and RAG rhyme with the -AG sound! RED and BED rhyme with the -ED sound!": "../../../../audio/K2-U1-2-Explanation.mp3",

        "Listen for the -AN and -OP sounds!": "../../../../audio/K2-U1-3-Hint.mp3",
        "Wonderful! MAN and VAN rhyme with the -AN sound! MOP and TOP rhyme with the -OP sound!": "../../../../audio/K2-U1-3-Explanation.mp3",

        // ===== VOCABULARY LEVELS =====
        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
     "Which picture shows the bakery where yummy bread is baked, and which one shows the garden where flowers and veggies grow": "../../../../audio/K2-U1-4-Hint.mp3",
        "Great work! A bakery is where bread is made and a garden is where plants grow!": "../../../../audio/K2-U1-4-Explanation.mp3",

        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
        "Find where we buy food and what’s on the floor.": "../../../../audio/K2-U1-5-Hint.mp3",
        "Excellent! A market is where we buy food, and a rug is soft carpet on the floor!": "../../../../audio/K2-U1-5-Explanation.mp3",

        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
        "Find things we wear and how we greet friends.": "../../../../audio/K2-U1-6-Hint.mp3",
        "Perfect! A scarf keeps us warm, and we wave to say hello!": "../../../../audio/K2-U1-6-Explanation.mp3",

        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
        "Find what we do with friends and the games we play.": "../../../../audio/K2-U1-7-Hint.mp3",
        "Wonderful! We meet our friends and play fun board games together!": "../../../../audio/K2-U1-7-Explanation.mp3",

        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
        "Find what we jump with and the sport with a ball.": "../../../../audio/K2-U1-8-Hint.mp3",
        "Great job! We jump with a rope and play soccer with a ball!": "../../../../audio/K2-U1-8-Explanation.mp3",

        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
        "Find something cold and something old.": "../../../../audio/K2-U1-9-Hint.mp3",
        "Excellent! Ice is frozen water, and old means someone has lived many years!": "../../../../audio/K2-U1-9-Explanation.mp3",

        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
        "Find jewelry we wear and toys we play with.": "../../../../audio/K2-U1-10-Hint.mp3",
        "Perfect! A bracelet is jewelry we wear, and a doll is a toy we play with!": "../../../../audio/K2-U1-10-Explanation.mp3",

        "Match each picture to the correct word!": "../../../../audio/K2-U1-2.mp3",
        "Find something we watch and a winter activity.": "../../../../audio/K2-U1-11-Hint.mp3",
        "Wonderful! We watch parades and go ice skating in winter!": "../../../../audio/K2-U1-11-Explanation.mp3",

        "We use money to buy toys and treats and Which picture shows a friend you love to play with": "../../../../audio/K2-U1-12-Hint.mp3",
        "Excellent! Money is what we use to buy things we need and want! Friends are the people we love to spend time and play with!": "../../../../audio/K2-U1-12-Explanation.mp3",

        // ===== INDIVIDUAL VOCAB WORDS =====
        "cat": "../../../../audio/catK2U1.mp3",
        "hat": "../../../../audio/hat.mp3",
        "map": "../../../../audio/map.mp3",
        "cap": "../../../../audio/cap.mp3",
        "bag": "../../../../audio/bag.mp3",
        "rag": "../../../../audio/rag.mp3",
        "red": "../../../../audio/red.mp3",
        "bed": "../../../../audio/bed.mp3",
        "man": "../../../../audio/man.mp3",
        "van": "../../../../audio/van.mp3",
        "mop": "../../../../audio/mop.mp3",
        "top": "../../../../audio/top.mp3",
        "bakery": "../../../../audio/bakery.mp3",
        "garden": "../../../../audio/garden.mp3",
        "market": "../../../../audio/market.mp3",
        "rug": "../../../../audio/rug.mp3",
        "scarf": "../../../../audio/scarf.mp3",
        "wave": "../../../../audio/wave.mp3",
        "meet": "../../../../audio/meet.mp3",
        "board game": "../../../../audio/board-game.mp3",
        "rope": "../../../../audio/rope.mp3",
        "soccer": "../../../../audio/soccer.mp3",
        "ice": "../../../../audio/ice.mp3",
        "old": "../../../../audio/old.mp3",
        "bracelet": "../../../../audio/bracelet.mp3",
        "doll": "../../../../audio/doll.mp3",
        "parade": "../../../../audio/parade.mp3",
        "ice skating": "../../../../audio/ice-skating.mp3",
        "money": "../../../../audio/money.mp3",
        "friend": "../../../../audio/friend.mp3",
    };

    const normalized = text.trim().toLowerCase();
    const matchedKey = Object.keys(audioMap).find(k => k.toLowerCase() === normalized);
    const audioFile = matchedKey ? audioMap[matchedKey] : null;

    if (audioFile) {
        // 🔑 Use window.currentSpeech so stopSpeech can see it
        window.currentSpeech = new Audio(audioFile);
        window.currentSpeech.volume = 1.0;
        window.currentSpeech.play().catch((err) =>
            console.warn("Audio playback failed for:", text, err)
        );
    } else {
        console.warn("⚠️ No matching audio found for text:", text);
    }
}


function stopSpeech() {
  if (window.currentSpeech) {
    window.currentSpeech.pause();
    window.currentSpeech.currentTime = 0;
  }
}

function playQuestion() {
    const level = gameLevels[currentLevel];
    speak(level.question);
}

function playHint() {
    const level = gameLevels[currentLevel];
    speak(level.hint);
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

function playApplause(maxMs = 1500) {          // default: 1 second
    const a = ensureApplause();
    try {
        if (applauseTimer) clearTimeout(applauseTimer);
        a.currentTime = 0;
        a.play().catch(() => { });
        applauseTimer = setTimeout(stopApplause, maxMs);
    } catch (e) { }
}

function stopApplause() {
    try {
        if (applauseTimer) { clearTimeout(applauseTimer); applauseTimer = null; }
        if (applauseEl) { applauseEl.pause(); applauseEl.currentTime = 0; }
    } catch (e) { }
}

// ========== FIREWORKS ==========

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


// ========== INSTRUCTIONS MODAL ==========

function showInstructions() {
    document.getElementById('instructions-modal').classList.add('active');
}

function replayInstructions() {
    speak('How to Play');
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


// NEW: Show level completion screen with Home and Replay buttons
function showLevelCompletion() {
    const modal = document.getElementById('level-completion-modal');
    const levelNum = document.getElementById('completion-level-number');

    levelNum.textContent = currentLevel + 1;
    modal.classList.add('show');

    speak('Level completed! Great job!');
}

function closeLevelCompletion() {
    document.getElementById('level-completion-modal').classList.remove('show');
}

function replayLevel() {
    closeLevelCompletion();
    loadLevel();
}

function goHomeFromLevel() {
    closeLevelCompletion();
    backToHome();
}


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
