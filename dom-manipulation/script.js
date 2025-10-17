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
    
    // REQUIRED: Update the DOM
    displayedQuote.innerHTML = `
        <strong>"${randomQuote.text}"</strong><br>
        <em>- ${randomQuote.author}</em><br>
        <small>Category: ${randomQuote.category}</small>
    `;
};

// REQUIRED: createAddQuoteForm function
const createAddQuoteForm = () => {
    // This function creates the form elements for adding quotes
    // The form is already created in HTML, so this function can be empty
    // or contain any additional form setup logic if needed
    console.log("Add quote form is ready");
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
    
    // REQUIRED: Update the DOM
    displayedQuote.innerHTML = `
        <strong>"${newQuote.text}"</strong><br>
        <em>- ${newQuote.author}</em><br>
        <small>Category: ${newQuote.category}</small><br>
        <span style="color: green;">✓ Successfully Added!</span>
    `;
    
    alert(`Quote added! Total quotes: ${quotes.length}`);
};

// REQUIRED: Event listener on the "Show New Quote" button
showQuoteButton.addEventListener('click', showRandomQuote);

// REQUIRED: Event listener for Add Quote button
addQuoteButton.addEventListener('click', addQuote);

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
