<?php
require 'vendor/autoload.php';

use BackblazeB2\Client;

$client = new Client([
    'applicationKeyId' => '003736d91ee66540000000004',
    'applicationKey' => 'K003EcP49X39P7wch65IKI1pDEK37sU'
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
    
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo json_encode(['imageUrls' => $imageUrls]);
    
} catch (Exception $e) {
    // Handle exceptions, e.g., log the error or display an error message
    // Return an error response in JSON format
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json', true, 500);
    echo json_encode(['error' => 'Error fetching files: ' . $e->getMessage()]);
}

