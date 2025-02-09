<?php
header('Content-Type: application/json; charset=utf-8');
session_start();
include(__DIR__ . "/../../config/config.php");

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the user is logged in
if (!isset($_SESSION['login_username'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

// Ensure the database connection exists
if (!$db_connection) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit();
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $jsonData = file_get_contents('php://input');

    // Decode the JSON data
    $songData = json_decode($jsonData, true);

    // Validate the JSON data
    if (json_last_error() === JSON_ERROR_NONE && is_array($songData)) {
        // Get the username from the session
        $username = $_SESSION['login_username'];

        // Encode the song data back to JSON for storage
        $songJson = json_encode($songData);
        
        // Ensure encoding didn't fail
        if ($songJson === false) {
            echo json_encode(['status' => 'error', 'message' => 'JSON encoding error']);
            exit();
        }

        // Prepare the SQL query
        $query = "INSERT INTO songs_data (username, song_data) VALUES (?, ?)";
        $stmt = mysqli_prepare($db_connection, $query);

        if ($stmt) {
            // Bind parameters
            mysqli_stmt_bind_param($stmt, "ss", $username, $songJson);

            // Execute the query
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['status' => 'success', 'message' => 'Song saved successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to save song: ' . mysqli_error($db_connection)]);
            }

            // Close the statement
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to prepare SQL statement']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid song data']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

// Close the database connection
mysqli_close($db_connection);
?>
