import { GAME_CONFIG } from '../config/constants.js';

/**
 * Ball class - represents the game ball
 */
export class Ball {
    /**
     * Create a ball
     * @param {number} x - Initial x position
     * @param {number} y - Initial y position
     * @param {number} radius - Ball radius
     * @param {number} speed - Ball speed (pixels per second)
     */
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.velocity = { x: 0, y: 0 };
        this.active = false;
    }

    /**
     * Launch the ball at a specific angle
     * @param {number} angle - Launch angle in radians (0 = straight up)
     */
    launch(angle) {
        this.active = true;
        // Calculate velocity components
        // Negative Y because canvas Y increases downward
        this.velocity.x = Math.sin(angle) * this.speed;
        this.velocity.y = Math.cos(angle) * this.speed;
    }

    /**
     * Update ball position and handle wall collisions
     * @param {number} deltaTime - Time elapsed since last update (in seconds)
     * @param {number} canvasWidth - Canvas width for boundary checking
     */
    update(deltaTime, canvasWidth = GAME_CONFIG.CANVAS_WIDTH) {
        if (!this.active) return;

        // Update position
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;

        // Bounce off left wall
        if (this.x - this.radius <= 0) {
            this.x = this.radius;
            this.velocity.x = Math.abs(this.velocity.x);
        }

        // Bounce off right wall
        if (this.x + this.radius >= canvasWidth) {
            this.x = canvasWidth - this.radius;
            this.velocity.x = -Math.abs(this.velocity.x);
        }

        // Bounce off top wall
        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.velocity.y = Math.abs(this.velocity.y);
        }
    }

    /**
     * Reset ball to a specific position
     * @param {number} x - New x position
     * @param {number} y - New y position
     */
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = { x: 0, y: 0 };
        this.active = false;
    }

    /**
     * Check if ball is out of bounds (below canvas)
     * @param {number} canvasHeight - Canvas height
     * @returns {boolean} True if ball is out of bounds
     */
    isOutOfBounds(canvasHeight) {
        return this.y - this.radius > canvasHeight;
    }

    /**
     * Reverse horizontal velocity (for paddle/brick collision)
     */
    reverseX() {
        this.velocity.x = -this.velocity.x;
    }

    /**
     * Reverse vertical velocity (for paddle/brick collision)
     */
    reverseY() {
        this.velocity.y = -this.velocity.y;
    }

    /**
     * Set velocity from angle (for paddle bounce)
     * @param {number} angle - New angle in radians
     */
    setVelocityFromAngle(angle) {
        const speed = Math.sqrt(
            this.velocity.x * this.velocity.x +
            this.velocity.y * this.velocity.y
        );
        this.velocity.x = Math.sin(angle) * speed;
        this.velocity.y = Math.cos(angle) * speed;
    }

    /**
     * Render the ball on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    render(ctx) {
        if (!this.active) return;

        ctx.save();

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffffff';

        // Draw ball
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}
