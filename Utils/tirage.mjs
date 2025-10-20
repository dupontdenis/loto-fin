/**
 * Lottery Draw Functions
 */

import { LOTO_CONFIG } from "./constants.mjs";

/**
 * Generate a random integer between min (inclusive) and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random lottery draw
 * @param {number} count - Number of numbers to draw (default from config)
 * @param {number} min - Minimum number (default from config)
 * @param {number} max - Maximum number (default from config)
 * @returns {Set<number>} Set of unique random numbers
 */
export function tirage(
  count = LOTO_CONFIG.DRAW_COUNT,
  min = LOTO_CONFIG.MIN_NUMBER,
  max = LOTO_CONFIG.MAX_NUMBER
) {
  const result = new Set();

  while (result.size < count) {
    result.add(getRandomIntInclusive(min, max));
  }

  return result;
}

/**
 * Get sorted array from draw result
 * @param {Set<number>} drawSet - Set of drawn numbers
 * @returns {number[]} Sorted array of numbers
 */
export function getSortedDraw(drawSet) {
  return Array.from(drawSet).sort((a, b) => a - b);
}
