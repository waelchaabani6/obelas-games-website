// ELA-K Unit 2: Families
// KG1 Game Mechanics Implementation

// Unit 2 Lesson Data
const unit2Data = {
    title: "Unit 2: Families",
    theme: "How do family members help each other?",
    lessons: [
        {
            id: 1,
            title: "Finding Mom's Ring",
            question: "How do you help others find something?",
            description: "Learn how family members help each other find lost things",
            vocabulary: ["mom", "ring", "smile"],
            activities: [
                {
                    id: "2a",
                    title: "Letter Recognition",
                    description: "Find the letters in family words",
                    mechanic: "Target Practice",
                    skill: "Letter recognition"
                },
                {
                    id: "2b", 
                    title: "Initial Sounds",
                    description: "Match sounds to family words",
                    mechanic: "Floating Objects",
                    skill: "Initial sounds"
                },
                {
                    id: "2c",
                    title: "Rhyming Fun",
                    description: "Find words that rhyme with family words",
                    mechanic: "Board Game",
                    skill: "Rhyming"
                },
                {
                    id: "2d",
                    title: "Two-Syllable Words",
                    description: "Sort family words by syllables",
                    mechanic: "Shopping Cart",
                    skill: "Two-syllable words"
                }
            ]
        },
        {
            id: 2,
            title: "Big Sisters",
            question: "How can big sisters or big brothers help you?",
            description: "Explore how siblings help each other",
            vocabulary: ["clean", "messy", "outside"],
            activities: [
                {
                    id: "2e",
                    title: "Sibling Words Letters",
                    description: "Target letters in sibling words",
                    mechanic: "Target Practice",
                    skill: "Letter recognition"
                },
                {
                    id: "2f",
                    title: "Sibling Sounds",
                    description: "Catch the first sounds of sibling words",
                    mechanic: "Floating Objects", 
                    skill: "Initial sounds"
                },
                {
                    id: "2g",
                    title: "Sibling Rhymes",
                    description: "Move through rhyming sibling words",
                    mechanic: "Board Game",
                    skill: "Rhyming"
                },
                {
                    id: "2h",
                    title: "Sibling Word Syllables",
                    description: "Shop for two-syllable sibling words",
                    mechanic: "Shopping Cart",
                    skill: "Two-syllable words"
                }
            ]
        },
        {
            id: 3,
            title: "Happy Families",
            question: "What do families do together?",
            description: "Discover activities that families enjoy together",
            vocabulary: ["dinner", "trip", "win"],
            activities: [
                {
                    id: "2i",
                    title: "Family Activity Letters",
                    description: "Aim for letters in family activity words",
                    mechanic: "Target Practice",
                    skill: "Letter recognition"
                },
                {
                    id: "2j",
                    title: "Family Activity Sounds",
                    description: "Grab floating family activity sounds",
                    mechanic: "Floating Objects",
                    skill: "Initial sounds"
                },
                {
                    id: "2k",
                    title: "Family Activity Rhymes",
                    description: "Navigate rhyming family activity words",
                    mechanic: "Board Game", 
                    skill: "Rhyming"
                },
                {
                    id: "2l",
                    title: "Family Activity Syllables",
                    description: "Collect two-syllable family activity words",
                    mechanic: "Shopping Cart",
                    skill: "Two-syllable words"
                }
            ]
        }
    ]
};

// Game Content Database
const gameContent = {
    // Lesson 1: Finding Mom's Ring
    "2a": { // Target Practice - Letter Recognition
        questions: [
            {
                question: "Shoot the letter 'M' to start the word 'MOM'",
                image: "../../../../../images/mom.png",
                targets: ["L", "N", "B", "M", "K", "P"],
                correct: "M",
                explanation: "'M' is the first letter in MOM. Moms are special family members!"
            },
            {
                question: "Hit the letter 'R' to start the word 'RING'", 
                image: "../../../../../images/ring.png",
                targets: ["R", "F", "L", "U", "T", "S"],
                correct: "R",
                explanation: "'R' starts RING. We help find lost rings!"
            },
            {
                question: "Target the letter 'S' to start the word 'SMILE'",
                 image: "../../../../../images/smile.png",
                targets: ["T", "G", "N", "S", "W", "D"],
                correct: "S", 
                explanation: "'S' begins SMILE. We smile when we help family!"
            }
        ]
    },
    "2b": { // Floating Objects - Initial Sounds
        questions: [
            {
                question: "Catch the words that start with the /m/ sound like 'mom'",
                floatingWords: ["map", "cat", "milk", "frog", "mouse", "hat"],
                correct: ["map", "milk", "mouse"],
                explanation: "Map, milk, and mouse all start with the /m/ sound like mom!"
            },
            {
                question: "Grab the words that start with /r/ like 'ring'",
                floatingWords: ["run", "big", "red", "jump", "rock", "fish"],
                correct: ["run", "red", "rock"],
                explanation: "Run, red, and rock all start with /r/ like ring!"
            },
            {
                question: "Collect words that start with /s/ like 'smile'",
                floatingWords: ["sun", "car", "sit", "ball", "sock", "tree"],
                correct: ["sun", "sit", "sock"],
                explanation: "Sun, sit, and sock all start with /s/ like smile!"
            }
        ]
    },
    "2c": { // Board Game - Rhyming
        questions: [
            {
                question: "Move to words that rhyme with 'mom'",
                boardSpaces: ["Tom", "cat", "bomb", "hat", "calm", "run"],
                correct: ["Tom", "bomb", "calm"],
                explanation: "Tom, bomb, and calm all rhyme with mom!"
            },
            {
                question: "Find spaces with words that rhyme with 'ring'",
                boardSpaces: ["sing", "car", "king", "big", "wing", "jump"],
                correct: ["sing", "king", "wing"],
                explanation: "Sing, king, and wing all rhyme with ring!"
            },
            {
                question: "Land on words that rhyme with 'smile'",
                boardSpaces: ["mile", "fish", "pile", "tree", "while", "cat"],
                correct: ["mile", "pile", "while"],
                explanation: "Mile, pile, and while all rhyme with smile!"
            }
        ]
    },
    "2d": { // Shopping Cart - Two-syllable words
        questions: [
            {
                question: "Shop for two-syllable family words",
                items: ["mom", "father", "dad", "mother", "son", "sister"],
                correct: ["father", "mother", "sister"],
                explanation: "Father, mother, and sister all have two syllables!"
            },
            {
                question: "Find two-syllable helping words",
                items: ["help", "finding", "look", "searching", "see", "looking"],
                correct: ["finding", "searching", "looking"],
                explanation: "Finding, searching, and looking all have two syllables!"
            },
            {
                question: "Collect two-syllable feeling words",
                items: ["sad", "happy", "mad", "excited", "glad", "worried"],
                correct: ["happy", "excited", "worried"],
                explanation: "Happy, excited, and worried all have two syllables!"
            }
        ]
    },

    // Lesson 2: Big Sisters
    "2e": { // Target Practice - Letter Recognition
        questions: [
            {
                question: "Shoot the letter 'C' to start the word 'CLEAN'",
                 image: "../../../../../images/clean.png",
                targets: ["D", "G", "B", "C", "K", "P"],
                correct: "C",
                explanation: "'C' starts CLEAN. Big sisters help keep things clean!"
            },
            {
                question: "Hit the letter 'M' to start the word 'MESSY'",
                 image: "../../../../../images/messy.png",
                targets: ["N", "F", "L", "M", "R", "T"],
                correct: "M",
                explanation: "'M' begins MESSY. Sometimes things get messy!"
            },
            {
                question: "Target the letter 'O' to start the word 'OUTSIDE'",
                 image: "../../../../../images/outside.png",
                targets: ["O", "D", "G", "S", "H", "J"],
                correct: "O",
                explanation: "'O' starts OUTSIDE. We play outside together!"
            }
        ]
    },
    "2f": { // Floating Objects - Initial Sounds
        questions: [
            {
                question: "Catch words that start with /c/ like 'clean'",
                floatingWords: ["cat", "pen", "car", "fish", "cup", "ball"],
                correct: ["cat", "car", "cup"],
                explanation: "Cat, car, and cup all start with /c/ like clean!"
            },
            {
                question: "Grab words that start with /m/ like 'messy'",
                floatingWords: ["map", "big", "milk", "jump", "mouse", "hat"],
                correct: ["map", "milk", "mouse"],
                explanation: "Map, milk, and mouse all start with /m/ like messy!"
            },
            {
                question: "Collect words that start with /o/ like 'outside'",
                floatingWords: ["owl", "car", "ox", "run", "octopus", "fish"],
                correct: ["owl", "ox", "octopus"],
                explanation: "Owl, ox, and octopus all start with /o/ like outside!"
            }
        ]
    },
    "2g": { // Board Game - Rhyming
        questions: [
            {
                question: "Move to words that rhyme with 'clean'",
                boardSpaces: ["mean", "cat", "seen", "fish", "green", "run"],
                correct: ["mean", "seen", "green"],
                explanation: "Mean, seen, and green all rhyme with clean!"
            },
            {
                question: "Find spaces with words that rhyme with 'messy'",
                boardSpaces: ["dressy", "car", "Jessie", "big", "Bessie", "jump"],
                correct: ["dressy", "Jessie", "Bessie"],
                explanation: "Dressy, Jessie, and Bessie all rhyme with messy!"
            },
            {
                question: "Land on words that rhyme with 'side'",
                boardSpaces: ["ride", "fish", "hide", "tree", "wide", "cat"],
                correct: ["ride", "hide", "wide"],
                explanation: "Ride, hide, and wide all rhyme with side!"
            }
        ]
    },
    "2h": { // Shopping Cart - Two-syllable words
        questions: [
            {
                question: "Shop for two-syllable cleaning words",
                items: ["mop", "washing", "dust", "cleaning", "wipe", "sweeping"],
                correct: ["washing", "cleaning", "sweeping"],
                explanation: "Washing, cleaning, and sweeping all have two syllables!"
            },
            {
                question: "Find two-syllable sibling words",
                items: ["big", "sister", "small", "brother", "tall", "cousin"],
                correct: ["sister", "brother", "cousin"],
                explanation: "Sister, brother, and cousin all have two syllables!"
            },
            {
                question: "Collect two-syllable outdoor words",
                items: ["sun", "playing", "grass", "running", "tree", "jumping"],
                correct: ["playing", "running", "jumping"],
                explanation: "Playing, running, and jumping all have two syllables!"
            }
        ]
    },

    // Lesson 3: Happy Families
    "2i": { // Target Practice - Letter Recognition
        questions: [
            {
                question: "Shoot the letter 'D' to start the word 'DINNER'",
                 image: "../../../../../images/dinner.png",
                targets: ["J", "G", "O", "D", "B", "F"],
                correct: "D",
                explanation: "'D' starts DINNER. Families eat dinner together!"
            },
            {
                question: "Hit the letter 'T' to start the word 'TRIP'",
                 image: "../../../../../images/trip.png",
                targets: ["T", "R", "L", "S", "M", "F"],
                correct: "T",
                explanation: "'T' begins TRIP. Family trips are fun!"
            },
            {
                question: "Target the letter 'W' to start the word 'WIN'",
                 image: "../../../../../images/win.png",
                targets: ["W", "L", "N", "J", "K", "P"],
                correct: "W",
                explanation: "'W' starts WIN. Families celebrate when we win!"
            }
        ]
    },
    "2j": { // Floating Objects - Initial Sounds
        questions: [
            {
                question: "Catch words that start with /d/ like 'dinner'",
                floatingWords: ["dance", "cat", "duck", "fish", "door", "ball"],
                correct: ["dance", "duck", "door"],
                explanation: "Dance, duck, and door all start with /d/ like dinner!"
            },
            {
                question: "Grab words that start with /t/ like 'trip'",
                floatingWords: ["top", "big", "toy", "jump", "ten", "hat"],
                correct: ["top", "toy", "ten"],
                explanation: "Top, toy, and ten all start with /t/ like trip!"
            },
            {
                question: "Collect words that start with /w/ like 'win'",
                floatingWords: ["water", "car", "wind", "run", "wave", "fish"],
                correct: ["water", "wind", "wave"],
                explanation: "Water, wind, and wave all start with /w/ like win!"
            }
        ]
    },
    "2k": { // Board Game - Rhyming
        questions: [
            {
                question: "Move to words that rhyme with 'dinner'",
                boardSpaces: ["winner", "cat", "thinner", "door", "sinner", "run"],
                correct: ["winner", "thinner", "sinner"],
                explanation: "Winner, thinner, and sinner all rhyme with dinner!"
            },
            {
                question: "Find spaces with words that rhyme with 'trip'",
                boardSpaces: ["ship", "car", "skip", "big", "flip", "jump"],
                correct: ["ship", "skip", "flip"],
                explanation: "Ship, skip, and flip all rhyme with trip!"
            },
            {
                question: "Land on words that rhyme with 'win'",
                boardSpaces: ["bin", "fish", "pin", "tree", "tin", "cat"],
                correct: ["bin", "pin", "tin"],
                explanation: "Bin, pin, and tin all rhyme with win!"
            }
        ]
    },
    "2l": { // Shopping Cart - Two-syllable words
        questions: [
            {
                question: "Shop for two-syllable meal words",
                items: ["lunch", "dinner", "snack", "breakfast", "food", "eating"],
                correct: ["dinner", "breakfast", "eating"],
                explanation: "Dinner, breakfast, and eating all have two syllables!"
            },
            {
                question: "Find two-syllable travel words",
                items: ["car", "flying", "bus", "walking", "bike", "riding"],
                correct: ["flying", "walking", "riding"],
                explanation: "Flying, walking, and riding all have two syllables!"
            },
            {
                question: "Collect two-syllable celebration words",
                items: ["fun", "party", "joy", "dancing", "laugh", "singing"],
                correct: ["party", "dancing", "singing"],
                explanation: "Party, dancing, and singing all have two syllables!"
            }
        ]
    }
};

// Game State Management
let currentLesson = null;
let currentActivity = null;
let currentQuestion = 0;
let score = 0;
let gameState = {
    completedLessons: [],
    completedActivities: [],
    totalStars: 0
};

// DOM Elements
let elements = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    showHomeScreen();
    updateProgress();
});

function initializeElements() {
    elements = {
        // Screens
        homeScreen: document.getElementById('home-screen'),
        levelScreen: document.getElementById('level-screen'),
        gameScreen: document.getElementById('game-screen'),
        celebrationScreen: document.getElementById('celebration-screen'),
        
        // Navigation
        backBtn: document.getElementById('back-btn'),
        homeBtn: document.getElementById('home-btn'),
        soundToggle: document.getElementById('sound-toggle'),
        
        // Home screen elements
        characterMessage: document.getElementById('character-message'),
        progressFill: document.getElementById('progress-fill'),
        progressPercentage: document.getElementById('progress-percentage'),
        
        // Level screen elements
        levelTitle: document.getElementById('level-title'),
        activitiesContainer: document.getElementById('activities-container'),
        totalStars: document.getElementById('total-stars'),
        completedActivities: document.getElementById('completed-activities'),
        totalActivitiesSpan: document.getElementById('total-activities'),
        
        // Game screen elements
        gameTitle: document.getElementById('game-title'),
        questionCounter: document.getElementById('question-counter'),
        scoreDisplay: document.getElementById('score'),
        questionText: document.getElementById('question-text'),
        questionVisual: document.getElementById('question-visual'),
        audioBtn: document.getElementById('audio-btn'),
        gameArea: document.getElementById('game-area'),
        characterExplanation: document.getElementById('character-explanation'),
        characterExplanationText: document.getElementById('character-explanation-text'),
        checkBtn: document.getElementById('check-btn'),
        resetBtn: document.getElementById('reset-btn'),
        nextBtn: document.getElementById('next-btn'),
        
        // Celebration screen elements
        celebrationTitle: document.getElementById('celebration-title'),
        starsCount: document.getElementById('stars-count'),
        playAgainBtn: document.getElementById('play-again-btn'),
        chooseLevelBtn: document.getElementById('choose-level-btn'),
        homeCelebrationBtn: document.getElementById('home-celebration-btn'),
        
        // Feedback overlays
        correctOverlay: document.getElementById('correct-overlay'),
        wrongOverlay: document.getElementById('wrong-overlay')
    };
}

function initializeEventListeners() {
    // Lesson hotspots
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            if (href) { window.location.href = href; return; }
            const lessonId = parseInt(this.dataset.lesson);
            showLessonActivities(lessonId);
        });
    });
    
    // Navigation buttons
    if (elements.backBtn) {
        elements.backBtn.addEventListener('click', goBack);
    }
    if (elements.homeBtn) {
        elements.homeBtn.addEventListener('click', showHomeScreen);
    }
    if (elements.soundToggle) {
        elements.soundToggle.addEventListener('click', toggleSound);
    }
    
    // Game buttons
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', nextQuestion);
    }
    if (elements.checkBtn) {
        elements.checkBtn.addEventListener('click', checkAnswer);
    }
    if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', resetGame);
    }
    
    // Celebration buttons
    if (elements.playAgainBtn) {
        elements.playAgainBtn.addEventListener('click', playAgain);
    }
    if (elements.chooseLevelBtn) {
        elements.chooseLevelBtn.addEventListener('click', goToLevelSelection);
    }
    if (elements.homeCelebrationBtn) {
        elements.homeCelebrationBtn.addEventListener('click', showHomeScreen);
    }
    
    // Audio button
    if (elements.audioBtn) {
        elements.audioBtn.addEventListener('click', playAudio);
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showHomeScreen() {
    showScreen('home-screen');
    updateProgress();
    updateCharacterMessage("Welcome back! Click on any lesson to continue your five senses adventure!");
}

function showLessonActivities(lessonId) {
    currentLesson = unit2Data.lessons.find(lesson => lesson.id === lessonId);
    if (!currentLesson) return;
    
    showScreen('level-screen');
    elements.levelTitle.textContent = currentLesson.title;
    
    // Update activity count
    elements.totalActivitiesSpan.textContent = currentLesson.activities.length;
    
    // Clear and populate activities
    elements.activitiesContainer.innerHTML = '';
    
    currentLesson.activities.forEach(activity => {
        const activityCard = createActivityCard(activity);
        elements.activitiesContainer.appendChild(activityCard);
    });
    
    updateLevelProgress();
}

function createActivityCard(activity) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.dataset.activityId = activity.id;
    
    const isCompleted = gameState.completedActivities.includes(activity.id);
    if (isCompleted) {
        card.classList.add('completed');
    }
    
    card.innerHTML = `
        <h3 class="activity-title">${activity.title}</h3>
        <p class="activity-description">${activity.description}</p>
        <div class="activity-mechanic">${activity.mechanic}</div>
        ${isCompleted ? '<div class="completion-star">⭐ Completed</div>' : ''}
    `;
    
    card.addEventListener('click', () => startActivity(activity));
    
    return card;
}

function startActivity(activity) {
    currentActivity = activity;
    currentQuestion = 0;
    score = 0;
    
    showScreen('game-screen');
    elements.gameTitle.textContent = activity.title;
    elements.scoreDisplay.textContent = score;
    
    loadQuestion();
}

function loadQuestion() {
    const content = gameContent[currentActivity.id];
    if (!content || currentQuestion >= content.questions.length) {
        endActivity();
        return;
    }
    
    const question = content.questions[currentQuestion];
    elements.questionText.textContent = question.question;
    elements.questionCounter.textContent = `Question ${currentQuestion + 1} of ${content.questions.length}`;
    
    // Clear previous game area and visual area
    elements.gameArea.innerHTML = '';
    elements.questionVisual.innerHTML = '';
    elements.characterExplanation.classList.add('hidden');
    
    // Add image if it exists
    if (question.image) {
        elements.questionVisual.innerHTML = `
            <div class="question-image">
                <img src="${question.image}" alt="Question visual" style="max-width: 300px; max-height: 200px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            </div>
        `;
    }
    
    // Load game based on mechanic
    switch (currentActivity.mechanic) {
        case 'Target Practice':
            loadTargetPractice(question);
            break;
        case 'Floating Objects':
            loadFloatingObjects(question);
            break;
        case 'Board Game':
            loadBoardGame(question);
            break;
        case 'Shopping Cart':
            loadShoppingCart(question);
            break;
    }
}

function loadTargetPractice(question) {
    elements.gameArea.innerHTML = `
        <div class="target-practice-game">
            <div class="target-area">
                ${question.targets.map((target, index) => `
                    <div class="target" data-target="${target}" data-index="${index}">
                        ${target}
                    </div>
                `).join('')}
            </div>
            <div class="crosshair">+</div>
        </div>
    `;
    
    // Add click handlers for targets
    document.querySelectorAll('.target').forEach(target => {
        target.addEventListener('click', function() {
            const targetValue = this.dataset.target;
            checkTargetPracticeAnswer(targetValue, question.correct);
        });
    });
}

function loadFloatingObjects(question) {
    elements.gameArea.innerHTML = `
        <div class="floating-objects-game">
            <div class="floating-area">
                ${question.floatingWords.map((word, index) => `
                    <div class="floating-word" data-word="${word}" data-index="${index}">
                        ${word}
                    </div>
                `).join('')}
            </div>
            <div class="caught-words"></div>
        </div>
    `;
    
    // Add click handlers for floating words
    document.querySelectorAll('.floating-word').forEach(word => {
        word.addEventListener('click', function() {
            const wordValue = this.dataset.word;
            catchFloatingWord(wordValue, question.correct);
        });
    });
}

function loadBoardGame(question) {
    elements.gameArea.innerHTML = `
        <div class="board-game">
            <div class="game-board">
                ${question.boardSpaces.map((space, index) => `
                    <div class="board-space" data-word="${space}" data-index="${index}">
                        ${space}
                    </div>
                `).join('')}
            </div>
            <div class="player-piece">🎯</div>
        </div>
    `;
    
    // Add click handlers for board spaces
    document.querySelectorAll('.board-space').forEach(space => {
        space.addEventListener('click', function() {
            const spaceValue = this.dataset.word;
            moveToBoardSpace(spaceValue, question.correct);
        });
    });
}

function loadShoppingCart(question) {
    elements.gameArea.innerHTML = `
        <div class="shopping-cart-game">
            <div class="store-items">
                ${question.items.map((item, index) => `
                    <div class="store-item" data-item="${item}" data-index="${index}">
                        ${item}
                    </div>
                `).join('')}
            </div>
            <div class="shopping-cart">
                <h4>Shopping Cart</h4>
                <div class="cart-items"></div>
            </div>
        </div>
    `;
    
    // Add click handlers for store items
    document.querySelectorAll('.store-item').forEach(item => {
        item.addEventListener('click', function() {
            const itemValue = this.dataset.item;
            addToCart(itemValue, question.correct);
        });
    });
}

function checkTargetPracticeAnswer(target, correct) {
    if (target === correct) {
        showCorrectFeedback();
        score += 10;
        elements.scoreDisplay.textContent = score;
    } else {
        showWrongFeedback();
    }
    showExplanation();
}

function catchFloatingWord(word, correctWords) {
    const caughtArea = document.querySelector('.caught-words');
    if (correctWords.includes(word)) {
        // Add to caught words
        const caughtWord = document.createElement('div');
        caughtWord.className = 'caught-word';
        caughtWord.textContent = word;
        caughtArea.appendChild(caughtWord);
        
        // Remove from floating area
        document.querySelector(`[data-word="${word}"]`).remove();
        
        score += 10;
        elements.scoreDisplay.textContent = score;
        
        // Check if all correct words are caught
        if (caughtArea.children.length === correctWords.length) {
            showCorrectFeedback();
            showExplanation();
        }
    } else {
        showWrongFeedback();
    }
}

function moveToBoardSpace(space, correctSpaces) {
    if (correctSpaces.includes(space)) {
        // Highlight correct space
        document.querySelector(`[data-word="${space}"]`).classList.add('correct-space');
        score += 10;
        elements.scoreDisplay.textContent = score;
        
        // Check if all correct spaces are selected
        const selectedCorrect = document.querySelectorAll('.correct-space').length;
        if (selectedCorrect === correctSpaces.length) {
            showCorrectFeedback();
            showExplanation();
        }
    } else {
        showWrongFeedback();
    }
}

function addToCart(item, correctItems) {
    const cartArea = document.querySelector('.cart-items');
    if (correctItems.includes(item)) {
        // Add to cart
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.textContent = item;
        cartArea.appendChild(cartItem);
        
        // Remove from store
        document.querySelector(`[data-item="${item}"]`).remove();
        
        score += 10;
        elements.scoreDisplay.textContent = score;
        
        // Check if all correct items are in cart
        if (cartArea.children.length === correctItems.length) {
            showCorrectFeedback();
            showExplanation();
        }
    } else {
        // Item bounces out
        const storeItem = document.querySelector(`[data-item="${item}"]`);
        storeItem.classList.add('bounce-out');
        setTimeout(() => storeItem.classList.remove('bounce-out'), 500);
        showWrongFeedback();
    }
}

function showCorrectFeedback() {
    elements.correctOverlay.classList.remove('hidden');
    elements.correctOverlay.innerHTML = `
        <div class="feedback-content">
            <h2>Correct! 🎉</h2>
            <p>Great job!</p>
        </div>
    `;
    setTimeout(() => elements.correctOverlay.classList.add('hidden'), 1500);
}

function showWrongFeedback() {
    elements.wrongOverlay.classList.remove('hidden');
    elements.wrongOverlay.innerHTML = `
        <div class="feedback-content">
            <h2>Hmm, not quite right!🤔</h2>
            <p>Let's look at the explanation below!</p>
        </div>
    `;
    setTimeout(() => elements.wrongOverlay.classList.add('hidden'), 1500);
}

function showExplanation() {
    const content = gameContent[currentActivity.id];
    const question = content.questions[currentQuestion];
    
    elements.characterExplanationText.textContent = question.explanation;
    elements.characterExplanation.classList.remove('hidden');
    elements.nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function endActivity() {
  // Mark activity as completed
  if (!gameState.completedActivities.includes(currentActivity.id)) {
    gameState.completedActivities.push(currentActivity.id);

    // Calculate stars: 1 star per correct answer (10 pts each), capped by number of questions
    const content = gameContent[currentActivity.id];
    const correctAnswers = Math.floor(score / 10);
    let stars = Math.min(content.questions.length, correctAnswers);

    gameState.totalStars += stars;
  }

  showCelebration();
}

function showCelebration() {
  showScreen('celebration-screen');

  // Calculate stars: 1 star per correct answer (10 pts each), capped by number of questions
  const content = gameContent[currentActivity.id];
  const correctAnswers = Math.floor(score / 10);
  let stars = Math.min(content.questions.length, correctAnswers);

  elements.celebrationTitle.textContent = `${currentActivity.title} Complete!`;
  elements.starsCount.textContent = stars;


    // Animate stars
    const starElements = document.querySelectorAll('.star');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.style.opacity = '1';
            star.style.animation = 'starTwinkle 1s ease-in-out infinite alternate';
        } else {
            star.style.opacity = '0.3';
            star.style.animation = 'none';
        }
    });
}

function playAgain() {
    currentQuestion = 0;
    score = 0;
    startActivity(currentActivity);
}

function goToLevelSelection() {
    showLessonActivities(currentLesson.id);
}

function goBack() {
    if (document.getElementById('game-screen').classList.contains('active')) {
        showLessonActivities(currentLesson.id);
    } else if (document.getElementById('level-screen').classList.contains('active')) {
        showHomeScreen();
    }
}

function toggleSound() {
    const soundBtn = elements.soundToggle;
    const icon = soundBtn.querySelector('i');
    const label = soundBtn.querySelector('.label');
    
    if (icon.classList.contains('fa-volume-up')) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
        label.textContent = 'Sound Off';
    } else {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
        label.textContent = 'Sound On';
    }
}

function playAudio() {
    // Placeholder for audio functionality
    console.log('Playing audio for current question');
}

function updateProgress() {
    const totalActivities = unit2Data.lessons.reduce((sum, lesson) => sum + lesson.activities.length, 0);
    const completedCount = gameState.completedActivities.length;
    const percentage = Math.round((completedCount / totalActivities) * 100);
    
    if (elements.progressFill) {
        elements.progressFill.style.width = `${percentage}%`;
    }
    if (elements.progressPercentage) {
        elements.progressPercentage.textContent = percentage;
    }
}

function updateLevelProgress() {
    const lessonActivities = currentLesson.activities.length;
    const completedInLesson = currentLesson.activities.filter(activity => 
        gameState.completedActivities.includes(activity.id)
    ).length;
    
    if (elements.completedActivities) {
        elements.completedActivities.textContent = completedInLesson;
    }
    if (elements.totalStars) {
        elements.totalStars.textContent = gameState.totalStars;
    }
}

function updateCharacterMessage(message) {
    if (elements.characterMessage) {
        elements.characterMessage.textContent = message;
    }
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function checkAnswer() {
    // Generic check answer function for different game types
    console.log('Checking answer...');
}
