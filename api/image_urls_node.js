const { B2 } = require('backblaze-b2');

module.exports = async (req, res) => {
    console.log('This is B2' + B2);
    console.log('This is res' + res);
    const b2 = new B2({
        applicationKeyId: '003736d91ee66540000000004',
        applicationKey: 'K003EcP49X39P7wch65IKI1pDEK37sU'
    });

    try {
        console.log('Authorizing B2 client...');
        await b2.authorize();
        console.log('B2 client authorized successfully.');

        console.log('Listing files from bucket 1...');
        const bucket1Files = await b2.listFileNames({
            bucketId: 'Enagement-Pics1',
            maxFileCount: 316
        });
        console.log('Listing files from bucket 2...');
        const bucket2Files = await b2.listFileNames({
            bucketId: 'Enagement-Pics2',
            maxFileCount: 447
        });


        // Map file URLs
        console.log('Mapping file URLs...');
        const imageUrls = [
            ...bucket1Files.data.files.map(file => b2.getDownloadUrl({ fileId: file.fileId })),
            ...bucket2Files.data.files.map(file => b2.getDownloadUrl({ fileId: file.fileId }))
        ];

        // Return the response
        console.log('Returning the image URLs.');

        res.status(200).json({ imageUrls });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching files: ' + error.message });
    }
};
