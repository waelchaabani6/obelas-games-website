// Progress Tracking System for Map-Based Level Progression

class ProgressTracker {
    constructor() {
        this.storageKey = 'ela_adventure_progress';
        this.progress = this.loadProgress();
    }

    // Load progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            return JSON.parse(localStorage.getItem('ela_adventure_progress'));
        }
        
        // Initialize default progress - only level 1 is unlocked
        const defaultProgress = {
            unlockedLevels: [1], // First level is always unlocked
            levelStars: {}, // levelId: starCount (1-3)
            levelScores: {}, // levelId: { score, totalQuestions, percentage }
            totalStars: 0,
            lastPlayedLevel: null,
            achievements: []
        };
        
        this.saveProgress(defaultProgress);
        return defaultProgress;
    }

    // Save progress to localStorage
    saveProgress(progress = this.progress) {
        localStorage.setItem(this.storageKey, JSON.stringify(progress));
        this.progress = progress;
    }

    // Calculate stars based on score percentage
    calculateStars(score, totalQuestions) {
        const percentage = (score / totalQuestions) * 100;
        
        if (percentage >= 90) return 3; // 3 stars for 90%+
        if (percentage >= 70) return 2; // 2 stars for 70-89%
        if (percentage >= 50) return 1; // 1 star for 50-69%
        return 0; // No stars for less than 50%
    }

    // Complete a level and update progress
    completeLevel(levelId, score, totalQuestions) {
        const percentage = (score / totalQuestions) * 100;
        const stars = this.calculateStars(score, totalQuestions);
        
        // Update level completion data
        this.progress.levelScores[levelId] = {
            score: score,
            totalQuestions: totalQuestions,
            percentage: percentage,
            completed: true,
            completedAt: new Date().toISOString()
        };

        // Update stars (only if better than previous)
        const previousStars = this.progress.levelStars[levelId] || 0;
        if (stars > previousStars) {
            this.progress.levelStars[levelId] = stars;
        }

        // Unlock next level if this level was completed with at least 1 star
        if (stars > 0) {
            const nextLevelId = levelId + 1;
            if (!this.progress.unlockedLevels.includes(nextLevelId) && nextLevelId <= 24) {
                this.progress.unlockedLevels.push(nextLevelId);
                this.progress.unlockedLevels.sort((a, b) => a - b);
            }
        }

        // Update total stars
        this.progress.totalStars = Object.values(this.progress.levelStars).reduce((sum, stars) => sum + stars, 0);
        
        // Update last played level
        this.progress.lastPlayedLevel = levelId;

        // Check for achievements
        this.checkAchievements();

        // Save progress
        this.saveProgress();

        return {
            stars: stars,
            percentage: percentage,
            unlockedNext: stars > 0 && levelId < 24,
            isNewBest: stars > previousStars
        };
    }

    // Check if a level is unlocked
    isLevelUnlocked(levelId) {
        return this.progress.unlockedLevels.includes(levelId);
    }

    // Get stars for a level
    getLevelStars(levelId) {
        return this.progress.levelStars[levelId] || 0;
    }

    // Get level completion status
    isLevelCompleted(levelId) {
        return this.progress.levelScores[levelId]?.completed || false;
    }

    // Get level score data
    getLevelScore(levelId) {
        return this.progress.levelScores[levelId] || null;
    }

    // Get total progress statistics
    getProgressStats() {
        const totalLevels = 24;
        const completedLevels = Object.keys(this.progress.levelScores).length;
        const unlockedLevels = this.progress.unlockedLevels.length;
        const totalStars = this.progress.totalStars;
        const maxStars = totalLevels * 3;

        return {
            totalLevels,
            completedLevels,
            unlockedLevels,
            totalStars,
            maxStars,
            completionPercentage: (completedLevels / totalLevels) * 100,
            starPercentage: (totalStars / maxStars) * 100
        };
    }

    // Check for achievements
    checkAchievements() {
        const stats = this.getProgressStats();
        const newAchievements = [];

        // First level completed
        if (stats.completedLevels >= 1 && !this.progress.achievements.includes('first_level')) {
            newAchievements.push('first_level');
        }

        // First perfect score (3 stars)
        if (Object.values(this.progress.levelStars).includes(3) && !this.progress.achievements.includes('perfect_score')) {
            newAchievements.push('perfect_score');
        }

        // Complete a domain (5 levels in a row)
        if (stats.completedLevels >= 5 && !this.progress.achievements.includes('domain_master')) {
            newAchievements.push('domain_master');
        }

        // Star collector (10 stars total)
        if (stats.totalStars >= 10 && !this.progress.achievements.includes('star_collector')) {
            newAchievements.push('star_collector');
        }

        // Learning champion (all levels completed)
        if (stats.completedLevels >= 24 && !this.progress.achievements.includes('learning_champion')) {
            newAchievements.push('learning_champion');
        }

        // Add new achievements
        this.progress.achievements.push(...newAchievements);
        
        return newAchievements;
    }

    // Reset all progress (for testing or new player)
    resetProgress() {
        localStorage.removeItem(this.storageKey);
        this.progress = this.loadProgress();
    }

    // Get next recommended level
    getNextLevel() {
        const unlockedLevels = this.progress.unlockedLevels;
        const completedLevels = Object.keys(this.progress.levelScores).map(id => parseInt(id));
        
        // Find the first unlocked level that hasn't been completed
        for (const levelId of unlockedLevels) {
            if (!completedLevels.includes(levelId)) {
                return levelId;
            }
        }
        
        // If all unlocked levels are completed, return the highest unlocked level
        return Math.max(...unlockedLevels);
    }

    // Get level path connections for map display
    getLevelConnections() {
        // Define which levels connect to which (for map paths)
        const connections = {};
        
        // Sequential connections within domains
        for (let i = 1; i <= 23; i++) {
            connections[i] = [i + 1];
        }
        
        // Special connections between domains
        connections[6] = [7]; // Phonics to Reading
        connections[11] = [12]; // Reading to Vocabulary
        connections[16] = [17]; // Vocabulary to Writing
        connections[20] = [21]; // Writing to Listening
        
        return connections;
    }
}

// Create global progress tracker instance
const progressTracker = new ProgressTracker();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}

