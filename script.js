fetch('https://mariage-pics.vercel.app/image-urls.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const galleryDiv = document.querySelector(".image-gallery");

    data.imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = "Gallery Image";
      img.onerror = () => {
        img.src = 'error.jpg'; // Replace 'error.jpg' with a default error image
        img.alt = 'Image loading failed';
      };
      galleryDiv.appendChild(img);
    });
  })
  .catch(error => {
    console.error('Error fetching image URLs:', error);
    const galleryDiv = document.querySelector(".image-gallery");
    galleryDiv.innerHTML = '<p>An error occurred while loading images. Please try again later.</p>';
  });
