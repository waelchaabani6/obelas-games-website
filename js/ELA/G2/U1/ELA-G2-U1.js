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
     '../../../../images/card_back_ELA-G2-U1.webp',
  '../../../../images/parents.png',
  '../../../../images/freind.png',
  '../../../../images/kindness.png',
  '../../../../images/honesty.png',
  '../../../../images/doctor.png',
  '../../../../images/police.png',
  '../../../../images/parents.png',
  '../../../../images/grandparent.png',
  '../../../../images/teacher.png',
  '../../../../images/firefighter.png',
  '../../../../images/scientist.png',
  '../../../../images/someone_else.png',
  '../../../../images/vocab_board_game.png',
  '../../../../images/levelup.png'
];

const audioPaths = [
  '../../../../audio/kids-game-gaming-background-music-295075.mp3',
  '../../../../audio/G2U1HowToPlay.mp3',
'../../../../audio/G2U1HowToChoose.mp3',

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
let selectedExplanation = '';

// Complete Game Levels Data
const gameLevels = [
    // ========== RHYMING LEVELS ==========


     // Level 1
    {
        type: 'vocab-matching',
        question: 'What makes the people in your life important?',
        hint: 'Think about the person who teaches you things at home and takes care of you and The person who likes to play with you and makes you feel better when you’re sad', 
       pairs: [
        { front: '../../../../images/parents.png', back: 'Helps you learn and grow', group: 'Parent' },
        { front: '../../../../images/freind.png',  back: 'Plays with you and supports you', group: 'Friend' }, 

    ],
    explanation: 'Great job! A parent helps you learn new things and grow every day. “A friend plays with you and supports you when you need help',
        },
        // Level 2
    {
        type: 'vocab-matching',
        question: 'What makes the people in your life important?',
        hint: 'Think about the person who helps you learn at school. and The person who is older and loves to tell helpful storie', 
       pairs: [
        { front: '../../../../images/teacher.png', back: 'Helps you understand new ideas', group: 'Teacher' },
        { front: '../../../../images/grandparent.png',  back: 'Shares wisdom and teaches life lessons', group: 'Grandparent' }, 

    ],
    explanation: 'Great job! “A teacher helps you understand new ideas and learn new things “A grandparent shares wisdom and teaches you important life lessons',
        },
 
    // Level 3
    {
        type: 'vocab-matching',
        question: 'What makes the people in your life important?',
        hint: 'This means being gentle and helping others, and the other one is the trait is about being truthful',
       pairs: [
        { front: '../../../../images/kindness.png',  back: 'Helping someone who needs it', group: 'Kindness' }, 
        { front: '../../../../images/honesty.png', back: 'Telling the truth', group: 'Honesty' },

    ],
    explanation: 'Great job! Kindness is helping someone who needs it.“Honesty means telling the truth!',
        },
     // Level 4
    {
        type: 'vocab-matching',
        question: 'What makes the people in your life important?',
        hint: 'Think about the person who helps others know what to do and The person who treating others the way you want to be treated.', 
       pairs: [
        { front: '../../../../images/leadership.png', back: 'Guiding others positively', group: 'Leadership' },
        { front: '../../../../images/respect.png',  back: 'Listening and taking turns', group: 'Respect' }, 

    ],
    explanation: 'Great job! Leadership means guiding others in a good way.And Respect means listening and taking turns',
        },
     // Level 5
    {
        type: 'vocab-matching',
        question: 'What makes the people in your life important?',
        hint: 'This person helps everyone follow the rules., and the other one helps you when you feel sick',
       pairs: [
        { front: '../../../../images/doctor.png',  back: 'Helps people stay healthy', group: 'Doctor' }, 
        { front: '../../../../images/police.png', back: 'Keeps people safe', group: 'Police Officer' },

    ],
    explanation: 'Great job! A police officer keeps people safe.And A doctor helps people stay healthy and feel better!',
        },
     // Level 6
    {
        type: 'vocab-matching',
        question: 'What makes the people in your life important?',
        hint: 'Think about the person who wears special gear and helps during fires and The person who plants crops or takes care of animals.', 
       pairs: [
        { front: '../../../../images/farmer.png', back: 'Grows food for the community', group: 'Farmer' },
        { front: '../../../../images/firefighter.png',  back: 'Puts out fires and rescues people', group: 'Firefighter' }, 

    ],
    explanation: 'Great job! A firefighter puts out fires and rescues people. And A farmer grows the food we eat',
        },

    // End Levels
   {
        type: 'selection',
       question: 'Who Is Your Role Model?',
        hint: 'Look at the pictures. Choose the person who inspires you. If none of them are your role model, choose "Someone else."',
        pairs: [
            { word: 'Parent', image: '../../../../images/parents.png', explanation: 'Parents inspire us by helping us grow.' },
            { word: 'Grandparent', image: '../../../../images/grandparent.png', explanation: 'Grandparents inspire us with wisdom and love.' },
            { word: 'Teacher', image: '../../../../images/teacher.png', explanation: 'Teachers inspire us by helping us learn new ideas.' },
            { word: 'Doctor', image: '../../../../images/doctor.png', explanation: 'Doctors inspire us by caring for others.' },
            { word: 'Firefighter', image: '../../../../images/firefighter.png', explanation: 'Firefighters inspire us with bravery.' },
            { word: 'Police Officer', image: '../../../../images/police.png', explanation: 'Police officers inspire us by keeping people safe.' },
            { word: 'Scientist', image: '../../../../images/scientist.png', explanation: 'Scientists inspire us to explore and discover.' },
            { word: 'Someone else', image: '../../../../images/someone_else.png', explanation: 'Everyone has someone special. You can choose anyone who inspires you.' },
        ],
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
  updateHowToPlayButton(); 
}



function loadLevel() {
    stopSpeech();
    const level = gameLevels[currentLevel];
    // document.getElementById('level-number').textContent = currentLevel + 1;
    questionText.textContent = level.question;

    matchesFound = 0;
    flippedCards = [];
    canFlip = true;
    selectedExplanation = '';

    if (level.type === 'selection') {
        loadSelectionLevel(level);
    } else if (level.type === 'matching') {
        loadMatchingLevel(level);
    } else if (level.type === 'vocab-matching') {
        loadVocabMatchingLevel(level);
    } else {
        loadVocabularyLevel(level);
    }


    // Speak the question
    setTimeout(() => playQuestion(), 500);
    updateHowToPlayButton();  
}
// Show "?" button only on the selection level (role model picker)
function updateHowToPlayButton() {
    const button = document.querySelector('.how-to-play-game-btn');
    if (!button) return;

    const isSelectionLevel = gameLevels[currentLevel]?.type === 'selection';

    if (isSelectionLevel) {
        button.style.display = 'block';  // or 'flex' if using flexbox
    } else {
        button.style.display = 'none';
    }
}
function loadSelectionLevel(level) {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
    grid.className = 'cards-grid';

    document.getElementById('total-matches').textContent = '1'; // Since it's select one
    document.getElementById('matches-found').textContent = '0';

    // Shuffle cards
    const shuffled = level.pairs.sort(() => Math.random() - 0.5);

    shuffled.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card flipped'; // Start flipped (shown)
        cardEl.dataset.word = card.word;
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

        cardEl.addEventListener('click', () => selectCard(cardEl, card));
        grid.appendChild(cardEl);
    });

    // Set grid template
    const totalCards = shuffled.length;
    let cols = 2; // Default for 5 cards; adjust if needed
    if (totalCards <= 4) cols = 2;
    else if (totalCards <= 6) cols = 3;
    else cols = 4;
    const rows = Math.ceil(totalCards / cols);
    grid.style.gridTemplateColumns = `repeat(${cols}, 180px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 220px)`;
    grid.style.justifyContent = 'center';
}

function selectCard(cardEl, cardData) {
    if (!canFlip || cardEl.classList.contains('matched')) return;

    // Highlight as selected
    cardEl.classList.add('matched');
    matchesFound = 1;
    document.getElementById('matches-found').textContent = matchesFound;

    // Speak the selected word
    speak(cardData.word);

    // Set the specific explanation
    selectedExplanation = cardData.explanation;
    // Play celebration
    playApplause();
    showFireworks();

    // Disable further clicks
    canFlip = false;

    // Show explanation after delay
    setTimeout(() => showExplanation(), 1500);
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
    const totalCards = shuffled.length;
    let cols = 2;
    if (totalCards <= 4) cols = 2;
    else if (totalCards <= 6) cols = 3;
    else cols = 4; 
    const rows = Math.ceil(totalCards / cols);
    grid.style.gridTemplateColumns = `repeat(${cols}, 180px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 220px)`;
    grid.style.justifyContent = 'center'; 
}


function loadVocabMatchingLevel(level) {
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '';
    grid.className = 'cards-grid';

    document.getElementById('total-matches').textContent = level.pairs.length;
    document.getElementById('matches-found').textContent = '0';

    // Duplicate and shuffle cards (image + word)
    const allCards = [];
    level.pairs.forEach(pair => {
        allCards.push({ type: 'image', content: pair.front, group: pair.group });
        allCards.push({ type: 'word', content: pair.back, group: pair.group });
    });

    const shuffled = allCards.sort(() => Math.random() - 0.5);

    // Dynamic grid: 
    const totalCards = allCards.length;
    let cols = 4;
    if (totalCards <= 4) cols = 2;
    else if (totalCards <= 6) cols = 3;
    const rows = Math.ceil(totalCards / cols);
    grid.style.gridTemplateColumns = `repeat(${cols}, 180px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 220px)`;

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
                  ? `<img src="${item.content}" alt="${item.group}">
                     <div class="card-word">${item.group}</div>`
                  : `<div class="card-word">${item.content}</div>`}
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
    const modal = explanationModal;
    const text = document.getElementById('explanation-text');
   let expText;
    if (level.type === 'selection') {
        expText = selectedExplanation;
    } else {
        expText = level.explanation;
    }

    text.textContent = expText.charAt(0).toUpperCase() + expText.slice(1);
    modal.classList.add('show');

    speak(expText);
}


function closeExplanation() {
    explanationModal.classList.remove('show');
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
    gameContainer.style.display = 'none';

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
        <a href='../../../../html/ELA/G2/ELA-G2-UnitMap.html' class="levelup-btn-top back-map" aria-label="Back to Unit Map">🏠 Back</a>
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
    const expModal = explanationModal;
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
    const container = gameContainer;
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
    gameContainer.classList.add('hidden');


}

function showHowToPlayselection() {
  stopSpeech();
  document.getElementById("instructions-selection-game-modal").classList.add("active");
  replayInstructionshowtochoosegame();
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
  // Always play the How-To audio, not the welcome
  stopSpeech();
   const level = gameLevels[currentLevel];
if (level.type === 'selection') {
      speak("How to Choose");
 document.getElementById('instructions-selection-game-modal').classList.remove('active');
    }else{
  speak("How to Play");

    }
}

function closeInstructions() {
 stopSpeech();
 instructionsModal.classList.remove('active');
     const level = gameLevels[currentLevel];
if (level.type === 'selection') {
 document.getElementById('instructions-selection-game-modal').classList.remove('active');
    }
 
}



// ========== AUDIO FUNCTIONS ==========

// ========== CUSTOM AUDIO SPEAK FUNCTION (No Browser Voice) ==========

// Replaces browser speech synthesis with pre-recorded audio playback
// ======= UPDATED SPEAK FUNCTION WITH FULL COVERAGE =======

function speak(text) {
    stopSpeech();

    const audioMap = {
        "welcome-message": "../../../../audio/G2U1covergame.mp3",
        "How to Play": "../../../../audio/K2U1HowToPlay.mp3",
        "How to Choose": "../../../../audio/G2U1HowToChoose.mp3",

        // ===== RHYMING LEVELS =====
        "Match the rhyming words that end with the same sound!": "../../../../audio/K2-U1-1.mp3",

        "Listen for words that sound the same at the end": "../../../../audio/K2-U1-1-Hint.mp3",
        "Match each person to how they help you!": "../../../../audio/K2-U1-1-Hint.mp3",

        "Great job! CAT and HAT rhyme because they end with the same -AT sound! MAP and CAP rhyme with the -AP sound!": "../../../../audio/K2-U1-1-Explanation.mp3",

        "Listen for the -AG and -ED sounds!": "../../../../audio/K2-U1-2-Hint.mp3",
        "Excellent! BAG and RAG rhyme with the -AG sound! RED and BED rhyme with the -ED sound!": "../../../../audio/K2-U1-2-Explanation.mp3",

        "Listen for the -AN and -OP sounds!": "../../../../audio/K2-U1-3-Hint.mp3",
        "Wonderful! MAN and VAN rhyme with the -AN sound! MOP and TOP rhyme with the -OP sound!": "../../../../audio/K2-U1-3-Explanation.mp3",
        "What makes the people in your life important?": "../../../../audio/G2-U1-1.mp3",
        "Who Is Your Role Model?": "../../../../audio/G2-U1-3.mp3",
        "Great job! A parent helps you learn new things and grow every day. “A friend plays with you and supports you when you need help": "../../../../audio/G2-U1-1-Explanation.mp3",
        "Great job! Kindness is helping someone who needs it.“Honesty means telling the truth!": "../../../../audio/G2-U1-3-Explanation.mp3",
       "Great job! A police officer keeps people safe.And A doctor helps people stay healthy and feel better!": "../../../../audio/G2-U1-5-Explanation.mp3",
       "Great job! “A teacher helps you understand new ideas and learn new things “A grandparent shares wisdom and teaches you important life lessons": "../../../../audio/G2-U1-2-Explanation.mp3",
        "Great job! Leadership means guiding others in a good way.And Respect means listening and taking turns": "../../../../audio/G2-U1-4-Explanation.mp3",
        "Great job! A firefighter puts out fires and rescues people. And A farmer grows the food we eat": "../../../../audio/G2-U1-6-Explanation.mp3",
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

        "Helps you learn and grow": "../../../../audio/parent-action.mp3",
        "Plays with you and supports you": "../../../../audio/freind-action.mp3",
        "Helping someone who needs it": "../../../../audio/kindness-action.mp3",
        "Telling the truth": "../../../../audio/honesty-action.mp3",
        "Helps people stay healthy": "../../../../audio/doctor-action.mp3",
        "Keeps people safe": "../../../../audio/policeofficer-action.mp3",
        "Helps you understand new ideas": "../../../../audio/teacher-action.mp3",
        "Shares wisdom and teaches life lessons": "../../../../audio/grandparent-action.mp3",
        "Guiding others positively": "../../../../audio/leadership-action.mp3",
        "Listening and taking turns": "../../../../audio/respect-action.mp3",
        "Grows food for the community": "../../../../audio/farmer-action.mp3",
        "Puts out fires and rescues people": "../../../../audio/firefighter-action.mp3",

        "Think about the person who teaches you things at home and takes care of you and The person who likes to play with you and makes you feel better when you’re sad": "../../../../audio/G2-U1-2.mp3",
        "This means being gentle and helping others, and the other one is the trait is about being truthful": "../../../../audio/G2-U1-Hint-3.mp3",
        "This person helps everyone follow the rules., and the other one helps you when you feel sick"     : "../../../../audio/G2-U1-Hint-5.mp3",
        "Think about the person who helps you learn at school. and The person who is older and loves to tell helpful storie": "../../../../audio/G2-U1-Hint-2.mp3",
        "Think about the person who helps others know what to do and The person who treating others the way you want to be treated." : "../../../../audio/G2-U1-Hint-4.mp3",
        "Think about the person who wears special gear and helps during fires and The person who plants crops or takes care of animals.": "../../../../audio/G2-U1-Hint-6.mp3",
        // ===== Selection LEVELS =====

       
        "Parents inspire us by helping us grow.": "../../../../audio/parent-explanation.mp3",
        "Grandparents inspire us with wisdom and love.": "../../../../audio/grandparent-explanation.mp3",
        "Teachers inspire us by helping us learn new ideas.": "../../../../audio/teacher-explanation.mp3",
        "Doctors inspire us by caring for others.": "../../../../audio/doctor-explanation.mp3",
        "Firefighters inspire us with bravery.": "../../../../audio/firefighter-explanation.mp3",
        "Police officers inspire us by keeping people safe.": "../../../../audio/police_officer-explanation.mp3",
        "Scientists inspire us to explore and discover.": "../../../../audio/scientist-explanation.mp3",
        "Everyone has someone special. You can choose anyone who inspires you.": "../../../../audio/someone_else-explanation.mp3",
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
        "Friend": "../../../../audio/friend.mp3",
        "Parent": "../../../../audio/parent.mp3",
         "Kindness": "../../../../audio/kindness.mp3",
        "Honesty": "../../../../audio/honesty.mp3",
        "Police Officer": "../../../../audio/police officer.mp3",
        "Doctor": "../../../../audio/doctor.mp3",
        "Grandparent": "../../../../audio/grandparent.mp3",
        "Teacher":"../../../../audio/teacher.mp3",
        "Firefighter":"../../../../audio/firefighter.mp3",
        "Scientist":"../../../../audio/scientist.mp3",
        "Someone else":"../../../../audio/someone_else.mp3",
        "Farmer": "../../../../audio/farmer.mp3",
        "Leadership": "../../../../audio/leadership.mp3",
        "Respect": "../../../../audio/respect.mp3",

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
    instructionsModal.classList.add('active');
}

function replayInstructions() {
    speak('How to Play');
    
    
}
function replayInstructionshowtochoosegame() {
    speak('How to Choose');
    
    
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
