// Import necessary packages
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // Port for the server

// Configuration
const accountId = 'YOUR_ACCOUNT_ID'; // Your Backblaze B2 account ID
const appKey = 'YOUR_APP_KEY'; // Your Backblaze B2 application key
const bucketNames = ['YOUR_BUCKET_NAME_1', 'YOUR_BUCKET_NAME_2']; // Your B2 bucket names
const baseUrl = 'https://api.backblazeb2.com'; // Base URL for B2 API

// Step 1: Get Authorization Token
async function getAuthToken() {
    const response = await axios.get(`${baseUrl}/b2api/v2/b2_authorize_account`, {
        auth: {
            username: accountId,
            password: appKey
        }
    });
    return response.data;
}

// Step 2: Get File URL
function getFileUrl(auth, bucketName, fileName) {
    const apiUrl = auth.apiUrl;
    return `${apiUrl}/file/${bucketName}/${fileName}`;
}

// Step 3: Stream Image
app.get('/stream', async (req, res) => {
    const { bucket, image } = req.query;

    if (!bucket || !image) {
        return res.status(400).send('Bucket name or image not specified.');
    }

    // Check if the specified bucket is valid
    if (!bucketNames.includes(bucket)) {
        return res.status(400).send('Invalid bucket name.');
    }

    try {
        // Get auth token
        const auth = await getAuthToken();

        // Construct file URL
        const imageUrl = getFileUrl(auth, bucket, image);

        // Stream the image
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer' // Get the image data as a buffer
        });
        
        res.set('Content-Type', imageResponse.headers['content-type']); // Set the correct content type
        res.send(imageResponse.data); // Send the image data
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
