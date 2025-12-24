import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StorageManager } from '../Storage.js';

describe('StorageManager', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('saveHighScore / getHighScore', () => {
        it('should save and retrieve high score', () => {
            StorageManager.saveHighScore(1000);
            expect(StorageManager.getHighScore()).toBe(1000);
        });

        it('should return 0 for non-existent high score', () => {
            expect(StorageManager.getHighScore()).toBe(0);
        });
    });

    describe('saveSettings / getSettings', () => {
        it('should save and retrieve settings', () => {
            const settings = { soundEnabled: false };
            StorageManager.saveSettings(settings);
            expect(StorageManager.getSettings().soundEnabled).toBe(false);
        });

        it('should return defaults for non-existent settings', () => {
            const settings = StorageManager.getSettings();
            expect(settings.soundEnabled).toBeDefined();
        });
    });
});
