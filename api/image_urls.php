<?php
require 'vendor/autoload.php';

use BackblazeB2\Client;

$client = new Client([
    'applicationKeyId' => getenv('APPLICATION_KEY_ID'),
    'applicationKey' => getenv('APPLICATION_KEY')
]);

$bucket1 = $client->bucket('Enagement-Pics1');
$bucket2 = $client->bucket('Enagement-Pics2');

$imageUrls = [];

try {
    $files1 = $bucket1->listFiles(0, 316);
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

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
echo json_encode(['imageUrls' => $imageUrls]);
