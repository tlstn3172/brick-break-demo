import { describe, it, expect } from 'vitest';
import { Physics } from '../Physics.js';

describe('Physics', () => {
    describe('reflect', () => {
        it('should reflect velocity vector correctly off horizontal surface', () => {
            const velocity = { x: 1, y: 1 };
            const normal = { x: 0, y: -1 };

            const result = Physics.reflect(velocity, normal);

            expect(result.x).toBeCloseTo(1);
            expect(result.y).toBeCloseTo(-1);
        });

        it('should reflect velocity vector correctly off vertical surface', () => {
            const velocity = { x: 1, y: 1 };
            const normal = { x: -1, y: 0 };

            const result = Physics.reflect(velocity, normal);

            expect(result.x).toBeCloseTo(-1);
            expect(result.y).toBeCloseTo(1);
        });

        it('should reflect velocity vector correctly off diagonal surface', () => {
            const velocity = { x: 1, y: 0 };
            const normal = { x: -0.707, y: -0.707 };

            const result = Physics.reflect(velocity, normal);

            expect(result.x).toBeCloseTo(0, 1);
            expect(result.y).toBeCloseTo(-1, 1);
        });
    });

    describe('checkCircleRectCollision', () => {
        it('should detect collision when circle overlaps rectangle', () => {
            const circle = { x: 50, y: 50, radius: 10 };
            const rect = { x: 40, y: 40, width: 20, height: 20 };

            const result = Physics.checkCircleRectCollision(circle, rect);

            expect(result).toBe(true);
        });

        it('should not detect collision when circle is far from rectangle', () => {
            const circle = { x: 100, y: 100, radius: 10 };
            const rect = { x: 40, y: 40, width: 20, height: 20 };

            const result = Physics.checkCircleRectCollision(circle, rect);

            expect(result).toBe(false);
        });

        it('should detect collision when circle touches rectangle edge', () => {
            const circle = { x: 70, y: 50, radius: 10 };
            const rect = { x: 40, y: 40, width: 20, height: 20 };

            const result = Physics.checkCircleRectCollision(circle, rect);

            expect(result).toBe(true);
        });

        it('should detect collision when circle touches rectangle corner', () => {
            const circle = { x: 65, y: 65, radius: 10 };
            const rect = { x: 40, y: 40, width: 20, height: 20 };

            const result = Physics.checkCircleRectCollision(circle, rect);

            expect(result).toBe(true);
        });
    });

    describe('calculateBounceAngle', () => {
        it('should return near-vertical angle when ball hits paddle center', () => {
            const ballX = 100;
            const paddleX = 100;
            const paddleWidth = 112;

            const angle = Physics.calculateBounceAngle(ballX, paddleX, paddleWidth);

            expect(Math.abs(angle)).toBeLessThan(0.2); // Near vertical
        });

        it('should return maximum angle when ball hits paddle edge', () => {
            const ballX = 156; // Right edge
            const paddleX = 100;
            const paddleWidth = 112;

            const angle = Physics.calculateBounceAngle(ballX, paddleX, paddleWidth);

            const maxAngle = 75 * Math.PI / 180;
            expect(Math.abs(angle)).toBeCloseTo(maxAngle, 1);
        });

        it('should return negative angle for left side hits', () => {
            const ballX = 80;
            const paddleX = 100;
            const paddleWidth = 112;

            const angle = Physics.calculateBounceAngle(ballX, paddleX, paddleWidth);

            expect(angle).toBeLessThan(0);
        });

        it('should return positive angle for right side hits', () => {
            const ballX = 120;
            const paddleX = 100;
            const paddleWidth = 112;

            const angle = Physics.calculateBounceAngle(ballX, paddleX, paddleWidth);

            expect(angle).toBeGreaterThan(0);
        });

        it('should constrain angle within valid range', () => {
            const ballX = 200; // Far right
            const paddleX = 100;
            const paddleWidth = 112;

            const angle = Physics.calculateBounceAngle(ballX, paddleX, paddleWidth);

            const maxAngle = 75 * Math.PI / 180;
            expect(Math.abs(angle)).toBeLessThanOrEqual(maxAngle);
        });
    });

    describe('normalize', () => {
        it('should normalize a vector to unit length', () => {
            const vector = { x: 3, y: 4 };

            const result = Physics.normalize(vector);

            const length = Math.sqrt(result.x * result.x + result.y * result.y);
            expect(length).toBeCloseTo(1);
        });

        it('should handle zero vector', () => {
            const vector = { x: 0, y: 0 };

            const result = Physics.normalize(vector);

            expect(result.x).toBe(0);
            expect(result.y).toBe(0);
        });
    });
});
