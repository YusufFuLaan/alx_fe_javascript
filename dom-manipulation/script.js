// Initialize quotes array
let quotes = [];

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes = storedQuotes;
    displayRandomQuote();
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;

    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();
    if (text && category) {
        const newQuote = { text, category };
        quotes.push(newQuote);
        saveQuotes();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        displayRandomQuote();
    } else {
        alert('Please enter both quote and category.');
    }
}

// Export quotes to JSON file
function exportQuotes() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes = [...quotes, ...importedQuotes];
        saveQuotes();
        displayRandomQuote();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
document.getElementById('addQuote').addEventListener('click', addQuote);
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

// Import quotes on page load if available
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();

    // Load the last viewed quote from session storage
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        document.getElementById('quoteDisplay').innerHTML = `"${lastViewedQuote.text}" - ${lastViewedQuote.category}`;
    }
});


// Implementing Web Storage and JSON Handling