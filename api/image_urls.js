const { B2 } = require('backblaze-b2');

module.exports = async (req, res) => {
    const b2 = new B2({
        applicationKeyId: '003736d91ee66540000000004',
        applicationKey: 'K003EcP49X39P7wch65IKI1pDEK37sU'
    });

    try {
        const bucket1Files = await b2.listFileNames({
            bucketId: 'Enagement-Pics1',
            maxFileCount: 316
        });

        const bucket2Files = await b2.listFileNames({
            bucketId: 'Enagement-Pics2',
            maxFileCount: 447
        });

        const imageUrls = [
            ...bucket1Files.data.files.map(file => b2.getDownloadUrl({ fileId: file.fileId })),
            ...bucket2Files.data.files.map(file => b2.getDownloadUrl({ fileId: file.fileId }))
        ];

        res.status(200).json({ imageUrls });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching files: ' + error.message });
    }
};