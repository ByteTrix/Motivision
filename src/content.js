document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById('loader');
  const quoteContainer = document.getElementById('quote-container');
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  // Show the loader initially
  loader.style.display = 'block';

  // Display stored content and fetch new data in the background
  chrome.storage.local.get(['backgroundImage', 'quote', 'author'], function (data) {
    // Display stored image
    if (data.backgroundImage) {
      document.body.style.backgroundImage = `url(${data.backgroundImage})`;
    } else {
      document.body.style.backgroundColor = "#333"; // Fallback plain color
      console.log("No stored image found, applying fallback color.");
    }

    // Display stored quote
    if (data.quote && data.author) {
      quoteElement.textContent = `"${data.quote}"`;
      authorElement.textContent = `- ${data.author}`;
      console.log(`Displayed stored quote: "${data.quote}" by ${data.author}`);
    } else {
      quoteElement.textContent = "Sorry, no quote is available.";
      authorElement.textContent = "";
      console.log("No stored quote found, displaying placeholder message.");
    }

    // Hide the loader and show the content
    loader.style.display = 'none';
    quoteContainer.style.display = 'block';

    // Fetch new image and quote in the background
    fetchImage();
    fetchQuote();
  });

  // Fetch and store a new image
  async function fetchImage() {
    const UNSPLASH_API_URL = "https://motivision.vercel.app/api/handler.js";  // Updated URL to your Vercel-hosted API

    console.log("Fetching new image...");
    try {
      const imageData = await fetch(UNSPLASH_API_URL).then(res => res.json());
      const fullImageUrl = imageData.imageUrl;

      chrome.storage.local.set({ backgroundImage: fullImageUrl });
      console.log("Fetched and stored new image URL.");
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  // Fetch and store a new quote
  async function fetchQuote() {
    const QUOTE_API_URL = "https://api.quotable.io/random?tags=motivational";

    console.log("Fetching new quote...");
    try {
      const quoteData = await fetch(QUOTE_API_URL).then(res => res.json());
      const newQuote = quoteData.content;
      const newAuthor = quoteData.author;

      chrome.storage.local.set({
        quote: newQuote,
        author: newAuthor,
      });

      console.log(`Fetched and stored new quote: "${newQuote}" by ${newAuthor}`);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }
});
