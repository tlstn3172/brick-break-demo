import { GAME_CONFIG } from '../config/constants.js';
import { Physics } from './Physics.js';

/**
 * Paddle class - represents the player-controlled paddle
 */
export class Paddle {
    /**
     * Create a paddle
     * @param {number} x - Center x position
     * @param {number} y - Top y position
     * @param {number} width - Paddle width
     * @param {number} height - Paddle height
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = GAME_CONFIG.PADDLE_SPEED;
        this.targetX = x;
    }

    /**
     * Move paddle to a specific x position
     * @param {number} targetX - Target x position
     * @param {number} canvasWidth - Canvas width for boundary checking
     */
    moveTo(targetX, canvasWidth = GAME_CONFIG.CANVAS_WIDTH) {
        // Clamp to boundaries
        const minX = this.width / 2;
        const maxX = canvasWidth - this.width / 2;

        this.x = Math.max(minX, Math.min(maxX, targetX));
        this.targetX = this.x;
    }

    /**
     * Update paddle position (smooth movement)
     * @param {number} deltaTime - Time elapsed since last update
     * @param {number} canvasWidth - Canvas width for boundary checking
     */
    update(deltaTime, canvasWidth = GAME_CONFIG.CANVAS_WIDTH) {
        if (Math.abs(this.targetX - this.x) > 1) {
            const direction = this.targetX > this.x ? 1 : -1;
            const distance = this.speed * deltaTime;

            this.x += direction * distance;

            // Clamp to boundaries
            const minX = this.width / 2;
            const maxX = canvasWidth - this.width / 2;
            this.x = Math.max(minX, Math.min(maxX, this.x));
        }
    }

    /**
     * Calculate bounce angle based on where ball hits paddle
     * @param {number} ballX - Ball x position
     * @returns {number} Bounce angle in radians
     */
    getBounceAngle(ballX) {
        return Physics.calculateBounceAngle(ballX, this.x, this.width);
    }

    /**
     * Get paddle bounds for collision detection
     * @returns {Object} Bounds {x, y, width, height}
     */
    getBounds() {
        return {
            x: this.x - this.width / 2,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
