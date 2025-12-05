// ELA-K Unit 3: Your Community
// KG1 Game Mechanics Implementation

// Unit 3 Lesson Data
const unit3Data = {
    title: "Unit 3: Your Community",
    theme: "What is a community?",
    lessons: [
        {
            id: 1,
            title: "Can You Help Me, Please?",
            question: "Who helps in your community?",
            description: "Learn about community helpers and how they assist us",
            vocabulary: ["lost", "please", "reach"],
            activities: [
                {
                    id: "3a",
                    title: "Helper Letters",
                    description: "Find letters in community helper words",
                    mechanic: "Target Practice",
                    skill: "Letter recognition"
                },
                {
                    id: "3b", 
                    title: "Helper Sounds",
                    description: "Match sounds to community helper words",
                    mechanic: "Floating Objects",
                    skill: "Initial sounds"
                },
                {
                    id: "3c",
                    title: "Helper Rhymes",
                    description: "Find words that rhyme with helper words",
                    mechanic: "Board Game",
                    skill: "Rhyming"
                },
                {
                    id: "3d",
                    title: "Helper Word Syllables",
                    description: "Sort helper words by syllables",
                    mechanic: "Shopping Cart",
                    skill: "Two-syllable words"
                }
            ]
        },
        {
            id: 2,
            title: "People at Work",
            question: "What jobs do people have?",
            description: "Explore different jobs people do in the community",
            vocabulary: ["airport", "vet", "work"],
            activities: [
                {
                    id: "3e",
                    title: "Job Letters",
                    description: "Target letters in job words",
                    mechanic: "Target Practice",
                    skill: "Letter recognition"
                },
                {
                    id: "3f",
                    title: "Job Sounds",
                    description: "Catch the first sounds of job words",
                    mechanic: "Floating Objects", 
                    skill: "Initial sounds"
                },
                {
                    id: "3g",
                    title: "Job Rhymes",
                    description: "Move through rhyming job words",
                    mechanic: "Board Game",
                    skill: "Rhyming"
                },
                {
                    id: "3h",
                    title: "Job Word Syllables",
                    description: "Shop for two-syllable job words",
                    mechanic: "Shopping Cart",
                    skill: "Two-syllable words"
                }
            ]
        },
        {
            id: 3,
            title: "Country People, City People",
            question: "What do both country and city people do?",
            description: "Compare life in the country and city",
            vocabulary: ["city", "country", "sports"],
            activities: [
                {
                    id: "3i",
                    title: "Place Letters",
                    description: "Aim for letters in place words",
                    mechanic: "Target Practice",
                    skill: "Letter recognition"
                },
                {
                    id: "3j",
                    title: "Place Sounds",
                    description: "Grab floating place sounds",
                    mechanic: "Floating Objects",
                    skill: "Initial sounds"
                },
                {
                    id: "3k",
                    title: "Place Rhymes",
                    description: "Navigate rhyming place words",
                    mechanic: "Board Game", 
                    skill: "Rhyming"
                },
                {
                    id: "3l",
                    title: "Place Syllables",
                    description: "Collect two-syllable place words",
                    mechanic: "Shopping Cart",
                    skill: "Two-syllable words"
                }
            ]
        }
    ]
};

// Game Content Database
const gameContent = {
    // Lesson 1: Can You Help Me, Please?
    "3a": { // Target Practice - Letter Recognition
        questions: [
            {
                question: "Shoot the letter 'L' to start the word 'LOST'",
                targets: ["L", "N", "B", "L", "K", "P"],
                correct: "L",
                explanation: "Great! 'L' is the first letter in LOST. Community helpers find lost things!"
            },
            {
                question: "Hit the letter 'P' to start the word 'PLEASE'", 
                targets: ["P", "F", "L", "P", "T", "S"],
                correct: "P",
                explanation: "Perfect! 'P' starts PLEASE. We say please when asking for help!"
            },
            {
                question: "Target the letter 'R' to start the word 'REACH'",
                targets: ["R", "G", "N", "R", "W", "D"],
                correct: "R", 
                explanation: "Excellent! 'R' begins REACH. Helpers reach out to help us!"
            }
        ]
    },
    "3b": { // Floating Objects - Initial Sounds
        questions: [
            {
                question: "Catch the words that start with the /l/ sound like 'lost'",
                floatingWords: ["lamp", "cat", "lion", "dog", "leaf", "hat"],
                correct: ["lamp", "lion", "leaf"],
                explanation: "Great job! Lamp, lion, and leaf all start with the /l/ sound like lost!"
            },
            {
                question: "Grab the words that start with /p/ like 'please'",
                floatingWords: ["pig", "big", "pan", "jump", "pen", "fish"],
                correct: ["pig", "pan", "pen"],
                explanation: "Perfect! Pig, pan, and pen all start with /p/ like please!"
            },
            {
                question: "Collect words that start with /r/ like 'reach'",
                floatingWords: ["run", "car", "red", "ball", "rock", "tree"],
                correct: ["run", "red", "rock"],
                explanation: "Wonderful! Run, red, and rock all start with /r/ like reach!"
            }
        ]
    },
    "3c": { // Board Game - Rhyming
        questions: [
            {
                question: "Move to words that rhyme with 'lost'",
                boardSpaces: ["cost", "cat", "frost", "dog", "tossed", "run"],
                correct: ["cost", "frost", "tossed"],
                explanation: "Excellent! Cost, frost, and tossed all rhyme with lost!"
            },
            {
                question: "Find spaces with words that rhyme with 'please'",
                boardSpaces: ["cheese", "car", "trees", "big", "freeze", "jump"],
                correct: ["cheese", "trees", "freeze"],
                explanation: "Great work! Cheese, trees, and freeze all rhyme with please!"
            },
            {
                question: "Land on words that rhyme with 'reach'",
                boardSpaces: ["beach", "fish", "teach", "tree", "each", "cat"],
                correct: ["beach", "teach", "each"],
                explanation: "Perfect! Beach, teach, and each all rhyme with reach!"
            }
        ]
    },
    "3d": { // Shopping Cart - Two-syllable words
        questions: [
            {
                question: "Shop for two-syllable helper words",
                items: ["help", "helper", "aid", "rescue", "save", "doctor"],
                correct: ["helper", "rescue", "doctor"],
                explanation: "Great shopping! Helper, rescue, and doctor all have two syllables!"
            },
            {
                question: "Find two-syllable asking words",
                items: ["ask", "asking", "beg", "question", "say", "answer"],
                correct: ["asking", "question", "answer"],
                explanation: "Perfect picks! Asking, question, and answer all have two syllables!"
            },
            {
                question: "Collect two-syllable community words",
                items: ["town", "city", "place", "neighbor", "home", "building"],
                correct: ["city", "neighbor", "building"],
                explanation: "Excellent choices! City, neighbor, and building all have two syllables!"
            }
        ]
    },

    // Lesson 2: People at Work
    "3e": { // Target Practice - Letter Recognition
        questions: [
            {
                question: "Shoot the letter 'A' to start the word 'AIRPORT'",
                targets: ["A", "G", "B", "A", "K", "P"],
                correct: "A",
                explanation: "Great shot! 'A' starts AIRPORT. People work at airports!"
            },
            {
                question: "Hit the letter 'V' to start the word 'VET'",
                targets: ["V", "F", "L", "V", "R", "T"],
                correct: "V",
                explanation: "Perfect aim! 'V' begins VET. Vets help animals!"
            },
            {
                question: "Target the letter 'W' to start the word 'WORK'",
                targets: ["W", "D", "G", "W", "H", "J"],
                correct: "W",
                explanation: "Excellent! 'W' starts WORK. People work in many places!"
            }
        ]
    },
    "3f": { // Floating Objects - Initial Sounds
        questions: [
            {
                question: "Catch words that start with /a/ like 'airport'",
                floatingWords: ["ant", "dog", "apple", "fish", "ax", "ball"],
                correct: ["ant", "apple", "ax"],
                explanation: "Great catch! Ant, apple, and ax all start with /a/ like airport!"
            },
            {
                question: "Grab words that start with /v/ like 'vet'",
                floatingWords: ["van", "big", "vine", "jump", "vase", "hat"],
                correct: ["van", "vine", "vase"],
                explanation: "Perfect! Van, vine, and vase all start with /v/ like vet!"
            },
            {
                question: "Collect words that start with /w/ like 'work'",
                floatingWords: ["water", "car", "wind", "run", "wave", "fish"],
                correct: ["water", "wind", "wave"],
                explanation: "Wonderful! Water, wind, and wave all start with /w/ like work!"
            }
        ]
    },
    "3g": { // Board Game - Rhyming
        questions: [
            {
                question: "Move to words that rhyme with 'port' (from airport)",
                boardSpaces: ["sport", "cat", "fort", "dog", "short", "run"],
                correct: ["sport", "fort", "short"],
                explanation: "Excellent moves! Sport, fort, and short all rhyme with port!"
            },
            {
                question: "Find spaces with words that rhyme with 'vet'",
                boardSpaces: ["pet", "car", "net", "big", "wet", "jump"],
                correct: ["pet", "net", "wet"],
                explanation: "Great navigation! Pet, net, and wet all rhyme with vet!"
            },
            {
                question: "Land on words that rhyme with 'work'",
                boardSpaces: ["jerk", "fish", "perk", "tree", "clerk", "cat"],
                correct: ["jerk", "perk", "clerk"],
                explanation: "Perfect! Jerk, perk, and clerk all rhyme with work!"
            }
        ]
    },
    "3h": { // Shopping Cart - Two-syllable words
        questions: [
            {
                question: "Shop for two-syllable job words",
                items: ["job", "teacher", "cook", "doctor", "nurse", "farmer"],
                correct: ["teacher", "doctor", "farmer"],
                explanation: "Great shopping! Teacher, doctor, and farmer all have two syllables!"
            },
            {
                question: "Find two-syllable workplace words",
                items: ["shop", "office", "store", "kitchen", "bank", "station"],
                correct: ["office", "kitchen", "station"],
                explanation: "Perfect picks! Office, kitchen, and station all have two syllables!"
            },
            {
                question: "Collect two-syllable tool words",
                items: ["tool", "hammer", "saw", "shovel", "brush", "ladder"],
                correct: ["hammer", "shovel", "ladder"],
                explanation: "Excellent choices! Hammer, shovel, and ladder all have two syllables!"
            }
        ]
    },

    // Lesson 3: Country People, City People
    "3i": { // Target Practice - Letter Recognition
        questions: [
            {
                question: "Shoot the letter 'C' to start the word 'CITY'",
                targets: ["C", "G", "O", "C", "B", "F"],
                correct: "C",
                explanation: "Great shot! 'C' starts CITY. Cities have many people!"
            },
            {
                question: "Hit the letter 'C' to start the word 'COUNTRY'",
                targets: ["C", "R", "L", "C", "M", "F"],
                correct: "C",
                explanation: "Perfect aim! 'C' begins COUNTRY. The country has farms and nature!"
            },
            {
                question: "Target the letter 'S' to start the word 'SPORTS'",
                targets: ["S", "L", "N", "S", "K", "P"],
                correct: "S",
                explanation: "Excellent! 'S' starts SPORTS. People play sports everywhere!"
            }
        ]
    },
    "3j": { // Floating Objects - Initial Sounds
        questions: [
            {
                question: "Catch words that start with /c/ like 'city'",
                floatingWords: ["cat", "dog", "car", "fish", "cup", "ball"],
                correct: ["cat", "car", "cup"],
                explanation: "Great catch! Cat, car, and cup all start with /c/ like city!"
            },
            {
                question: "Grab words that start with /s/ like 'sports'",
                floatingWords: ["sun", "big", "sock", "jump", "sit", "hat"],
                correct: ["sun", "sock", "sit"],
                explanation: "Perfect! Sun, sock, and sit all start with /s/ like sports!"
            },
            {
                question: "Collect words that start with /c/ like 'country'",
                floatingWords: ["cow", "run", "corn", "tree", "cake", "fish"],
                correct: ["cow", "corn", "cake"],
                explanation: "Wonderful! Cow, corn, and cake all start with /c/ like country!"
            }
        ]
    },
    "3k": { // Board Game - Rhyming
        questions: [
            {
                question: "Move to words that rhyme with 'city'",
                boardSpaces: ["pretty", "cat", "kitty", "dog", "witty", "run"],
                correct: ["pretty", "kitty", "witty"],
                explanation: "Excellent moves! Pretty, kitty, and witty all rhyme with city!"
            },
            {
                question: "Find spaces with words that rhyme with 'try' (from country)",
                boardSpaces: ["fly", "car", "sky", "big", "dry", "jump"],
                correct: ["fly", "sky", "dry"],
                explanation: "Great navigation! Fly, sky, and dry all rhyme with try!"
            },
            {
                question: "Land on words that rhyme with 'sports'",
                boardSpaces: ["shorts", "fish", "forts", "tree", "ports", "cat"],
                correct: ["shorts", "forts", "ports"],
                explanation: "Perfect! Shorts, forts, and ports all rhyme with sports!"
            }
        ]
    },
    "3l": { // Shopping Cart - Two-syllable words
        questions: [
            {
                question: "Shop for two-syllable city words",
                items: ["bus", "building", "street", "traffic", "park", "subway"],
                correct: ["building", "traffic", "subway"],
                explanation: "Great shopping! Building, traffic, and subway all have two syllables!"
            },
            {
                question: "Find two-syllable country words",
                items: ["farm", "farmer", "field", "tractor", "barn", "garden"],
                correct: ["farmer", "tractor", "garden"],
                explanation: "Perfect picks! Farmer, tractor, and garden all have two syllables!"
            },
            {
                question: "Collect two-syllable activity words",
                items: ["play", "playing", "run", "swimming", "walk", "dancing"],
                correct: ["playing", "swimming", "dancing"],
                explanation: "Excellent choices! Playing, swimming, and dancing all have two syllables!"
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
    updateCharacterMessage("Welcome to Community Island! Let's explore what makes a community and learn about community helpers. Click on any lesson to start your adventure!");
}

function showLessonActivities(lessonId) {
    currentLesson = unit3Data.lessons.find(lesson => lesson.id === lessonId);
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
    
    // Clear previous game area
    elements.gameArea.innerHTML = '';
    elements.characterExplanation.classList.add('hidden');
    
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
            <h2>Try Again! 🤔</h2>
            <p>Keep trying!</p>
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
        gameState.totalStars += Math.floor(score / 30); // 1 star per 30 points
    }
    
    showCelebration();
}

function showCelebration() {
    showScreen('celebration-screen');
    const stars = Math.floor(score / 30);
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
    const totalActivities = unit3Data.lessons.reduce((sum, lesson) => sum + lesson.activities.length, 0);
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

