// api/handler.js
export default async function handler(req, res) {
  // Add CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');  // Allow GET and OPTIONS methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow Content-Type header

  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // Return 200 for preflight requests
  }

  const apiKey = process.env.UNS_API;  // Securely fetch API key from environment variables

  if (!apiKey) {
    console.error("Unsplash API key is missing");
    return res.status(400).json({ error: "Unsplash API key is missing" });  // Handle missing API key
  }

  // Define the Unsplash API URL
  const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=1&query=nature&orientation=landscape`;

  try {
    console.log("Making request to Unsplash API...");
    const response = await fetch(UNSPLASH_API_URL);

    console.log("Unsplash API Response Status:", response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response from Unsplash:", errorData);
      return res.status(response.status).json({
        error: errorData?.errors?.[0] || "Failed to fetch image from Unsplash",
      });
    }

    const imageData = await response.json();
    console.log("Received data from Unsplash:", imageData);

    if (!imageData || imageData.length === 0 || !imageData[0]?.urls?.regular) {
      // Check if the response contains valid image data
      console.error("Invalid image data from Unsplash:", imageData);
      return res.status(404).json({ error: "No image found from Unsplash" });
    }

    const fullImageUrl = imageData[0].urls.regular;  // Use 'regular' for faster load
    console.log("Returning image URL:", fullImageUrl);

    // Return the image URL to the client
    res.status(200).json({ imageUrl: fullImageUrl });
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    // Return a detailed error message
    res.status(500).json({ error: `Failed to fetch image from Unsplash: ${error.message}` });
  }
}
