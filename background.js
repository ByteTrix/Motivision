chrome.runtime.onInstalled.addListener(() => {
    console.log('Minimal New Tab Extension Installed!');
  });
  
  async function fetchBackgroundImage() {
    const UNSPLASH_ACCESS_KEY = 'mpBdvwJCIICVEIAKoEWhpoqCNbbc-lh2Xa7UDog_-Ro'; // Replace with your Access Key from Unsplash
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape`);
    const data = await response.json();
    return data[0].urls.full; // Get the URL of the image
  }
  
  async function fetchQuote() {
    const response = await fetch('https://api.quotable.io/quotes/random');
    const data = await response.json();
    return {
      content: data[0].content,
      author: data[0].author
    };
  }
  
  // Send messages to the popup (index.html) to update the background and quote
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'fetchData') {
      const backgroundImage = await fetchBackgroundImage();
      const quote = await fetchQuote();
      sendResponse({ backgroundImage, quote });
    }
    return true; // Indicates asynchronous response
  });
  