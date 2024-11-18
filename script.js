// Fetch motivational quote from Quotable API with specific parameters
const quoteElement = document.getElementById('quote');

function getMotivationalQuote() {
  const apiUrl = 'https://api.quotable.io/quotes/random?tags=motivational&limit=1';  // Change tags or other parameters as needed
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // The API response is an array, so access the first element
      const quoteData = data[0]; // Access the first quote from the array

      // Extract quote text and author
      const quoteText = `"${quoteData.content}"`;
      const author = `— ${quoteData.author}`;

      // Update the quote and author in the HTML
      quoteElement.innerHTML = `${quoteText}<br><span class="author">${author}</span>`;
    })
    .catch(error => {
      // Fallback message in case of error
      quoteElement.innerHTML = "Stay motivated! Keep going!";
      console.error('Error fetching quote:', error);
    });
}

// Load the quote when the page loads
getMotivationalQuote();
