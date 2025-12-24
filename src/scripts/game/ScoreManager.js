import { GAME_CONFIG } from '../config/constants.js';

/**
 * ScoreManager - manages score and combo system
 */
export class ScoreManager {
    constructor() {
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.comboTimer = null;
    }

    addScore(points) {
        this.combo++;

        // Apply combo multiplier
        const multiplier = this.combo > 1 ? GAME_CONFIG.COMBO_MULTIPLIER : 1;
        this.score += Math.floor(points * multiplier);

        // Update max combo
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }

        // Reset combo timer
        this.resetComboTimer();
    }

    resetComboTimer() {
        if (this.comboTimer) {
            clearTimeout(this.comboTimer);
        }

        this.comboTimer = setTimeout(() => {
            this.resetCombo();
        }, GAME_CONFIG.COMBO_TIMEOUT);
    }

    resetCombo() {
        this.combo = 0;
        if (this.comboTimer) {
            clearTimeout(this.comboTimer);
            this.comboTimer = null;
        }
    }

    reset() {
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.resetCombo();
    }

    getScore() {
        return this.score;
    }

    getCombo() {
        return this.combo;
    }

    getMaxCombo() {
        return this.maxCombo;
    }
}
