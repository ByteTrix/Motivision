document.addEventListener('DOMContentLoaded', async () => {
  const backgroundUrl = await getBackgroundImage(); // Assuming this function gets the URL

  // Set background image to body
  document.body.style.backgroundImage = `url(${backgroundUrl})`;
  document.body.style.backgroundSize = "cover";  // Make sure the background covers the full screen
  document.body.style.backgroundPosition = "center";  // Position it at the center
});

async function getBackgroundImage() {
  const response = await fetch('https://api.unsplash.com/photos/random?client_id=YOUR_UNSPLASH_ACCESS_KEY');
  const data = await response.json();
  return data[0].urls.full;  // Getting the full image URL from the API response
}
