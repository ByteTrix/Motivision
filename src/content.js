document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById('loader');
  const quoteContainer = document.getElementById('quote-container');
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  // Show the loader initially
  loader.style.display = 'block';

  // Fetch and display stored content first, then update in the background
  chrome.storage.local.get(['backgroundImage', 'quote', 'author'], function (data) {
    // Display stored background image
    if (data.backgroundImage) {
      document.body.style.backgroundImage = `url(${data.backgroundImage})`;
    } else {
      document.body.style.backgroundColor = "#333"; // Fallback plain color
      console.log("No stored image found, applying fallback color.");
    }

    // Display stored quote and author
    if (data.quote && data.author) {
      quoteElement.textContent = `"${data.quote}"`;
      authorElement.textContent = `- ${data.author}`;
      console.log(`Displayed stored quote: "${data.quote}" by ${data.author}`);
    } else {
      quoteElement.textContent = "Sorry, no quote is available.";
      authorElement.textContent = "";
      console.log("No stored quote found, displaying placeholder message.");
    }

    // Hide the loader and display the content
    loader.style.display = 'none';
    quoteContainer.style.display = 'block';

    // Fetch new image and quote in the background
    fetchImage();
    fetchQuote();
  });

  // Fetch a new background image from your Vercel-hosted API
  async function fetchImage() {
    const API_URL = "https://motivision.vercel.app/api/handler.js"; // URL to Vercel-hosted API

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data && data.imageUrl) {
        const imageUrl = data.imageUrl;
        chrome.storage.local.set({ backgroundImage: imageUrl }); // Store new image URL
        document.body.style.backgroundImage = `url(${imageUrl})`; // Update background image
        console.log("Fetched and stored new image URL.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  // Fetch a new motivational quote from quotable.io
  async function fetchQuote() {
    const QUOTE_API_URL = "https://api.quotable.io/random?tags=motivational";

    try {
      const response = await fetch(QUOTE_API_URL);
      const quoteData = await response.json();

      if (quoteData) {
        const newQuote = quoteData.content;
        const newAuthor = quoteData.author;
        chrome.storage.local.set({
          quote: newQuote,
          author: newAuthor,
        });

        console.log(`Fetched and stored new quote: "${newQuote}" by ${newAuthor}`);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }
});
