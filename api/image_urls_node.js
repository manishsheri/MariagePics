// const { B2 } = require('backblaze-b2');

const B2 = require('backblaze-b2');
const cors = require('cors');
// import { B2 } from 'backblaze-b2';
import { SpeedInsights } from '@vercel/speed-insights/next';

module.exports = async (req, res) => {
    cors({ origin: '*' })(req, res, async () => {

        console.log('This is B2' + B2);
        console.log('This is res' + res);
        const b2 = new B2({
            applicationKeyId: '003736d91ee66540000000004',
            applicationKey: 'K003EcP49X39P7wch65IKI1pDEK37sU'
        });

        try {
            console.log('Authorizing B2 client...');
            let authResponse = await b2.authorize();
            console.log('B2 client authorized successfully.');
            console.log('AUTH RESPONSE IS ', authResponse.data.downloadUrl);


            //#region 
            console.log('Listing buckets...');
            const buckets = await b2.listBuckets();
            const imageUrls = [];
            console.log('Buckets:', buckets.data.buckets);

            // Loop through each bucket to list files
            for (const bucket of buckets.data.buckets) {
                console.log(`Listing files from bucket: ${bucket.bucketName}...`);
                const bucketFiles = await b2.listFileNames({
                    bucketId: bucket.bucketId,
                    maxFileCount: 1000 // You can adjust this number as needed
                });

                // Map file URLs for the current bucket
                console.log(`Mapping file URLs for bucket: ${bucket.bucketName}...`);
                const bucketImageUrls = bucketFiles.data.files.map(file => {

                    // Construct the download URL
                    const downloadUrl = `${authResponse.data.downloadUrl}/file/${bucket.bucketName}/${file.fileName}`;
                    return downloadUrl;
                }
                    // b2.getDownloadUrl({ fileId: file.fileId })
                );

                // Combine all image URLs
                imageUrls.push(...bucketImageUrls);
            }
            // Return the response
            console.log('Returning the image URLs.');

            res.status(200).json({ imageUrls });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error fetching files: ' + error.message });
        }
    })
};
