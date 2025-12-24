import { Game } from './game/Game.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Neon Breaker - Game initializing...');

    // Get canvas element
    const canvas = document.getElementById('game-canvas');

    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    // Create game instance
    const game = new Game(canvas);

    // Add event listeners
    canvas.addEventListener('mousemove', (e) => game.handleMouseMove(e));
    canvas.addEventListener('click', () => game.handleClick());

    // Touch support
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        game.paddle.targetX = x;
    });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        game.handleClick();
    });

    console.log('Game ready! Click to start.');

    // Initial render
    game.render();
});
