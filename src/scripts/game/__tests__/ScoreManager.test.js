import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ScoreManager } from '../ScoreManager.js';

describe('ScoreManager', () => {
    let scoreManager;

    beforeEach(() => {
        scoreManager = new ScoreManager();
    });

    describe('constructor', () => {
        it('should initialize with zero score', () => {
            expect(scoreManager.score).toBe(0);
        });

        it('should initialize with zero combo', () => {
            expect(scoreManager.combo).toBe(0);
        });
    });

    describe('addScore', () => {
        it('should add score', () => {
            scoreManager.addScore(100);
            expect(scoreManager.score).toBe(100);
        });

        it('should increase combo', () => {
            scoreManager.addScore(10);
            expect(scoreManager.combo).toBe(1);
        });

        it('should apply combo multiplier', () => {
            scoreManager.addScore(10); // combo 1
            scoreManager.addScore(10); // combo 2, multiplier applied
            expect(scoreManager.score).toBeGreaterThan(20);
        });
    });

    describe('resetCombo', () => {
        it('should reset combo to zero', () => {
            scoreManager.addScore(10);
            scoreManager.resetCombo();
            expect(scoreManager.combo).toBe(0);
        });

        it('should track max combo', () => {
            scoreManager.addScore(10);
            scoreManager.addScore(10);
            scoreManager.resetCombo();
            expect(scoreManager.maxCombo).toBe(2);
        });
    });

    describe('reset', () => {
        it('should reset all values', () => {
            scoreManager.addScore(100);
            scoreManager.reset();
            expect(scoreManager.score).toBe(0);
            expect(scoreManager.combo).toBe(0);
        });
    });
});
