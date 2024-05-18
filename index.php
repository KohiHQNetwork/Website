<?php
    $customers = array(
        // Add more customers here...
    );

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(array('error' => 'Method Not Allowed'));
        exit;
    }

    // Check if the User-Agent header is present and has the expected value
     if (isset($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'EdgeAC') !== false) {
        // Check if the key is provided in the query string
        if (isset($_GET['key'])) {
            $key = $_GET['key'];

            // Check if the key exists in the database
            if (isset($customers[$key])) {
                // Customer found, return customer information in JSON format
                echo json_encode($customers[$key]);
            } else {
                // Key not found, return an error message in JSON format
                echo json_encode(array('error' => 'Key not found'));
            }
        } else if (isset($_GET['version'])) {
            echo json_encode(array('version' => '2.05'));
            exit;
        } else {
            // Key not provided, return an error message in JSON format
            echo json_encode(array('error' => 'Key is missing'));
        }
    } else {
        // Invalid or missing User-Agent header, return an error message in JSON format
        echo json_encode(array('error' => 'Invalid User-Agent header'));
    }
    ?>
