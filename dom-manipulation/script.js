// Initial array of quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// Function to show a random quote using innerHTML
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Use innerHTML to update the quote display with HTML structure
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>Category:</strong> ${randomQuote.category}</p>`;
}

// Function to add a new quote using innerHTML
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    // Check if both fields are filled
    if (newQuoteText && newQuoteCategory) {
        // Create a new quote object and add to the array
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Clear the input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        // Notify the user that the quote has been added and render it using innerHTML
        document.getElementById("quoteDisplay").innerHTML = `<p>New quote added: "${newQuoteText}"</p><p><strong>Category:</strong> ${newQuoteCategory}</p>`;

        alert("New quote added successfully!");
    } else {
        alert("Please fill in both the quote and category.");
    }
}

// Add event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// On page load, show a message using innerHTML
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("quoteDisplay").innerHTML = `<p>Click "Show New Quote" to display a random quote</p>`;
});
