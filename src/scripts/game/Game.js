import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { Level } from './Level.js';
import { ScoreManager } from './ScoreManager.js';
import { ParticleSystem } from './Particle.js';
import { Physics } from './Physics.js';
import { GAME_CONFIG, GAME_STATES } from '../config/constants.js';

/**
 * Game class - main game engine
 */
export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = GAME_STATES.START;

        // Set canvas size
        this.canvas.width = GAME_CONFIG.CANVAS_WIDTH;
        this.canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

        // Game objects
        this.ball = null;
        this.paddle = null;
        this.level = null;
        this.scoreManager = new ScoreManager();
        this.particleSystem = new ParticleSystem();

        // Game state
        this.lives = GAME_CONFIG.INITIAL_LIVES;
        this.currentLevel = 1;

        // Game loop
        this.lastTime = 0;
        this.animationId = null;

        this.init();
    }

    init() {
        // Create paddle
        const paddleX = this.canvas.width / 2;
        const paddleY = this.canvas.height - GAME_CONFIG.PADDLE_Y_OFFSET;
        this.paddle = new Paddle(paddleX, paddleY, GAME_CONFIG.PADDLE_WIDTH, GAME_CONFIG.PADDLE_HEIGHT);

        // Create ball
        const ballX = this.canvas.width / 2;
        const ballY = paddleY - GAME_CONFIG.BALL_RADIUS - 10;
        this.ball = new Ball(ballX, ballY, GAME_CONFIG.BALL_RADIUS, GAME_CONFIG.BALL_INITIAL_SPEED);

        // Load level
        this.level = new Level(this.currentLevel);
    }

    start() {
        this.state = GAME_STATES.PLAYING;
        this.ball.launch(0); // Launch straight up
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    gameLoop(currentTime) {
        if (this.state !== GAME_STATES.PLAYING) return;

        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime) {
        // Update ball
        this.ball.update(deltaTime, this.canvas.width);

        // Update paddle
        this.paddle.update(deltaTime, this.canvas.width);

        // Update particles
        this.particleSystem.update(deltaTime);

        // Check ball out of bounds
        if (this.ball.isOutOfBounds(this.canvas.height)) {
            this.loseLife();
            return;
        }

        // Check paddle collision
        this.checkPaddleCollision();

        // Check brick collisions
        this.checkBrickCollisions();

        // Check level complete
        if (this.level.isComplete()) {
            this.levelComplete();
        }
    }

    checkPaddleCollision() {
        if (!this.ball.active) return;

        const paddleBounds = this.paddle.getBounds();
        const ballCircle = {
            x: this.ball.x,
            y: this.ball.y,
            radius: this.ball.radius
        };

        if (Physics.checkCircleRectCollision(ballCircle, paddleBounds)) {
            // Calculate bounce angle
            const angle = this.paddle.getBounceAngle(this.ball.x);
            this.ball.setVelocityFromAngle(angle);

            // Make sure ball is above paddle
            this.ball.y = paddleBounds.y - this.ball.radius;
        }
    }

    checkBrickCollisions() {
        if (!this.ball.active) return;

        const activeBricks = this.level.getActiveBricks();
        const ballCircle = {
            x: this.ball.x,
            y: this.ball.y,
            radius: this.ball.radius
        };

        for (const brick of activeBricks) {
            if (Physics.checkCircleRectCollision(ballCircle, brick.getBounds())) {
                const score = brick.hit();

                if (score > 0) {
                    this.scoreManager.addScore(score);

                    // Emit particles
                    const colors = brick.getColors();
                    this.particleSystem.emit(brick.x + brick.width / 2, brick.y + brick.height / 2, 15, colors[0]);
                }

                // Reverse ball direction
                this.ball.reverseY();
                break;
            }
        }
    }

    loseLife() {
        this.lives--;

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.resetBall();
        }
    }

    resetBall() {
        // Center paddle
        this.paddle.x = this.canvas.width / 2;
        this.paddle.targetX = this.paddle.x;

        // Position ball just above paddle, in center
        const ballX = this.canvas.width / 2;
        const ballY = this.paddle.y - GAME_CONFIG.BALL_RADIUS - 5;
        this.ball.reset(ballX, ballY);
        this.state = GAME_STATES.PAUSED;
    }

    levelComplete() {
        this.currentLevel++;
        this.level = new Level(this.currentLevel);
        this.resetBall(); // This will also center the paddle
        this.state = GAME_STATES.LEVEL_COMPLETE;
    }

    gameOver() {
        this.state = GAME_STATES.GAMEOVER;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#101e22';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render bricks
        this.level.bricks.forEach(brick => brick.render(this.ctx));

        // Render paddle
        this.paddle.render(this.ctx);

        // Render ball
        this.ball.render(this.ctx);

        // Render particles
        this.particleSystem.render(this.ctx);

        // Render HUD
        this.renderHUD();
    }

    renderHUD() {
        this.ctx.save();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px "Spline Sans", sans-serif';

        // Score
        this.ctx.fillText(`Score: ${this.scoreManager.score}`, 10, 30);

        // Lives
        this.ctx.fillText(`Lives: ${this.lives}`, 10, 50);

        // Level
        this.ctx.fillText(`Level: ${this.currentLevel}`, 10, 70);

        // Combo
        if (this.scoreManager.combo > 1) {
            this.ctx.fillText(`Combo: x${this.scoreManager.combo}`, 10, 90);
        }

        this.ctx.restore();
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        this.paddle.targetX = x;
    }

    handleClick() {
        if (this.state === GAME_STATES.START) {
            this.start();
        } else if (this.state === GAME_STATES.PAUSED || this.state === GAME_STATES.LEVEL_COMPLETE) {
            this.state = GAME_STATES.PLAYING;
            this.ball.launch(0); // Launch straight up
            this.gameLoop(performance.now());
        }
    }
}
