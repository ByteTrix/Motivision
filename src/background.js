chrome.runtime.onInstalled.addListener(() => {
  fetchImageAndQuote();
});

async function fetchImageAndQuote() {
  const apiUrl = "https://motivision.vercel.app/api/handler";  // Replace with your server's URL for the image

  try {
    // Fetch the image URL from the server-side handler
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.imageUrl) {
      const imageUrl = data.imageUrl;

      // Fetch a motivational quote
      const quoteData = await fetchQuote();

      if (quoteData) {
        const quote = quoteData.content;
        const author = quoteData.author;

        // Store the fetched image, quote, and author in Chrome's storage
        chrome.storage.local.set({
          backgroundImage: imageUrl,
          quote: quote,
          author: author
        });
      }
    }
  } catch (error) {
    console.error("Error fetching image and quote:", error);
  }
}

// Fetch a motivational quote
async function fetchQuote() {
  const QUOTE_API_URL = "https://api.quotable.io/random?tags=motivational";

  try {
    const response = await fetch(QUOTE_API_URL);
    const data = await response.json();

    if (data) {
      return data;  // Return quote data
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
  }

  return null;
}
