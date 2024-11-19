document.addEventListener("DOMContentLoaded", function () {
  // Unsplash API endpoint
  const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random?client_id=mpBdvwJCIICVEIAKoEWhpoqCNbbc-lh2Xa7UDog_-Ro&count=1&query=nature&orientation=landscape";
  
  // Quotable API endpoint
  const QUOTE_API_URL = "https://api.quotable.io/random?tags=motivational";

  // Fetch background image from Unsplash
  fetch(UNSPLASH_API_URL)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data[0].urls.full;  // Get the full-size image URL
      const imageColor = data[0].color;    // Get the image background color

      // Set background image and color
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundColor = imageColor || '#000'; // Fallback color
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.height = '100vh';
      document.body.style.margin = '0';
      document.body.style.display = 'flex';
      document.body.style.flexDirection = 'column';
      document.body.style.justifyContent = 'center';
      document.body.style.alignItems = 'center';
    })
    .catch(error => {
      console.error("Error fetching Unsplash image:", error);
      // Fallback background if error occurs
      document.body.style.backgroundColor = '#333';
    });

  // Fetch quote from Quotable API
  fetch(QUOTE_API_URL)
    .then(response => response.json())
    .then(data => {
      const quoteText = data.content;
      const author = data.author;

      // Display the quote and author in the UI
      const quoteElement = document.getElementById("quote");
      const authorElement = document.getElementById("author");
      if (quoteElement && authorElement) {
        quoteElement.textContent = `"${quoteText}"`;
        authorElement.textContent = `- ${author}`;
      }
    })
    .catch(error => {
      console.error("Error fetching quote:", error);
      // Display fallback quote if error occurs
      const quoteElement = document.getElementById("quote");
      const authorElement = document.getElementById("author");
      if (quoteElement && authorElement) {
        quoteElement.textContent = `"Keep pushing forward, no matter what."`;
        authorElement.textContent = `- Anonymous`;
      }
    });
});
