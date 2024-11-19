// api/handler.js
export default async function handler(req, res) {
  const apiKey = process.env.UNSPLASH_API;  // Securely fetch API key from environment variables

  if (!apiKey) {
    return res.status(400).json({ error: "Unsplash API key is missing" });  // Handle missing API key
  }

  // Define the Unsplash API URL
  const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=1&query=nature&orientation=landscape`;

  try {
    const response = await fetch(UNSPLASH_API_URL);

    if (!response.ok) {
      // If the response is not ok (e.g., 400 or 500 error), return an error message
      const errorData = await response.json();
      return res.status(response.status).json({
        error: errorData?.errors?.[0] || "Failed to fetch image from Unsplash",
      });
    }

    const imageData = await response.json();

    if (!imageData || imageData.length === 0 || !imageData[0]?.urls?.regular) {
      // Check if the response contains valid image data
      return res.status(404).json({ error: "No image found from Unsplash" });
    }

    const fullImageUrl = imageData[0].urls.regular;  // Use 'regular' for faster load

    // Return the image URL to the client
    res.status(200).json({ imageUrl: fullImageUrl });
  } catch (error) {
    console.error("Error fetching image:", error);
    // Return a detailed error message
    res.status(500).json({ error: `Failed to fetch image from Unsplash: ${error.message}` });
  }
}
