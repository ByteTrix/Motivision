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

    console.log("Fetched image data:", imageData);
    console.log("Fetched quote data:", quoteData);

    // Check if imageData is valid
    const fullImageUrl = imageData?.imageUrl || 'https://via.placeholder.com/1920x1080';  // Fallback image

    // Access quote and author from the new response structure
    const quote = quoteData?.quote || "No quote available";  // Fallback quote
    const author = quoteData?.author || "Unknown";  // Fallback author

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
