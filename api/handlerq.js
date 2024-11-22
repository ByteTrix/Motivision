export default async function handler(req, res) {
  // Add CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Allow GET and OPTIONS methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow Content-Type header

  // Handle preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Return 200 for preflight requests
  }

  // Define the ZenQuotes API URL
  const ZENQUOTES_API_URL = "https://zenquotes.io/api/random";

  try {
    console.log("Fetching a quote from ZenQuotes API...");
    const response = await fetch(ZENQUOTES_API_URL);

    console.log("ZenQuotes API Response Status:", response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response from ZenQuotes API:", errorData);
      return res.status(response.status).json({
        error: errorData?.message || "Failed to fetch quote from ZenQuotes API",
      });
    }

    const quoteData = await response.json();
    console.log("Received data from ZenQuotes API:", quoteData);

    // Check if the response contains valid quote data
    if (!quoteData || !quoteData[0]?.q || !quoteData[0]?.a) {
      console.error("Invalid quote data from ZenQuotes API:", quoteData);
      return res.status(404).json({ error: "No valid quote found from ZenQuotes API" });
    }

    // Return the quote and author to the client
    res.status(200).json({
      quote: quoteData[0].q,  // The quote text
      author: quoteData[0].a, // The author name
    });
  } catch (error) {
    console.error("Error fetching quote from ZenQuotes API:", error);
    // Return a detailed error message
    res.status(500).json({ error: `Failed to fetch quote from ZenQuotes API: ${error.message}` });
  }
}
