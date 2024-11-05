fetch('/api/image_urls_node')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.error) {
      throw new Error(data.error);
    }
    const galleryDiv = document.querySelector(".image-gallery");

    data.imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url.src;
      img.alt = url.name;
      img.onerror = () => {
        // img.src = 'error.jpg'; // Replace 'error.jpg' with a default error image
        img.alt = 'Image loading failed';
        console.error(`Failed to load image at ${url}`);
      };
      const caption = document.createElement('p');
      caption.textContent = url.name;
      galleryDiv.appendChild(img);
      imageContainer.appendChild(caption);
      gallery.appendChild(imageContainer);
    });
  })
  .catch(error => {
    console.error('Error fetching image URLs:', error);
    const galleryDiv = document.querySelector(".image-gallery");
    galleryDiv.innerHTML = '<p>An error occurred while loading images. Please try again later.</p>';
  });
