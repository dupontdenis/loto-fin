/**
 * Result Checking Functions
 */

import { getElement } from "./domUtils.mjs";
import { SELECTORS, CSS_CLASSES } from "./constants.mjs";

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

  let message = "";
  if (matchCount === 5) {
    message = "🎉 JACKPOT! You matched all 5 numbers! 🎉";
  } else if (matchCount === 4) {
    message = "🎊 Excellent! You matched 4 numbers!";
  } else if (matchCount === 3) {
    message = "👏 Great! You matched 3 numbers!";
  } else if (matchCount === 2) {
    message = "👍 Not bad! You matched 2 numbers!";
  } else if (matchCount === 1) {
    message = "You matched 1 number.";
  } else {
    message = "😔 No matches this time. Better luck next time!";
  }

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
    <p>${message}</p>
    ${matchedNumbersHTML}
    <p style="margin-top: 20px; font-size: 14px; color: #666;">
      Your numbers: ${sortedSelected.join(", ")}<br>
      LOTO : ${sortedDrawn.join(", ")}
    </p>
  `;

  console.log(`Matches: ${matchCount} numbers - ${sortedMatches.join(", ")}`);
}
