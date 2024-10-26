// Import necessary packages
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // Port for the server

// Configuration
const accountId = '003736d91ee66540000000004'; // Your Backblaze B2 account ID
const appKey = 'K003EcP49X39P7wch65IKI1pDEK37sU'; // Your Backblaze B2 application key
const bucketNames = ['Enagement-Pics1', 'Enagement-Pics2']; // Your B2 bucket names
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

