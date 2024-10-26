// Assuming you have a JSON file with image URLs
fetch('image_urls.json')
  .then(response => response.json())
  .then(data => {
    const galleryDiv = document.querySelector(".image-gallery");
    data.imageUrls.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Gallery Image";
      galleryDiv.appendChild(img);
    });
  })
  .catch(error => {
    console.error('Error fetching image URLs:', error);
  });