/**
 * DOM Utility Functions
 * Centralized DOM manipulation and element selection
 */

/**
 * Get a single element by selector
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export function getElement(selector) {
  return document.querySelector(selector);
}

/**
 * Get all elements by selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
export function getAllElements(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Create a new element with optional attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string} textContent - Text content
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

/**
 * Clear all children from an element
 * @param {HTMLElement} element - Element to clear
 */
export function clearElement(element) {
  element.innerHTML = "";
}

/**
 * Add event listener to an element
 * @param {HTMLElement} element - Element to attach listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 * @param {boolean} useCapture - Use capture phase
 */
export function addListener(element, event, handler, useCapture = false) {
  element.addEventListener(event, handler, useCapture);
}

/**
 * Toggle a class on an element
 * @param {HTMLElement} element - Element to toggle class on
 * @param {string} className - Class name to toggle
 */
export function toggleClass(element, className) {
  element.classList.toggle(className);
}
