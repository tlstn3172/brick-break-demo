// Game configuration constants
export const GAME_CONFIG = {
    // Canvas
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 600,

    // Ball
    BALL_RADIUS: 8,
    BALL_INITIAL_SPEED: 300,
    BALL_SPEED_INCREMENT: 50,
    BALL_MAX_SPEED: 600,

    // Paddle
    PADDLE_WIDTH: 112,
    PADDLE_HEIGHT: 20,
    PADDLE_SPEED: 500,
    PADDLE_Y_OFFSET: 100,

    // Brick
    BRICK_ROWS: 4,
    BRICK_COLS: 6,
    BRICK_WIDTH: 60,
    BRICK_HEIGHT: 20,
    BRICK_PADDING: 8,
    BRICK_OFFSET_TOP: 80,
    BRICK_OFFSET_LEFT: 10,

    // Game
    INITIAL_LIVES: 3,
    MAX_LIVES: 5,
    COMBO_TIMEOUT: 2000, // ms

    // Scoring
    SCORE_WEAK: 10,
    SCORE_MEDIUM: 20,
    SCORE_STRONG: 30,
    COMBO_MULTIPLIER: 1.5,

    // Stars (for game over screen)
    STAR_THRESHOLD_1: 0.3,  // 30% of target
    STAR_THRESHOLD_2: 0.7,  // 70% of target
    STAR_THRESHOLD_3: 1.0,  // 100% of target
};

// Color constants
export const COLORS = {
    PRIMARY: '#0db9f2',
    BACKGROUND_DARK: '#101e22',

    // Brick colors
    WEAK_BRICK: ['#2dd4bf', '#34d399'],      // Teal gradient
    MEDIUM_BRICK: ['#06b6d4', '#3b82f6'],    // Cyan to Blue gradient
    STRONG_BRICK: ['#a855f7', '#9333ea'],    // Purple gradient

    // Game elements
    BALL: '#ffffff',
    PADDLE: '#0db9f2',

    // Particles
    PARTICLE_PRIMARY: '#0db9f2',
    PARTICLE_WHITE: '#ffffff',
};

// Brick types
export const BRICK_TYPES = {
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong',
};

// Game states
export const GAME_STATES = {
    START: 'START',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    LEVEL_COMPLETE: 'LEVEL_COMPLETE',
    LIFE_LOST: 'LIFE_LOST',
    GAMEOVER: 'GAMEOVER',
};
