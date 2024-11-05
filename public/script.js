fetch('/api/image_urls_node')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Check if 'data.imageUrls' is defined and an array
    if (!data.imageUrls || !Array.isArray(data.imageUrls)) {
      throw new Error('Image URLs data is missing or not in expected format.');
    }

    const galleryDiv = document.querySelector(".image-gallery");

    data.imageUrls.forEach(url => {
      // Create a container for each image and its filename
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      // Create the image element
      const img = document.createElement('img');
      img.src = url.src;
      img.alt = url.name || 'Image';
      
      // Handle image loading errors
      img.onerror = () => {
        img.alt = 'Image loading failed';
        console.error(`Failed to load image at ${url.src}`);
      };

      // Create the caption with filename
      const caption = document.createElement('p');
      caption.textContent = url.name || 'Unnamed image';

      // Append image and caption to container, then to gallery
      imageContainer.appendChild(img);
      imageContainer.appendChild(caption);
      galleryDiv.appendChild(imageContainer);
    });
  })
  .catch(error => {
    console.error('Error fetching image URLs:', error);
    const galleryDiv = document.querySelector(".image-gallery");
    galleryDiv.innerHTML = '<p>An error occurred while loading images. Please try again later.</p>';
  });
