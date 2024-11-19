document.addEventListener("DOMContentLoaded", async function () {
  const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random?client_id=mpBdvwJCIICVEIAKoEWhpoqCNbbc-lh2Xa7UDog_-Ro&count=1&query=nature&orientation=landscape";
  const QUOTE_API_URL = "https://api.quotable.io/random?tags=motivational";

  // Show the loading spinner
  document.getElementById('loader').style.display = 'block';

  try {
    // Fetch background image and quote data simultaneously
    const [imageData, quoteData] = await Promise.all([
      fetch(UNSPLASH_API_URL).then(res => res.json()),
      fetch(QUOTE_API_URL).then(res => res.json())
    ]);

    // Set background image and color
    const imageUrl = imageData[0].urls.full;
    const imageColor = imageData[0].color || '#000';
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundColor = imageColor;
    
    // Set quote and author
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    if (quoteElement && authorElement) {
      quoteElement.textContent = `"${quoteData.content}"`;
      authorElement.textContent = `- ${quoteData.author}`;
    }

    // Hide the loading spinner
    document.getElementById('loader').style.display = 'none';
    
  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Fallback quote and image if API call fails
    document.getElementById('quote').textContent = `"Error loading quote."`;
    document.getElementById('author').textContent = `- Try again later.`;
    document.body.style.backgroundColor = '#333';

    // Hide the loading spinner
    document.getElementById('loader').style.display = 'none';
  }
});
