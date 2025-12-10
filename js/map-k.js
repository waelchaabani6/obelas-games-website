// Map-based Level Selection System

const bg = document.getElementById('map-background');
getComputedStyle(bg).pointerEvents   // should NOT be "auto" if it covers nodes
getComputedStyle(bg).zIndex          // make sure it’s below node container
class LevelMap {
    constructor() {
        this.levelPositions = {
            1: { top: 70, left: 7},
            2: { top: 75, left: 15 },
            3: { top: 65, left: 25 },
            4: { top: 55, left: 35 },
            5: { top: 45, left: 45 },
            6: { top: 35, left: 55 },
            7: { top: 25, left: 65 },
            8: { top: 20, left: 75 },
            9: { top: 25, left: 85 },
            10: { top: 35, left: 90 },
            11: { top: 45, left: 85 },
            12: { top: 55, left: 80 },
            13: { top: 65, left: 75 },
            14: { top: 75, left: 70 },
            15: { top: 80, left: 60 },
            16: { top: 75, left: 50 },
            17: { top: 65, left: 40 },
            18: { top: 55, left: 30 },
            19: { top: 45, left: 20 },
            20: { top: 35, left: 10 },
            21: { top: 25, left: 5 },
            22: { top: 15, left: 15 },
            23: { top: 10, left: 25 },
            24: { top: 5, left: 35 }
        };

        this.levelConnections = {
            1: [2], 2: [3], 3: [4], 4: [5], 5: [6], 6: [7],
            7: [8], 8: [9], 9: [10], 10: [11], 11: [12],
            12: [13], 13: [14], 14: [15], 15: [16], 16: [17],
            17: [18], 18: [19], 19: [20], 20: [21],
            21: [22], 22: [23], 23: [24]
        };
    }

    // Initialize the map display
    initializeMap() {
        this.updateProgressDisplay();
        this.updateProgressBar();
        this.updateAchievements();
        this.createDomainIndicators();
        this.createLevelNodes();
        this.createLevelPaths();
    }

    // Update progress display in header
    updateProgressDisplay() {
        const stats = progressTracker.getProgressStats();
        
        document.getElementById('total-stars').textContent = stats.totalStars;
        document.getElementById('completed-levels').textContent = stats.completedLevels;
        document.getElementById('total-levels').textContent = stats.totalLevels;
    }

    // Update progress bar
    updateProgressBar() {
        const stats = progressTracker.getProgressStats();
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        
        if (progressFill && progressPercentage) {
            progressFill.style.width = `${stats.completionPercentage}%`;
            progressPercentage.textContent = `${Math.round(stats.completionPercentage)}%`;
        }
    }

    // Update achievements display
    updateAchievements() {
        const achievementsContainer = document.getElementById('recent-achievements');
        if (!achievementsContainer) return;

        const achievements = progressTracker.progress.achievements;
        const achievementData = {
            'first_level': { icon: '🎯', text: 'First Level!' },
            'perfect_score': { icon: '⭐', text: 'Perfect Score!' },
            'domain_master': { icon: '🏆', text: 'Domain Master!' },
            'star_collector': { icon: '✨', text: 'Star Collector!' },
            'learning_champion': { icon: '👑', text: 'Learning Champion!' }
        };

        achievementsContainer.innerHTML = '';
        
        if (achievements.length === 0) {
            achievementsContainer.innerHTML = '<span style="color: #7f8c8d; font-style: italic;">Complete levels to earn achievements!</span>';
            return;
        }

        // Show the most recent achievements (last 3)
        const recentAchievements = achievements.slice(-3);
        
        recentAchievements.forEach(achievementId => {
            const achievement = achievementData[achievementId];
            if (achievement) {
                const badge = document.createElement('div');
                badge.className = 'achievement-badge';
                badge.innerHTML = `${achievement.icon} ${achievement.text}`;
                achievementsContainer.appendChild(badge);
            }
        });
    }

    // Create domain indicators on the map
    createDomainIndicators() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;

        // Remove existing indicators
        mapContainer.querySelectorAll('.domain-indicator').forEach(el => el.remove());

        const domains = [
            { name: 'Phonics & Letters', class: 'domain-phonics' },
            { name: 'Reading Stories', class: 'domain-reading' },
            { name: 'Words & Meaning', class: 'domain-vocabulary' },
            { name: 'Writing Fun', class: 'domain-writing' },
            { name: 'Listen & Speak', class: 'domain-listening' }
        ];

        domains.forEach(domain => {
            const indicator = document.createElement('div');
            indicator.className = `domain-indicator ${domain.class}`;
            indicator.textContent = domain.name;
            mapContainer.appendChild(indicator);
        });
    }

    // Create level nodes on the map
    createLevelNodes() {
        const nodesContainer = document.getElementById('level-nodes');
        if (!nodesContainer) return;

        nodesContainer.innerHTML = '';

        // Create nodes for all levels
        for (let levelId = 1; levelId <= 24; levelId++) {
            const node = this.createLevelNode(levelId);
            nodesContainer.appendChild(node);
        }
    }

    // Create a single level node
  // Create a single level node
createLevelNode(levelId) {
    const node = document.createElement('div');
    node.className = 'level-node';
    node.classList.add(`level-${levelId}`);
    
    const position = this.levelPositions[levelId];
    node.style.top = `${position.top}%`;
    node.style.left = `${position.left}%`;

    // Determine node state
    const isUnlocked = progressTracker.isLevelUnlocked(levelId);
    const isCompleted = progressTracker.isLevelCompleted(levelId);
    const stars = progressTracker.getLevelStars(levelId);
    const nextLevel = progressTracker.getNextLevel();

    // Add appropriate classes
    if (isCompleted) {
        node.classList.add('completed');
    } else if (isUnlocked) {
        node.classList.add('unlocked');
        if (levelId === nextLevel) {
            node.classList.add('current');
        }
    } else {
        node.classList.add('locked');
    }

    // Create node content
    const levelNumber = document.createElement('div');
    levelNumber.className = 'level-number';
    levelNumber.textContent = levelId;

    const levelStars = document.createElement('div');
    levelStars.className = 'level-stars';
    
    // Add stars display
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('span');
        star.textContent = i < stars ? '⭐' : '☆';
        levelStars.appendChild(star);
    }

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'level-tooltip';
    
    const levelData = this.getLevelData(levelId);
    if (isCompleted) {
        const scoreData = progressTracker.getLevelScore(levelId);
        tooltip.textContent = `${levelData.title} - ${scoreData.percentage.toFixed(0)}% (${stars} stars) - Click to replay!`;
    } else if (isUnlocked) {
        tooltip.textContent = `${levelData.title} - Click to play!`;
    } else {
        tooltip.textContent = `${levelData.title} - Complete previous level to unlock`;
    }

    node.appendChild(levelNumber);
    node.appendChild(levelStars);
    node.appendChild(tooltip);

    // FIX: Add click handler for both unlocked AND completed levels
    if (isUnlocked || isCompleted) {
        node.addEventListener('click', () => this.startLevel(levelId));
    }

    return node;
}

    // Create paths between levels
    createLevelPaths() {
        const pathsContainer = document.getElementById('level-paths');
        if (!pathsContainer) return;

        pathsContainer.innerHTML = '';

        // Create paths for all connections
        for (const [fromLevel, toLevels] of Object.entries(this.levelConnections)) {
            const fromLevelId = parseInt(fromLevel);
            
            for (const toLevelId of toLevels) {
                const path = this.createPath(fromLevelId, toLevelId);
                if (path) {
                    pathsContainer.appendChild(path);
                }
            }
        }
    }

    // Create a path between two levels
  // Create a path between two levels
createPath(fromLevelId, toLevelId) {
    const fromPos = this.levelPositions[fromLevelId];
    const toPos = this.levelPositions[toLevelId];
    
    if (!fromPos || !toPos) return null;

    // Calculate path coordinates (center of nodes)
    const fromX = fromPos.left + 4; // Adjust for node center
    const fromY = fromPos.top + 4;
    const toX = toPos.left + 4;
    const toY = toPos.top + 4;

    // Create SVG path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Create curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const controlX = midX + (Math.random() - 0.5) * 10; // Add some curve variation
    const controlY = midY + (Math.random() - 0.5) * 10;
    
    // CORRECTED: Remove the percentage symbols from the path data string
    const pathData = `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
    path.setAttribute('d', pathData);
    path.setAttribute('class', 'path-line');

    // Determine path state
    const fromCompleted = progressTracker.isLevelCompleted(fromLevelId);
    const toUnlocked = (toLevelId === 1) || progressTracker.isLevelUnlocked(toLevelId);

    if (fromCompleted && toUnlocked) {
        path.classList.add('completed');
    } else if (!toUnlocked) {
        path.classList.add('locked');
    }

    return path;
}

    // Get level data from gameData
    getLevelData(levelId) {
        for (const domain of gameData.domains) {
            const level = domain.levels.find(l => l.id === levelId);
            if (level) return level;
        }
        return { title: `Level ${levelId}`, description: 'Unknown level' };
    }

    // Start a level
    startLevel(levelId) {
        if (!progressTracker.isLevelUnlocked(levelId)) {
            return;
        }

        // Use existing startLevel function from script.js
        if (typeof startLevel === 'function') {
            startLevel(levelId);
        }
    }

    // Update map after level completion
    updateMapAfterCompletion(levelId, result) {
        // Refresh the entire map to show new states
        this.initializeMap();

        // Show completion feedback
        if (result.unlockedNext) {
            this.showLevelUnlockedFeedback(levelId + 1);
        }

        if (result.isNewBest) {
            this.showNewBestFeedback(levelId, result.stars);
        }
    }

    // Show feedback for newly unlocked level
    showLevelUnlockedFeedback(levelId) {
        const node = document.querySelector(`.level-${levelId}`);
        if (node) {
            // Add temporary unlock animation
            node.style.animation = 'unlock-glow 2s ease-in-out';
            setTimeout(() => {
                node.style.animation = '';
            }, 2000);
        }
    }

    // Show feedback for new best score
    showNewBestFeedback(levelId, stars) {
        const node = document.querySelector(`.level-${levelId}`);
        if (node) {
            // Add temporary star animation
            const starsContainer = node.querySelector('.level-stars');
            if (starsContainer) {
                starsContainer.style.animation = 'star-sparkle 1.5s ease-in-out';
                setTimeout(() => {
                    starsContainer.style.animation = '';
                }, 1500);
            }
        }
    }

    // Toggle between map and list view
    toggleView() {
        const mapContainer = document.getElementById('map-container');
        const levelsContainer = document.getElementById('levels-container');
        
        if (mapContainer.style.display === 'none') {
            mapContainer.style.display = 'block';
            levelsContainer.classList.add('hidden');
        } else {
            mapContainer.style.display = 'none';
            levelsContainer.classList.remove('hidden');
        }
    }
}

// Add unlock glow animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes unlock-glow {
        0%, 100% { box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4); }
        50% { box-shadow: 0 4px 30px rgba(255, 215, 0, 1), 0 0 20px rgba(255, 215, 0, 0.8); }
    }
    
    @keyframes star-sparkle {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2) rotate(5deg); }
        50% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.2) rotate(5deg); }
    }
`;
document.head.appendChild(style);

// Create global map instance
const levelMap = new LevelMap();

