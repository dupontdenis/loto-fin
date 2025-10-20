/**
 * Main Application Entry Point
 * Lottery Number Selection and Drawing Application
 */

// Import utilities
import { handleSelect, getSelectedNumbers } from "./Utils/handletSelect.mjs";
import { tirage, getSortedDraw } from "./Utils/tirage.mjs";
import { printEnsemble } from "./Utils/printEnsemble.mjs";
import { checkLotteryResults } from "./Utils/checkResults.mjs";
import { getElement, addListener } from "./Utils/domUtils.mjs";
import { SELECTORS } from "./Utils/constants.mjs";

// Store the current draw result globally
let currentDraw = null;

/**
 * Initialize the application
 */
function initApp() {
  setupEventListeners();
  performInitialDraw();
}

/**
 * Set up event listeners for user interactions
 */
function setupEventListeners() {
  const container = getElement(SELECTORS.CONTAINER);
  const checkButton = getElement(SELECTORS.CHECK_BUTTON);

  if (!container) {
    console.error("Container element not found");
    return;
  }

  addListener(container, "click", handleSelect, false);

  if (checkButton) {
    addListener(checkButton, "click", handleCheckResults, false);
  }
}

/**
 * Perform initial lottery draw (but don't display it yet)
 */
function performInitialDraw() {
  console.log("Performing lottery draw...");

  currentDraw = tirage();
  const sortedNumbers = getSortedDraw(currentDraw);

  console.log("Draw result:", sortedNumbers);

  // Don't display the draw yet - wait for user to click button
}

/**
 * Handle check results button click
 */
function handleCheckResults() {
  const selectedNumbers = getSelectedNumbers();

  if (selectedNumbers.length < 5) {
    console.warn("Please select at least 5 numbers");
    return;
  }

  if (!currentDraw) {
    console.error("No draw available");
    return;
  }

  // Block the interface - remove click listener
  const container = getElement(SELECTORS.CONTAINER);
  if (container) {
    container.removeEventListener("click", handleSelect, false);
    container.style.pointerEvents = "none";
    container.style.opacity = "0.6";
    console.log("Interface locked - no more selections allowed");
  }

  // Hide the check button
  const checkButton = getElement(SELECTORS.CHECK_BUTTON);
  if (checkButton) {
    checkButton.classList.add("hidden");
  }

  // Show the lottery draw
  const tirageDiv = getElement(SELECTORS.TIRAGE);
  if (tirageDiv) {
    tirageDiv.classList.remove("hidden");
    printEnsemble(currentDraw);
  }

  // Check and display results
  checkLotteryResults(selectedNumbers, currentDraw);
}

/**
 * Log selected numbers (for debugging)
 */
function logSelectedNumbers() {
  const selected = getSelectedNumbers();
  console.log("Selected numbers:", selected);
}

// Initialize application when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Export functions for external use if needed
export { logSelectedNumbers };
