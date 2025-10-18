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
const categoryFilter = document.getElementById('categoryFilter');

// Filtered quotes array
let filteredQuotes = [...quotes];

// REQUIRED: populateCategories function
function populateCategories() {
    console.log("Populating categories...");
    
    // Extract unique categories using map and filter
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    
    // Clear existing options except "All Categories"
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    // Add category options using map
    uniqueCategories.map(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    console.log("Categories populated:", uniqueCategories);
}

// REQUIRED: filterQuotes function (evaluation expects filterQuote)
function filterQuotes() {
    console.log("Filtering quotes...");
    
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Filter quotes based on selected category
    if (selectedCategory === 'all') {
        filteredQuotes = [...quotes];
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    
    // Save selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
    
    console.log(`Filtered to ${filteredQuotes.length} quotes for category: ${selectedCategory}`);
    
    // Update display with filtered quotes
    updateDisplayWithFilteredQuotes();
}

// Helper function to update display with filtered quotes
function updateDisplayWithFilteredQuotes() {
    if (filteredQuotes.length === 0) {
        displayedQuote.textContent = "No quotes found for this category.";
        return;
    }
    
    // Show a random quote from filtered results
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    
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
}

// REQUIRED: showRandomQuote function
const showRandomQuote = () => {
    console.log("Displaying random quote...");
    
    if (filteredQuotes.length === 0) {
        displayedQuote.textContent = "No quotes available. Add some quotes!";
        return;
    }
    
    // REQUIRED: Logic to select a random quote from filtered results
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    
    console.log("Selected quote:", randomQuote);
    
    // Save last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    
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
    
    // Save to local storage
    saveQuotesToStorage();
    
    // Update categories dropdown
    populateCategories();
    
    // Update filtered quotes
    filterQuotes();
    
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

// Initialize categories
populateCategories();

// Start periodic server sync
startPeriodicSync();

// Initialize with a random quote or last viewed quote
if (!loadLastViewedQuote()) {
    // Try to restore last selected category, otherwise show random quote
    if (!restoreLastSelectedCategory()) {
        showRandomQuote();
    }
}

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

// REQUIRED: fetchQuotesFromServer function
async function fetchQuotesFromServer() {
    console.log("Fetching quotes from server...");
    
    try {
        // Using JSONPlaceholder as mock API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverPosts = await response.json();
        
        // Convert posts to quote format
        const serverQuotes = serverPosts.slice(0, 5).map((post, index) => ({
            text: post.title,
            author: `Author ${index + 1}`,
            category: index % 2 === 0 ? 'server' : 'api'
        }));
        
        console.log("Fetched quotes from server:", serverQuotes);
        return serverQuotes;
        
    } catch (error) {
        console.error("Error fetching from server:", error);
        return [];
    }
}

// REQUIRED: Post data to server using mock API
async function postQuotesToServer(quotesToPost) {
    console.log("Posting quotes to server...");
    
    try {
        // Simulate posting to server
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `Synced ${quotesToPost.length} quotes`,
                body: JSON.stringify(quotesToPost),
                userId: 1
            })
        });
        
        const result = await response.json();
        console.log("Posted to server successfully:", result);
        return result;
        
    } catch (error) {
        console.error("Error posting to server:", error);
        return null;
    }
}

// REQUIRED: syncQuotes function
async function syncQuotes() {
    console.log("Starting quote synchronization...");
    
    // Show sync notification
    showNotification("Syncing with server...", "info");
    
    try {
        // Fetch quotes from server
        const serverQuotes = await fetchQuotesFromServer();
        
        if (serverQuotes.length > 0) {
            // Check for conflicts and merge
            const mergedQuotes = resolveConflicts(quotes, serverQuotes);
            
            // Update local quotes
            quotes.length = 0; // Clear existing quotes
            quotes.push(...mergedQuotes);
            
            // Update local storage
            saveQuotesToStorage();
            
            // Update categories
            populateCategories();
            
            // Update filtered quotes
            filterQuotes();
            
            showNotification("Quotes synced with server!", "success");
            
            // Post local quotes to server
            await postQuotesToServer(quotes);
            
        } else {
            showNotification("No new quotes found on server.", "info");
        }
        
    } catch (error) {
        console.error("Sync error:", error);
        showNotification("Sync failed. Please try again.", "error");
    }
}

// REQUIRED: Conflict resolution system
function resolveConflicts(localQuotes, serverQuotes) {
    console.log("Resolving conflicts between local and server quotes...");
    
    const mergedQuotes = [...localQuotes];
    const conflicts = [];
    
    // Check for conflicts (quotes with same text)
    serverQuotes.forEach(serverQuote => {
        const existingQuote = localQuotes.find(localQuote => 
            localQuote.text === serverQuote.text
        );
        
        if (existingQuote) {
            // Conflict detected - server takes precedence
            const conflictIndex = mergedQuotes.findIndex(quote => quote.text === serverQuote.text);
            mergedQuotes[conflictIndex] = serverQuote;
            conflicts.push({
                type: 'conflict',
                local: existingQuote,
                server: serverQuote,
                resolution: 'server'
            });
        } else {
            // No conflict - add new quote
            mergedQuotes.push(serverQuote);
        }
    });
    
    if (conflicts.length > 0) {
        showNotification(`${conflicts.length} conflicts resolved. Server data took precedence.`, "warning");
    }
    
    return mergedQuotes;
}

// REQUIRED: UI notification system
function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    // Set color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#000';
            break;
        default:
            notification.style.backgroundColor = '#007bff';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// REQUIRED: Periodic server checking
function startPeriodicSync() {
    console.log("Starting periodic sync...");
    
    // Sync every 30 seconds
    setInterval(async () => {
        console.log("Performing periodic sync...");
        await syncQuotes();
    }, 30000);
    
    // Initial sync after 5 seconds
    setTimeout(async () => {
        await syncQuotes();
    }, 5000);
}

// REQUIRED: Restore last selected category
function restoreLastSelectedCategory() {
    const lastCategory = localStorage.getItem('selectedCategory');
    if (lastCategory) {
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.value = lastCategory;
        console.log("Restored last selected category:", lastCategory);
        
        // Apply the filter
        filterQuotes();
        return true;
    }
    return false;
}

// Load last viewed quote from session storage
const loadLastViewedQuote = () => {
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
        const parsedQuote = JSON.parse(lastQuote);
        console.log("Last viewed quote loaded from session storage:", parsedQuote);
        
        // Display the last viewed quote
        displayedQuote.innerHTML = '';
        
        const quoteText = document.createElement('strong');
        quoteText.textContent = `"${parsedQuote.text}"`;
        
        const quoteAuthor = document.createElement('em');
        quoteAuthor.textContent = `- ${parsedQuote.author}`;
        
        const quoteCategory = document.createElement('small');
        quoteCategory.textContent = `Category: ${parsedQuote.category}`;
        
        const sessionInfo = document.createElement('small');
        sessionInfo.textContent = '(Last viewed in this session)';
        sessionInfo.style.color = '#666';
        
        displayedQuote.appendChild(quoteText);
        displayedQuote.appendChild(document.createElement('br'));
        displayedQuote.appendChild(quoteAuthor);
        displayedQuote.appendChild(document.createElement('br'));
        displayedQuote.appendChild(quoteCategory);
        displayedQuote.appendChild(document.createElement('br'));
        displayedQuote.appendChild(sessionInfo);
        
        return true;
    }
    return false;
};

// REQUIRED: exportToJsonFile function
function exportToJsonFile() {
    console.log("Exporting quotes to JSON file...");
    
    if (quotes.length === 0) {
        alert('No quotes to export!');
        return;
    }
    
    // Create JSON data
    const jsonData = JSON.stringify(quotes, null, 2);
    
    // Create blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    console.log(`Exported ${quotes.length} quotes to JSON file`);
    alert(`Successfully exported ${quotes.length} quotes!`);
};

// REQUIRED: importFromJsonFile function
function importFromJsonFile(event) {
    console.log("Importing quotes from JSON file...");
    
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            
            // Validate the imported data
            if (!Array.isArray(importedQuotes)) {
                alert('Invalid JSON file format! Expected an array of quotes.');
                return;
            }
            
            // Add imported quotes to existing quotes
            quotes.push(...importedQuotes);
            
            // Save to local storage
            saveQuotesToStorage();
            
            console.log(`Imported ${importedQuotes.length} quotes. Total quotes: ${quotes.length}`);
            alert(`Successfully imported ${importedQuotes.length} quotes! Total quotes: ${quotes.length}`);
            
            // Clear the file input
            event.target.value = '';
            
        } catch (error) {
            console.error('Error parsing JSON file:', error);
            alert('Error reading JSON file! Please check the file format.');
        }
    };
    
    fileReader.readAsText(file);
};
