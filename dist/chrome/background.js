chrome.runtime.onInstalled.addListener(() => {
    fetchImageAndQuote();
  });
  
  async function fetchImageAndQuote() {
    const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random?client_id=mpBdvwJCIICVEIAKoEWhpoqCNbbc-lh2Xa7UDog_-Ro&count=1&query=nature&orientation=landscape";
    const QUOTE_API_URL = "https://api.quotable.io/random?tags=motivational";
  
    try {
      const [imageData, quoteData] = await Promise.all([
        fetch(UNSPLASH_API_URL).then(res => res.json()),
        fetch(QUOTE_API_URL).then(res => res.json())
      ]);
  
      const fullImageUrl = imageData[0].urls.regular;  // Use 'regular' for faster load
      const quote = quoteData.content;
      const author = quoteData.author;
  
      // Store the fetched image and quote in chrome storage
      chrome.storage.local.set({
        backgroundImage: fullImageUrl,
        quote: quote,
        author: author
      });
  
    } catch (error) {
      console.error("Error fetching image and quote:", error);
    }
  }
  