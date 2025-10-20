/**
 * Event Handlers for User Selection
 */

import { toggleClass, getElement } from "./domUtils.mjs";
import { SELECTORS, CSS_CLASSES, LOTO_CONFIG } from "./constants.mjs";

/**
 * Handle number selection in the grid
 * @param {Event} event - Click event
 */
export function handleSelect(event) {
  const targetElement = event.target;

  if (!targetElement.closest("div")) {
    return;
  }

  const selectedDiv = targetElement.closest(SELECTORS.CONTAINER_ITEM);

  if (!selectedDiv) {
    return;
  }

  const isCurrentlySelected = selectedDiv.classList.contains(
    CSS_CLASSES.SELECTED
  );
  const currentCount = getSelectedNumbers().length;

  // Check if trying to select more than maximum
  if (!isCurrentlySelected && currentCount >= LOTO_CONFIG.MAX_SELECTION) {
    console.warn(
      `Maximum choice reached! You can only select ${LOTO_CONFIG.MAX_SELECTION} numbers.`
    );
    alert(
      `Maximum choice! You can only select ${LOTO_CONFIG.MAX_SELECTION} numbers.`
    );
    return;
  }

  // Toggle selected state
  toggleClass(selectedDiv, CSS_CLASSES.SELECTED);

  const selectedValue = selectedDiv.dataset.value;
  const isSelected = selectedDiv.classList.contains(CSS_CLASSES.SELECTED);

  console.log(
    `Numéro ${selectedValue} ${isSelected ? "sélectionné" : "désélectionné"}`
  );

  // Update button visibility
  updateCheckButtonVisibility();
}

/**
 * Get all currently selected numbers
 * @returns {number[]} Array of selected numbers
 */
export function getSelectedNumbers() {
  const selectedElements = document.querySelectorAll(
    `${SELECTORS.CONTAINER_ITEM}.${CSS_CLASSES.SELECTED}`
  );

  return Array.from(selectedElements).map((element) =>
    parseInt(element.dataset.value, 10)
  );
}

/**
 * Update check button visibility based on selection count
 */
function updateCheckButtonVisibility() {
  const checkButton = getElement(SELECTORS.CHECK_BUTTON);
  if (!checkButton) return;

  const selectedCount = getSelectedNumbers().length;

  if (selectedCount >= LOTO_CONFIG.DRAW_COUNT) {
    checkButton.classList.remove(CSS_CLASSES.HIDDEN);
  } else {
    checkButton.classList.add(CSS_CLASSES.HIDDEN);
  }
}
