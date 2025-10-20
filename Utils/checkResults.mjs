/**
 * Result Checking Functions
 */

import { getElement } from "./domUtils.mjs";
import { SELECTORS, CSS_CLASSES } from "./constants.mjs";
import { GAINS } from "./gains.mjs";

/**
 * Calculate intersection between two sets
 * @param {Set<number>} set1 - First set of numbers
 * @param {Set<number>} set2 - Second set of numbers
 * @returns {Set<number>} Intersection of both sets
 */
function getIntersection(set1, set2) {
  return new Set([...set1].filter((x) => set2.has(x)));
}

/**
 * Check lottery results and display matches
 * @param {number[]} selectedNumbers - User selected numbers
 * @param {Set<number>} drawnNumbers - Lottery draw numbers
 */
export function checkLotteryResults(selectedNumbers, drawnNumbers) {
  const selectedSet = new Set(selectedNumbers);
  const matches = getIntersection(selectedSet, drawnNumbers);
  const matchCount = matches.size;

  displayResults(matchCount, matches, selectedSet, drawnNumbers);
}

/**
 * Display results to the user
 * @param {number} matchCount - Number of matches
 * @param {Set<number>} matches - Matched numbers
 * @param {Set<number>} selectedSet - User selected numbers
 * @param {Set<number>} drawnNumbers - Lottery draw numbers
 */
function displayResults(matchCount, matches, selectedSet, drawnNumbers) {
  const resultsDiv = getElement(SELECTORS.RESULTS_DIV);
  if (!resultsDiv) return;

  resultsDiv.classList.remove(CSS_CLASSES.EMPTY);

  const sortedMatches = Array.from(matches).sort((a, b) => a - b);
  const sortedSelected = Array.from(selectedSet).sort((a, b) => a - b);
  const sortedDrawn = Array.from(drawnNumbers).sort((a, b) => a - b);

  // Get gain from Map
  const gain = GAINS.get(matchCount);

  const matchedNumbersHTML =
    matchCount > 0
      ? `
    <div class="matched-numbers">
      ${sortedMatches.map((num) => `<span>${num}</span>`).join("")}
    </div>
  `
      : "";

  resultsDiv.innerHTML = `
    <h3>Results</h3>
    <div class="match-count">${matchCount} / 5</div>
    <p style="font-size: 24px; font-weight: bold; color: ${
      gain > 0 ? "#008004" : "#666"
    };">
      Gain: ${gain} €
    </p>
    ${matchedNumbersHTML}
    <p style="margin-top: 20px; font-size: 14px; color: #666;">
      Your numbers: ${sortedSelected.join(", ")}<br>
      LOTO : ${sortedDrawn.join(", ")}
    </p>
  `;

  console.log(
    `Matches: ${matchCount} numbers - ${sortedMatches.join(
      ", "
    )} - Gain: ${gain}€`
  );
}
