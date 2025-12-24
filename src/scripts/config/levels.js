import { BRICK_TYPES } from './constants.js';

// Level data structure
export const LEVELS = [
    {
        level: 1,
        ballSpeed: 300,
        targetScore: 500,
        layout: [
            ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
            ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
            ['medium', 'medium', 'medium', 'medium', 'medium', 'medium'],
        ]
    },
    {
        level: 2,
        ballSpeed: 350,
        targetScore: 800,
        layout: [
            ['strong', 'strong', 'strong', 'strong', 'strong', 'strong'],
            ['medium', 'medium', 'medium', 'medium', 'medium', 'medium'],
            ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
            ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
        ]
    },
    {
        level: 3,
        ballSpeed: 400,
        targetScore: 1200,
        layout: [
            ['strong', 'medium', 'weak', 'weak', 'medium', 'strong'],
            ['medium', 'weak', 'weak', 'weak', 'weak', 'medium'],
            ['weak', 'weak', 'medium', 'medium', 'weak', 'weak'],
            ['medium', 'weak', 'weak', 'weak', 'weak', 'medium'],
        ]
    },
    {
        level: 4,
        ballSpeed: 450,
        targetScore: 1600,
        layout: [
            ['strong', 'strong', 'medium', 'medium', 'strong', 'strong'],
            ['strong', 'medium', 'weak', 'weak', 'medium', 'strong'],
            ['medium', 'weak', 'weak', 'weak', 'weak', 'medium'],
            ['medium', 'medium', 'weak', 'weak', 'medium', 'medium'],
        ]
    },
    {
        level: 5,
        ballSpeed: 500,
        targetScore: 2000,
        layout: [
            ['strong', 'strong', 'strong', 'strong', 'strong', 'strong'],
            ['strong', 'medium', 'medium', 'medium', 'medium', 'strong'],
            ['medium', 'medium', 'weak', 'weak', 'medium', 'medium'],
            ['medium', 'weak', 'weak', 'weak', 'weak', 'medium'],
        ]
    },
];

/**
 * Get level data by level number
 * @param {number} levelNumber - Level number (1-based)
 * @returns {Object|null} Level data or null if not found
 */
export function getLevelData(levelNumber) {
    return LEVELS.find(level => level.level === levelNumber) || null;
}

/**
 * Get total number of levels
 * @returns {number} Total number of levels
 */
export function getTotalLevels() {
    return LEVELS.length;
}
