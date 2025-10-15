const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "inspiration" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "perseverance" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "confidence" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown", category: "hard work" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown", category: "action" },
  { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown", category: "success" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", category: "life" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "action" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "perseverance" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", category: "inspiration" },
  { text: "If you tell the truth, you don't have to remember anything.", author: "Mark Twain", category: "wisdom" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", category: "perseverance" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso", category: "creativity" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "happiness" },
  { text: "Whatever you are, be a good one.", author: "Abraham Lincoln", category: "excellence" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "happiness" },
  { text: "Get busy living or get busy dying.", author: "Stephen King", category: "life" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "life" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "wisdom" }
];

const displayedQuote = document.querySelector('#quoteDisplay');
const showQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

const showRandomQuotes = () => { 
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    displayedQuote.innerHTML = `"${randomQuote.text}"<br><em>- ${randomQuote.author}</em><br><small>Category: ${randomQuote.category}</small>`;
};

// Function to add new quote
const addQuote = () => {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
    
    if (!text) {
        alert('Please enter a quote text!');
        return;
    }
    
    if (!category) {
        alert('Please enter a category!');
        return;
    }
    
    // Create new quote object
    const newQuote = {
        text: text,
        author: "You", // Default author for user-added quotes
        category: category
    };
    
    // Add to quotes array
    quotes.push(newQuote);
    
    // Clear input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';
    
    // Show success message
    alert('Quote added successfully!');
    
    // Optional: Display the newly added quote
    displayedQuote.innerHTML = `"${newQuote.text}"<br><em>- ${newQuote.author}</em><br><small>Category: ${newQuote.category}</small><br><span style="color: green;">✓ Newly Added</span>`;
    
    // Log to console to verify
    console.log('Total quotes:', quotes.length);
    console.log('New quote added:', newQuote);
};

// Event listeners
showQuoteButton.addEventListener('click', showRandomQuotes);
addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    showRandomQuotes()
  }
})

// Show a random quote when page loads
showRandomQuotes();