// Initial array of quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Create elements for displaying the quote
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ''; // Clear previous content

    const quoteParagraph = document.createElement("p");
    quoteParagraph.textContent = `"${randomQuote.text}"`;
    
    const categoryParagraph = document.createElement("p");
    categoryParagraph.innerHTML = `<strong>Category:</strong> ${randomQuote.category}`;
    
    quoteDisplay.appendChild(quoteParagraph);
    quoteDisplay.appendChild(categoryParagraph);
}

// Function to add a new quote
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

        // Notify the user and update the display
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.innerHTML = ''; // Clear previous content
        
        const newQuoteParagraph = document.createElement("p");
        newQuoteParagraph.textContent = `New quote added: "${newQuoteText}"`;

        const newCategoryParagraph = document.createElement("p");
        newCategoryParagraph.innerHTML = `<strong>Category:</strong> ${newQuoteCategory}`;
        
        quoteDisplay.appendChild(newQuoteParagraph);
        quoteDisplay.appendChild(newCategoryParagraph);

        alert("New quote added successfully!");
    } else {
        alert("Please fill in both the quote and category.");
    }
}

// Function to dynamically create the add-quote form
function createAddQuoteForm() {
    const formContainer = document.getElementById("formContainer");
    
    // Create elements for the form
    const formDiv = document.createElement("div");

    const inputText = document.createElement("input");
    inputText.id = "newQuoteText";
    inputText.type = "text";
    inputText.placeholder = "Enter a new quote";
    
    const inputCategory = document.createElement("input");
    inputCategory.id = "newQuoteCategory";
    inputCategory.type = "text";
    inputCategory.placeholder = "Enter quote category";
    
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;

    // Append elements to formDiv
    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addButton);

    // Append formDiv to formContainer
    formContainer.appendChild(formDiv);
}

// Add event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// On page load, show a message and create the add-quote form
document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    const initialMessage = document.createElement("p");
    initialMessage.textContent = "Click 'Show New Quote' to display a random quote";
    
    quoteDisplay.appendChild(initialMessage);
    
    // Call the function to create the add-quote form
    createAddQuoteForm();
});
