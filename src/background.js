chrome.runtime.onInstalled.addListener(() => {
  fetchImageAndQuote();
});

async function fetchImageAndQuote() {
  const apiUrl = "https://motivision.vercel.app/api/handler.js";  // Vercel-hosted API URL

  try {
    // Fetch image URL from the Vercel API
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.imageUrl) {
      const imageUrl = data.imageUrl;

      // Fetch a motivational quote
      const quoteData = await fetchQuote();

      if (quoteData) {
        const quote = quoteData.content;
        const author = quoteData.author;

        // Store the fetched image, quote, and author in Chrome's local storage
        chrome.storage.local.set({
          backgroundImage: imageUrl,
          quote: quote,
          author: author
        });

        console.log("Fetched and stored image and quote successfully.");
      }
    }
  } catch (error) {
    console.error("Error fetching image and quote:", error);
  }
}

// Fetch a motivational quote from quotable.io API
async function fetchQuote() {
  const QUOTE_API_URL = "https://api.quotable.io/random?tags=motivational";

  try {
    const response = await fetch(QUOTE_API_URL);
    const data = await response.json();

    if (data) {
      return data; // Return quote data
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
  }

  return null; // Return null if quote fetch fails
}
