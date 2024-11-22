chrome.runtime.onInstalled.addListener(() => {
  fetchImageAndQuote();
});

async function fetchImageAndQuote() {
  // Updated API URLs
  const UNSPLASH_API_URL = "https://motivision.vercel.app/api/handler.js";  // Vercel-hosted API for image
  const QUOTE_API_URL = "https://motivision.vercel.app/api/handlerq.js";  // Your ZenQuotes API URL

  try {
    // Fetch image and quote in parallel
    const [imageData, quoteData] = await Promise.all([
      fetch(UNSPLASH_API_URL).then(res => res.json()),  // Fetch image from Vercel API
      fetch(QUOTE_API_URL).then(res => res.json())     // Fetch quote from ZenQuotes API
    ]);

    // Assuming the Vercel API responds with an imageUrl field
    const fullImageUrl = imageData.imageUrl;

    // Assuming ZenQuotes API response is structured like this:
    const quote = quoteData[0].q;  // quote content
    const author = quoteData[0].a; // author of the quote

    // Store the fetched image and quote in Chrome storage
    chrome.storage.local.set({
      backgroundImage: fullImageUrl,
      quote: quote,
      author: author
    });

    console.log("Fetched and stored new image and quote successfully.");
  } catch (error) {
    console.error("Error fetching image and quote:", error);
  }
}
