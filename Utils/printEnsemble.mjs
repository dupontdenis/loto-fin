/**
 * Display Functions for Lottery Draw
 */

import { getElement, clearElement, createElement } from "./domUtils.mjs";
import { SELECTORS } from "./constants.mjs";

/**
 * Display the lottery draw numbers in the tirage container
 * @param {Set<number>|Array<number>} ensemble - Set or array of numbers to display
 */
export function printEnsemble(ensemble) {
  const container = getElement(SELECTORS.TIRAGE);

  if (!container) {
    console.error("Tirage container not found");
    return;
  }

  clearElement(container);

  // Convert to array and sort if it's a Set
  const numbers =
    ensemble instanceof Set
      ? Array.from(ensemble).sort((a, b) => a - b)
      : ensemble;

  numbers.forEach((num) => {
    const numberElement = createElement("div", {}, num.toString());
    container.appendChild(numberElement);
  });
}

/**
 * Clear the tirage display
 */
export function clearTirage() {
  const container = getElement(SELECTORS.TIRAGE);
  if (container) {
    clearElement(container);
  }
}
