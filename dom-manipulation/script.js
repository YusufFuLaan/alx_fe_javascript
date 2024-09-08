const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
const categoryFilter = document.getElementById('categoryFilter');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    loadQuotes();
    // Restore last selected filter
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    categoryFilter.value = lastCategory;
    filterQuotes();
});

// Populate categories dynamically
function populateCategories() {
    const categories = new Set(quotes.map(q => q.category));
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

// Show a random quote
function showRandomQuote() {
    if (quotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');

    quoteDisplay.innerHTML = `
        <p><strong>${quote.text}</strong></p>
        <p>— ${quote.category}</p>
    `;
}

// Add a new quote
function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();
    
    if (!text || !category) {
        alert('Please enter both quote and category.');
        return;
    }

    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();  // Update category filter options
    showRandomQuote();
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
    quotes.forEach(quote => {
        const option = document.createElement('option');
        option.value = quote.category;
        option.textContent = quote.category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('lastCategory', selectedCategory);

    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    quoteDisplay.innerHTML = '';
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerHTML = `<p><strong>${quote.text}</strong></p><p>— ${quote.category}</p>`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Export quotes to JSON file
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
            quotes.length = 0;  // Clear current quotes
            quotes.push(...importedQuotes);
            saveQuotes();
            populateCategories();  // Update category filter options
            filterQuotes();  // Display quotes
        } else {
            alert('Invalid JSON file format.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}
