/**
 * Physics engine for collision detection and vector calculations
 */
export class Physics {
    /**
     * Reflect a velocity vector off a surface with given normal
     * Formula: v' = v - 2(v·n)n
     * @param {Object} velocity - Velocity vector {x, y}
     * @param {Object} normal - Surface normal vector {x, y} (should be normalized)
     * @returns {Object} Reflected velocity vector {x, y}
     */
    static reflect(velocity, normal) {
        // Calculate dot product: v·n
        const dot = velocity.x * normal.x + velocity.y * normal.y;

        // Calculate reflection: v' = v - 2(v·n)n
        return {
            x: velocity.x - 2 * dot * normal.x,
            y: velocity.y - 2 * dot * normal.y
        };
    }

    /**
     * Check collision between a circle and a rectangle (AABB)
     * @param {Object} circle - Circle {x, y, radius}
     * @param {Object} rect - Rectangle {x, y, width, height}
     * @returns {boolean} True if collision detected
     */
    static checkCircleRectCollision(circle, rect) {
        // Find the closest point on the rectangle to the circle center
        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

        // Calculate distance between circle center and closest point
        const distanceX = circle.x - closestX;
        const distanceY = circle.y - closestY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;

        // Check if distance is less than radius
        return distanceSquared <= circle.radius * circle.radius;
    }

    /**
     * Calculate bounce angle based on where ball hits paddle
     * Center hit: near vertical (0°)
     * Edge hit: maximum angle (±75°)
     * @param {number} ballX - Ball x position
     * @param {number} paddleX - Paddle x position (center)
     * @param {number} paddleWidth - Paddle width
     * @returns {number} Bounce angle in radians
     */
    static calculateBounceAngle(ballX, paddleX, paddleWidth) {
        // Calculate relative hit position (-1 to 1)
        const relativeIntersectX = (ballX - paddleX) / (paddleWidth / 2);

        // Clamp to valid range
        const clampedIntersect = Math.max(-1, Math.min(1, relativeIntersectX));

        // Calculate angle (max 75 degrees)
        const maxAngle = 75 * Math.PI / 180; // 75 degrees in radians
        const angle = clampedIntersect * maxAngle;

        return angle;
    }

    /**
     * Normalize a vector to unit length
     * @param {Object} vector - Vector {x, y}
     * @returns {Object} Normalized vector {x, y}
     */
    static normalize(vector) {
        const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

        if (length === 0) {
            return { x: 0, y: 0 };
        }

        return {
            x: vector.x / length,
            y: vector.y / length
        };
    }

    /**
     * Calculate distance between two points
     * @param {Object} point1 - Point {x, y}
     * @param {Object} point2 - Point {x, y}
     * @returns {number} Distance
     */
    static distance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
