import { describe, it, expect, beforeEach } from 'vitest';
import { Ball } from '../Ball.js';
import { GAME_CONFIG } from '../../config/constants.js';

describe('Ball', () => {
    let ball;

    beforeEach(() => {
        ball = new Ball(200, 300, GAME_CONFIG.BALL_RADIUS, GAME_CONFIG.BALL_INITIAL_SPEED);
    });

    describe('constructor', () => {
        it('should initialize with correct position', () => {
            expect(ball.x).toBe(200);
            expect(ball.y).toBe(300);
        });

        it('should initialize with correct radius', () => {
            expect(ball.radius).toBe(GAME_CONFIG.BALL_RADIUS);
        });

        it('should initialize with correct speed', () => {
            expect(ball.speed).toBe(GAME_CONFIG.BALL_INITIAL_SPEED);
        });

        it('should initialize as inactive', () => {
            expect(ball.active).toBe(false);
        });

        it('should initialize with zero velocity', () => {
            expect(ball.velocity.x).toBe(0);
            expect(ball.velocity.y).toBe(0);
        });
    });

    describe('launch', () => {
        it('should set ball as active', () => {
            ball.launch(-Math.PI / 4);
            expect(ball.active).toBe(true);
        });

        it('should set velocity based on angle and speed', () => {
            const angle = -Math.PI / 4; // 45 degrees up-right
            ball.launch(angle);

            const expectedVx = Math.sin(angle) * ball.speed;
            const expectedVy = -Math.abs(Math.cos(angle)) * ball.speed; // Always negative (upward)

            expect(ball.velocity.x).toBeCloseTo(expectedVx);
            expect(ball.velocity.y).toBeCloseTo(expectedVy);
        });

        it('should launch straight up when angle is 0', () => {
            ball.launch(0);

            expect(ball.velocity.x).toBeCloseTo(0);
            expect(ball.velocity.y).toBeLessThan(0); // Negative Y is up
        });
    });

    describe('update', () => {
        beforeEach(() => {
            ball.launch(-Math.PI / 4);
        });

        it('should update position based on velocity and deltaTime', () => {
            const initialX = ball.x;
            const initialY = ball.y;
            const deltaTime = 1; // 1 second

            ball.update(deltaTime);

            expect(ball.x).not.toBe(initialX);
            expect(ball.y).not.toBe(initialY);
        });

        it('should move correct distance in 1 second', () => {
            ball.velocity = { x: 100, y: -100 };
            const initialX = ball.x;
            const initialY = ball.y;

            ball.update(1); // 1 second

            expect(ball.x).toBeCloseTo(initialX + 100);
            expect(ball.y).toBeCloseTo(initialY - 100);
        });

        it('should not update position when inactive', () => {
            ball.active = false;
            const initialX = ball.x;
            const initialY = ball.y;

            ball.update(1);

            expect(ball.x).toBe(initialX);
            expect(ball.y).toBe(initialY);
        });

        it('should bounce off left wall', () => {
            ball.x = 5;
            ball.velocity = { x: -100, y: 0 };

            ball.update(0.1, GAME_CONFIG.CANVAS_WIDTH);

            expect(ball.velocity.x).toBeGreaterThan(0); // Should reverse
        });

        it('should bounce off right wall', () => {
            ball.x = GAME_CONFIG.CANVAS_WIDTH - 5;
            ball.velocity = { x: 100, y: 0 };

            ball.update(0.1, GAME_CONFIG.CANVAS_WIDTH);

            expect(ball.velocity.x).toBeLessThan(0); // Should reverse
        });

        it('should bounce off top wall', () => {
            ball.y = 5;
            ball.velocity = { x: 0, y: -100 };

            ball.update(0.1);

            expect(ball.velocity.y).toBeGreaterThan(0); // Should reverse
        });
    });

    describe('reset', () => {
        it('should reset to initial position', () => {
            ball.x = 100;
            ball.y = 100;
            ball.reset(200, 300);

            expect(ball.x).toBe(200);
            expect(ball.y).toBe(300);
        });

        it('should set ball as inactive', () => {
            ball.active = true;
            ball.reset(200, 300);

            expect(ball.active).toBe(false);
        });

        it('should reset velocity to zero', () => {
            ball.velocity = { x: 100, y: -100 };
            ball.reset(200, 300);

            expect(ball.velocity.x).toBe(0);
            expect(ball.velocity.y).toBe(0);
        });
    });

    describe('isOutOfBounds', () => {
        it('should return true when ball is below canvas', () => {
            ball.y = GAME_CONFIG.CANVAS_HEIGHT + 10;

            expect(ball.isOutOfBounds(GAME_CONFIG.CANVAS_HEIGHT)).toBe(true);
        });

        it('should return false when ball is within bounds', () => {
            ball.y = GAME_CONFIG.CANVAS_HEIGHT / 2;

            expect(ball.isOutOfBounds(GAME_CONFIG.CANVAS_HEIGHT)).toBe(false);
        });
    });
});
