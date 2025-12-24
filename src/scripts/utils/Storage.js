/**
 * StorageManager - handles localStorage operations
 */
export class StorageManager {
    static KEYS = {
        HIGH_SCORE: 'neonbreaker_highscore',
        SETTINGS: 'neonbreaker_settings',
        GAME_STATE: 'neonbreaker_gamestate'
    };

    static saveHighScore(score) {
        localStorage.setItem(this.KEYS.HIGH_SCORE, score.toString());
    }

    static getHighScore() {
        return parseInt(localStorage.getItem(this.KEYS.HIGH_SCORE) || '0');
    }

    static saveSettings(settings) {
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    }

    static getSettings() {
        const defaults = {
            soundEnabled: true,
            musicEnabled: true,
            difficulty: 'normal'
        };
        const stored = localStorage.getItem(this.KEYS.SETTINGS);
        return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    }

    static saveGameState(state) {
        localStorage.setItem(this.KEYS.GAME_STATE, JSON.stringify(state));
    }

    static getGameState() {
        const stored = localStorage.getItem(this.KEYS.GAME_STATE);
        return stored ? JSON.parse(stored) : null;
    }

    static clearGameState() {
        localStorage.removeItem(this.KEYS.GAME_STATE);
    }
}
