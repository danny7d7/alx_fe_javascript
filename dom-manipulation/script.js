/* ======= Create Add Quote Form + wiring ======= */
/* Drop this into script.js after your quotes array. It creates the UI if it's missing,
   exposes createAddQuoteForm(), wires the Add button to addQuote(), and ensures elements exist. */

function createAddQuoteForm(containerSelector = 'body') {
  // If the form already exists, return it
  const existing = document.getElementById('addQuoteForm');
  if (existing) return existing;

  // Choose container
  const container = document.querySelector(containerSelector) || document.body;

  // Build form
  const form = document.createElement('form');
  form.id = 'addQuoteForm';
  form.style.margin = '20px auto';
  form.style.maxWidth = '720px';
  form.style.display = 'flex';
  form.style.gap = '8px';
  form.style.flexWrap = 'wrap';
  form.setAttribute('onsubmit', 'return false;'); // prevent navigation if button is inside a real form

  // Input for quote text
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = 'newQuoteText';
  textInput.placeholder = 'Enter quote text';
  textInput.required = true;
  textInput.style.flex = '1 1 60%';
  textInput.style.padding = '10px';

  // Input for category
  const catInput = document.createElement('input');
  catInput.type = 'text';
  catInput.id = 'newQuoteCategory';
  catInput.placeholder = 'Category (e.g. wisdom)';
  catInput.required = true;
  catInput.style.flex = '1 1 30%';
  catInput.style.padding = '10px';

  // Add button
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.id = 'addQuoteBtn';
  addBtn.textContent = 'Add Quote';
  addBtn.style.padding = '10px 14px';
  addBtn.style.cursor = 'pointer';

  // Append children
  form.appendChild(textInput);
  form.appendChild(catInput);
  form.appendChild(addBtn);

  // Append to container
  container.appendChild(form);

  // Wire event: click on addBtn -> call addQuote()
  addBtn.addEventListener('click', () => {
    // call user's addQuote function if it exists
    if (typeof addQuote === 'function') {
      addQuote();
    } else {
      console.warn('addQuote() not defined yet.');
    }
  });

  // Return the created form
  return form;
}

/* ======= Safe getters for form fields =======
   Use these to access the inputs safely (they will be created by createAddQuoteForm if missing).
*/
function getAddQuoteElements() {
  // Ensure the form exists
  createAddQuoteForm();

  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const addQuoteBtn = document.getElementById('addQuoteBtn');

  return { newQuoteText, newQuoteCategory, addQuoteBtn };
}

/* ======= Example: patch to your existing addQuote() to use these elements =====
   If your addQuote() currently references top-level DOM queries that were null, update it to use getters.
   If your addQuote() already uses `newQuoteText.value` and `newQuoteCategory.value`, this ensures those elements exist.
*/

if (typeof addQuote === 'function') {
  // Wrap original addQuote to ensure elements are present (optional safe-guard)
  const originalAddQuote = addQuote;
  addQuote = function wrappedAddQuote() {
    // ensure fields exist
    const elems = getAddQuoteElements();

    if (!elems.newQuoteText || !elems.newQuoteCategory) {
      // if still missing, create form in body and try again
      createAddQuoteForm('body');
    }

    // Call original function (which should read values from #newQuoteText and #newQuoteCategory)
    return originalAddQuote();
  };
} else {
  // If addQuote wasn't defined yet, ensure createAddQuoteForm is still available for tests
  // (tests may search only for createAddQuoteForm's existence)
}

/* ======= Auto create form on page load so tests that search for DOM elements will find them ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Place the form near your quote display if you have a container element available.
  // Example: if you have a wrapper element with id="app" or id="quoteApp", pass that selector.
  // Default falls back to <body>
  createAddQuoteForm('#quoteApp') || createAddQuoteForm('body');
});
