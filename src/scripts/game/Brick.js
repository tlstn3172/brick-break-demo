import { BRICK_TYPES, GAME_CONFIG } from '../config/constants.js';

/**
 * Brick class - represents a destructible brick
 */
export class Brick {
    /**
     * Create a brick
     * @param {number} x - Top-left x position
     * @param {number} y - Top-left y position
     * @param {number} width - Brick width
     * @param {number} height - Brick height
     * @param {string} type - Brick type (weak, medium, strong)
     */
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.health = this.getHealthByType(type);
        this.maxHealth = this.health;
        this.destroyed = false;
    }

    /**
     * Get health value based on brick type
     * @param {string} type - Brick type
     * @returns {number} Health value
     */
    getHealthByType(type) {
        const healthMap = {
            [BRICK_TYPES.WEAK]: 1,
            [BRICK_TYPES.MEDIUM]: 2,
            [BRICK_TYPES.STRONG]: 3,
        };
        return healthMap[type] || 1;
    }

    /**
     * Hit the brick, decrease health
     * @returns {number} Score points if destroyed, 0 otherwise
     */
    hit() {
        if (this.destroyed) return 0;

        this.health--;

        if (this.health <= 0) {
            this.destroyed = true;
            return this.getScore();
        }

        return 0;
    }

    /**
     * Get score value for this brick type
     * @returns {number} Score points
     */
    getScore() {
        const scoreMap = {
            [BRICK_TYPES.WEAK]: GAME_CONFIG.SCORE_WEAK,
            [BRICK_TYPES.MEDIUM]: GAME_CONFIG.SCORE_MEDIUM,
            [BRICK_TYPES.STRONG]: GAME_CONFIG.SCORE_STRONG,
        };
        return scoreMap[this.type] || 0;
    }

    /**
     * Get opacity based on current health
     * @returns {number} Opacity value (0-1)
     */
    getOpacity() {
        if (this.destroyed) return 0;
        return this.health / this.maxHealth;
    }

    /**
     * Get brick bounds for collision detection
     * @returns {Object} Bounds {x, y, width, height}
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    /**
     * Get colors for brick type
     * @returns {Array} Color gradient [color1, color2]
     */
    getColors() {
        const colorMap = {
            [BRICK_TYPES.WEAK]: ['#2dd4bf', '#34d399'],
            [BRICK_TYPES.MEDIUM]: ['#06b6d4', '#3b82f6'],
            [BRICK_TYPES.STRONG]: ['#a855f7', '#9333ea'],
        };
        return colorMap[this.type] || ['#2dd4bf', '#34d399'];
    }

    /**
     * Render the brick on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    render(ctx) {
        if (this.destroyed) return;

        ctx.save();
        ctx.globalAlpha = this.getOpacity();

        // Gradient
        const colors = this.getColors();
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = colors[0];

        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }
}
