<?php
header('Content-Type: application/json; charset=utf-8');
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
    $username = $_SESSION['login_username'];
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data && isset($data['songName']) && isset($data['songData'])) {
        $songName = mysqli_real_escape_string($db_connection, $data['songName']);
        $songData = mysqli_real_escape_string($db_connection, $data['songData']);

        $query = "INSERT INTO songs (username, song_name, content) VALUES ('$username', '$songName', '$songData')";
        if (mysqli_query($db_connection, $query)) {
            echo json_encode(['status' => 'success', 'message' => 'Song saved successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to save song']);
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
