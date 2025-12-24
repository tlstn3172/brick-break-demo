import { describe, it, expect, beforeEach } from 'vitest';
import { Brick } from '../Brick.js';
import { BRICK_TYPES } from '../../config/constants.js';

describe('Brick', () => {
    describe('constructor', () => {
        it('should initialize weak brick with health 1', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.WEAK);
            expect(brick.health).toBe(1);
            expect(brick.maxHealth).toBe(1);
        });

        it('should initialize medium brick with health 2', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.MEDIUM);
            expect(brick.health).toBe(2);
            expect(brick.maxHealth).toBe(2);
        });

        it('should initialize strong brick with health 3', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.STRONG);
            expect(brick.health).toBe(3);
            expect(brick.maxHealth).toBe(3);
        });

        it('should not be destroyed initially', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.WEAK);
            expect(brick.destroyed).toBe(false);
        });
    });

    describe('hit', () => {
        it('should decrease health when hit', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.MEDIUM);
            brick.hit();
            expect(brick.health).toBe(1);
        });

        it('should destroy weak brick on first hit', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.WEAK);
            const score = brick.hit();

            expect(brick.destroyed).toBe(true);
            expect(score).toBe(10);
        });

        it('should not destroy medium brick on first hit', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.MEDIUM);
            brick.hit();

            expect(brick.destroyed).toBe(false);
        });

        it('should destroy medium brick on second hit', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.MEDIUM);
            brick.hit();
            const score = brick.hit();

            expect(brick.destroyed).toBe(true);
            expect(score).toBe(20);
        });

        it('should return correct score for strong brick', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.STRONG);
            brick.hit();
            brick.hit();
            const score = brick.hit();

            expect(score).toBe(30);
        });
    });

    describe('getOpacity', () => {
        it('should return 1 for full health', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.STRONG);
            expect(brick.getOpacity()).toBe(1);
        });

        it('should return lower opacity for damaged brick', () => {
            const brick = new Brick(0, 0, 60, 20, BRICK_TYPES.STRONG);
            brick.hit();
            expect(brick.getOpacity()).toBeLessThan(1);
            expect(brick.getOpacity()).toBeGreaterThan(0);
        });
    });
});
