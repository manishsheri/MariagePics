<?php
require 'vendor/autoload.php';

use BackblazeB2\Client;

$client = new Client([
    'applicationKeyId' => '003736d91ee66540000000003',
    'applicationKey' => 'K003fpvDi3rZxjj/i1BKLEg0svGA7u0'
]);

$bucket1 = $client->bucket('Enagement-Pics1');
$bucket2 = $client->bucket('Enagement-Pics2');

$imageUrls = [];

try {
    $files1 = $bucket1->listFiles(0, 316); // Fetch 100 files at a time
    $files2 = $bucket2->listFiles(0, 447);

    foreach ($files1 as $file) {
        $imageUrls[] = $file->getUrl();
    }

    foreach ($files2 as $file) {
        $imageUrls[] = $file->getUrl();
    }
} catch (Exception $e) {
    // Handle exceptions, e.g., log the error or display an error message
    echo 'Error fetching files: ' . $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode(['imageUrls' => $imageUrls]);