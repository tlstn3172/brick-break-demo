import { describe, it, expect, beforeEach } from 'vitest';
import { Paddle } from '../Paddle.js';
import { GAME_CONFIG } from '../../config/constants.js';

describe('Paddle', () => {
    let paddle;

    beforeEach(() => {
        const x = GAME_CONFIG.CANVAS_WIDTH / 2;
        const y = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.PADDLE_Y_OFFSET;
        paddle = new Paddle(x, y, GAME_CONFIG.PADDLE_WIDTH, GAME_CONFIG.PADDLE_HEIGHT);
    });

    describe('constructor', () => {
        it('should initialize with correct position', () => {
            expect(paddle.x).toBe(GAME_CONFIG.CANVAS_WIDTH / 2);
            expect(paddle.y).toBe(GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.PADDLE_Y_OFFSET);
        });

        it('should initialize with correct dimensions', () => {
            expect(paddle.width).toBe(GAME_CONFIG.PADDLE_WIDTH);
            expect(paddle.height).toBe(GAME_CONFIG.PADDLE_HEIGHT);
        });
    });

    describe('moveTo', () => {
        it('should move to target x position', () => {
            paddle.moveTo(100);
            expect(paddle.x).toBe(100);
        });

        it('should not move beyond left boundary', () => {
            paddle.moveTo(-50);
            expect(paddle.x).toBe(paddle.width / 2);
        });

        it('should not move beyond right boundary', () => {
            paddle.moveTo(GAME_CONFIG.CANVAS_WIDTH + 50);
            expect(paddle.x).toBe(GAME_CONFIG.CANVAS_WIDTH - paddle.width / 2);
        });
    });

    describe('update', () => {
        it('should move towards target position', () => {
            const initialX = paddle.x;
            paddle.targetX = initialX + 100;

            paddle.update(0.1);

            expect(paddle.x).toBeGreaterThan(initialX);
            expect(paddle.x).toBeLessThan(initialX + 100);
        });

        it('should respect boundaries during update', () => {
            paddle.targetX = -100;
            paddle.update(1);

            expect(paddle.x).toBeGreaterThanOrEqual(paddle.width / 2);
        });
    });

    describe('getBounceAngle', () => {
        it('should return 0 for center hit', () => {
            const angle = paddle.getBounceAngle(paddle.x);
            expect(Math.abs(angle)).toBeLessThan(0.1);
        });

        it('should return negative angle for left side hit', () => {
            const ballX = paddle.x - 30;
            const angle = paddle.getBounceAngle(ballX);
            expect(angle).toBeLessThan(0);
        });

        it('should return positive angle for right side hit', () => {
            const ballX = paddle.x + 30;
            const angle = paddle.getBounceAngle(ballX);
            expect(angle).toBeGreaterThan(0);
        });
    });
});
