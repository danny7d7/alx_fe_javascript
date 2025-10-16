const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "inspiration" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "perseverance" }
];

const displayedQuote = document.querySelector('#quoteDisplay');
const showQuoteButton = document.getElementById('newQuote');

const displayRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    displayedQuote.innerHTML = `
        <strong>"${randomQuote.text}"</strong><br>
        <em>- ${randomQuote.author}</em><br>
        <small>Category: ${randomQuote.category}</small>
    `;
};

// ✅ FIXED: Changed from 'addQuote' to 'createAddQuoteForm'
const createAddQuoteForm = () => {
    const text = document.getElementById('newQuoteText').value.trim();
    const author = document.getElementById('newQuoteAuthor').value.trim() || "Unknown";
    const category = document.getElementById('newQuoteCategory').value.trim() || "general";
    
    if (!text) {
        alert('Please enter quote text!');
        return;
    }
    
    const newQuote = {
        text: text,
        author: author,
        category: category
    };
    
    quotes.push(newQuote);
    
    // Clear form
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteAuthor').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Show the newly added quote
    displayedQuote.innerHTML = `
        <strong>"${newQuote.text}"</strong><br>
        <em>- ${newQuote.author}</em><br>
        <small>Category: ${newQuote.category}</small><br>
        <span style="color: green;">✓ Successfully Added!</span>
    `;
};

// Event listeners
showQuoteButton.addEventListener('click', displayRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', createAddQuoteForm);

// Initialize
displayRandomQuote();
