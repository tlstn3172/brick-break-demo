import { Brick } from './Brick.js';
import { getLevelData } from '../config/levels.js';
import { GAME_CONFIG } from '../config/constants.js';

/**
 * Level class - manages bricks and level progression
 */
export class Level {
    constructor(levelNumber) {
        this.levelNumber = levelNumber;
        this.bricks = [];
        this.ballSpeed = GAME_CONFIG.BALL_INITIAL_SPEED;
        this.targetScore = 0;
        this.loadLevel();
    }

    loadLevel() {
        const levelData = getLevelData(this.levelNumber);
        if (!levelData) return;

        this.ballSpeed = levelData.ballSpeed;
        this.targetScore = levelData.targetScore;
        this.bricks = [];

        const layout = levelData.layout;
        const { BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING, BRICK_OFFSET_TOP, BRICK_OFFSET_LEFT } = GAME_CONFIG;

        layout.forEach((row, rowIndex) => {
            row.forEach((type, colIndex) => {
                const x = BRICK_OFFSET_LEFT + colIndex * (BRICK_WIDTH + BRICK_PADDING);
                const y = BRICK_OFFSET_TOP + rowIndex * (BRICK_HEIGHT + BRICK_PADDING);

                this.bricks.push(new Brick(x, y, BRICK_WIDTH, BRICK_HEIGHT, type));
            });
        });
    }

    isComplete() {
        return this.bricks.every(brick => brick.destroyed);
    }

    getActiveBricks() {
        return this.bricks.filter(brick => !brick.destroyed);
    }
}
