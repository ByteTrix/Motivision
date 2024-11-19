// api/handler.js
export default async function handler(req, res) {
    const apiKey = process.env.UNSPLASH_API;  // Securely fetch API key from environment variables
    
    // Define the Unsplash API URL
    const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=1&query=nature&orientation=landscape`;
  
    try {
      const imageData = await fetch(UNSPLASH_API_URL).then(res => res.json());
      const fullImageUrl = imageData[0].urls.regular;  // Use 'regular' for faster load
  
      // Return the image URL to the client
      res.status(200).json({ imageUrl: fullImageUrl });
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: "Failed to fetch image from Unsplash" });
    }
  }
  