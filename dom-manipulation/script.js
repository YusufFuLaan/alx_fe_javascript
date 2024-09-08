// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addQuote');
    const exportButton = document.getElementById('exportButton');
    const importFileInput = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');

    // Event listeners
    if (addButton) {
        addButton.addEventListener('click', addQuote);
    }
    if (exportButton) {
        exportButton.addEventListener('click', exportToJson);
    }
    if (importFileInput) {
        importFileInput.addEventListener('change', importFromJsonFile);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterQuotes);
    }

    // Load quotes and categories from local storage
    loadQuotes();
    populateCategories();

    // Fetch quotes from server periodically
    setInterval(fetchQuotesFromServer, 60000); // Fetch every 60 seconds
});

// Initialize quotes array
let quotes = [];

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        displayQuotes();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please enter both quote and category.');
    }
}

// Function to display quotes
function displayQuotes() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear existing quotes

    quotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.textContent = `"${quote.text}" — ${quote.category}`;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', () => {
            quotes.splice(index, 1);
            saveQuotes();
            displayQuotes();
        });

        li.appendChild(removeButton);
        quoteDisplay.appendChild(li);
    });
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes;
    displayQuotes();
}

// Function to populate categories in the filter dropdown
function populateCategories() {
    const categories = new Set(quotes.map(q => q.category));
    const categoryFilter = document.getElementById('categoryFilter');

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes by selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear existing quotes

    filteredQuotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.textContent = `"${quote.text}" — ${quote.category}`;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', () => {
            quotes.splice(index, 1);
            saveQuotes();
            displayQuotes();
        });

        li.appendChild(removeButton);
        quoteDisplay.appendChild(li);
    });
}

// Function to export quotes to JSON
function exportToJson() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes = importedQuotes;
            saveQuotes();
            displayQuotes();
            populateCategories();
            alert('Quotes imported successfully!');
        } catch (e) {
            alert('Failed to import quotes. Please make sure the file is a valid JSON.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to fetch quotes from a simulated server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        
        // Simulate server data
        const serverQuotes = data.map(item => ({ text: item.title, category: 'general' }));
        if (serverQuotes.length > 0) {
            // Example conflict resolution: server data takes precedence
            quotes = serverQuotes;
            saveQuotes();
            displayQuotes();
            populateCategories();
            alert('Quotes updated from server!');
        }
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
    }
}
