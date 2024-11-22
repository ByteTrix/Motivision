export default async function handler(req, res) {
    // Add CORS headers to allow requests from any origin
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Allow GET and OPTIONS methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow Content-Type header
  
    // Handle preflight request (OPTIONS)
    if (req.method === "OPTIONS") {
      return res.status(200).end(); // Return 200 for preflight requests
    }
  
    // Define the Quotable API URL
    const QUOTABLE_API_URL = "https://api.quotable.io/random?tags=motivational";
  
    try {
      console.log("Fetching a quote from Quotable API...");
      const response = await fetch(QUOTABLE_API_URL);
  
      console.log("Quotable API Response Status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response from Quotable API:", errorData);
        return res.status(response.status).json({
          error: errorData?.message || "Failed to fetch quote from Quotable API",
        });
      }
  
      const quoteData = await response.json();
      console.log("Received data from Quotable API:", quoteData);
  
      // Check if the response contains valid quote data
      if (!quoteData || !quoteData.content || !quoteData.author) {
        console.error("Invalid quote data from Quotable API:", quoteData);
        return res.status(404).json({ error: "No valid quote found from Quotable API" });
      }
  
      // Return the quote and author to the client
      res.status(200).json({
        quote: quoteData.content,
        author: quoteData.author,
      });
    } catch (error) {
      console.error("Error fetching quote from Quotable API:", error);
      // Return a detailed error message
      res.status(500).json({ error: `Failed to fetch quote from Quotable API: ${error.message}` });
    }
  }
  