// REQUIRED: Quotes array with objects containing text and category properties
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "inspiration" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "perseverance" }
];

// REQUIRED: DOM elements
const displayedQuote = document.querySelector('#quoteDisplay');
const showQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteAuthor = document.getElementById('newQuoteAuthor');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// REQUIRED: showRandomQuote function
const showRandomQuote = () => {
    console.log("Displaying random quote...");
    
    if (quotes.length === 0) {
        displayedQuote.textContent = "No quotes available. Add some quotes!";
        return;
    }
    
    // REQUIRED: Logic to select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    console.log("Selected quote:", randomQuote);
    
    // REQUIRED: Update the DOM using createElement and appendChild
    // Clear existing content
    displayedQuote.innerHTML = '';
    
    // Create elements dynamically
    const quoteText = document.createElement('strong');
    quoteText.textContent = `"${randomQuote.text}"`;
    
    const quoteAuthor = document.createElement('em');
    quoteAuthor.textContent = `- ${randomQuote.author}`;
    
    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = `Category: ${randomQuote.category}`;
    
    // Append elements to display
    displayedQuote.appendChild(quoteText);
    displayedQuote.appendChild(document.createElement('br'));
    displayedQuote.appendChild(quoteAuthor);
    displayedQuote.appendChild(document.createElement('br'));
    displayedQuote.appendChild(quoteCategory);
};

// REQUIRED: createAddQuoteForm function
const createAddQuoteForm = () => {
    // Create form elements dynamically using createElement and appendChild
    const formContainer = document.querySelector('body');
    
    // Create a new div for the form
    const formDiv = document.createElement('div');
    formDiv.id = 'dynamicForm';
    
    // Create input elements
    const textInput = document.createElement('input');
    textInput.id = 'dynamicQuoteText';
    textInput.type = 'text';
    textInput.placeholder = 'Enter quote text';
    
    const authorInput = document.createElement('input');
    authorInput.id = 'dynamicQuoteAuthor';
    authorInput.type = 'text';
    authorInput.placeholder = 'Enter author';
    
    const categoryInput = document.createElement('input');
    categoryInput.id = 'dynamicQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter category';
    
    const submitButton = document.createElement('button');
    submitButton.id = 'dynamicSubmitBtn';
    submitButton.textContent = 'Add Dynamic Quote';
    
    // Append elements to form div
    formDiv.appendChild(textInput);
    formDiv.appendChild(authorInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(submitButton);
    
    // Append form to body
    formContainer.appendChild(formDiv);
    
    console.log("Dynamic form created with createElement and appendChild");
};

// REQUIRED: addQuote function
const addQuote = () => {
    console.log("Adding new quote...");
    
    const text = newQuoteText.value.trim();
    const author = newQuoteAuthor.value.trim() || "Unknown";
    const category = newQuoteCategory.value.trim() || "general";
    
    // Validation
    if (!text) {
        alert('Please enter quote text!');
        return;
    }
    
    if (!category) {
        alert('Please enter a category!');
        return;
    }
    
    // REQUIRED: Create new quote object
    const newQuote = {
        text: text,
        author: author,
        category: category
    };
    
    // REQUIRED: Add to quotes array
    quotes.push(newQuote);
    console.log("Quote added to array. Total quotes:", quotes.length);
    
    // Clear form
    newQuoteText.value = '';
    newQuoteAuthor.value = '';
    newQuoteCategory.value = '';
    
    // REQUIRED: Update the DOM using createElement and appendChild
    // Clear existing content
    displayedQuote.innerHTML = '';
    
    // Create elements dynamically
    const quoteText = document.createElement('strong');
    quoteText.textContent = `"${newQuote.text}"`;
    
    const quoteAuthor = document.createElement('em');
    quoteAuthor.textContent = `- ${newQuote.author}`;
    
    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = `Category: ${newQuote.category}`;
    
    const successMessage = document.createElement('span');
    successMessage.textContent = '✓ Successfully Added!';
    successMessage.style.color = 'green';
    
    // Append elements to display
    displayedQuote.appendChild(quoteText);
    displayedQuote.appendChild(document.createElement('br'));
    displayedQuote.appendChild(quoteAuthor);
    displayedQuote.appendChild(document.createElement('br'));
    displayedQuote.appendChild(quoteCategory);
    displayedQuote.appendChild(document.createElement('br'));
    displayedQuote.appendChild(successMessage);
    
    alert(`Quote added! Total quotes: ${quotes.length}`);
};

// REQUIRED: Event listener on the "Show New Quote" button
document.addEventListener('DOMContentLoaded', () => {
    const showQuoteBtn = document.getElementById('newQuote');
    if (showQuoteBtn) {
        showQuoteBtn.addEventListener('click', showRandomQuote);
        console.log("Event listener added to Show New Quote button");
    }
});

// REQUIRED: Event listener for Add Quote button
document.addEventListener('DOMContentLoaded', () => {
    const addQuoteBtn = document.getElementById('addQuoteBtn');
    if (addQuoteBtn) {
        addQuoteBtn.addEventListener('click', addQuote);
        console.log("Event listener added to Add Quote button");
    }
});

// Initialize the add quote form
createAddQuoteForm();

// Initialize with a random quote
showRandomQuote();

// BONUS: Local storage implementation (optional)
const saveQuotesToStorage = () => {
    localStorage.setItem('userQuotes', JSON.stringify(quotes));
};

const loadQuotesFromStorage = () => {
    const savedQuotes = localStorage.getItem('userQuotes');
    if (savedQuotes) {
        const parsedQuotes = JSON.parse(savedQuotes);
        quotes.push(...parsedQuotes);
    }
};

// Load quotes from storage when page loads
loadQuotesFromStorage();
