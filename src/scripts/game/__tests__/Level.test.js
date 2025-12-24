import { describe, it, expect, beforeEach } from 'vitest';
import { Level } from '../Level.js';
import { BRICK_TYPES } from '../../config/constants.js';

describe('Level', () => {
    let level;

    beforeEach(() => {
        level = new Level(1);
    });

    describe('constructor', () => {
        it('should initialize with correct level number', () => {
            expect(level.levelNumber).toBe(1);
        });

        it('should load level data', () => {
            expect(level.bricks).toBeDefined();
            expect(level.bricks.length).toBeGreaterThan(0);
        });
    });

    describe('loadLevel', () => {
        it('should create bricks based on layout', () => {
            level.loadLevel();
            expect(level.bricks.length).toBeGreaterThan(0);
        });

        it('should create correct brick types', () => {
            level.loadLevel();
            const hasWeak = level.bricks.some(b => b.type === BRICK_TYPES.WEAK);
            expect(hasWeak).toBe(true);
        });
    });

    describe('isComplete', () => {
        it('should return false when bricks remain', () => {
            expect(level.isComplete()).toBe(false);
        });

        it('should return true when all bricks destroyed', () => {
            level.bricks.forEach(brick => brick.destroyed = true);
            expect(level.isComplete()).toBe(true);
        });
    });

    describe('getActiveBricks', () => {
        it('should return only non-destroyed bricks', () => {
            level.bricks[0].destroyed = true;
            const active = level.getActiveBricks();
            expect(active.length).toBe(level.bricks.length - 1);
        });
    });
});
