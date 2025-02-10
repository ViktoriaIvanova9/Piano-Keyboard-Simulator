<?php
include(__DIR__ . "/../../config/config.php");

if (!isset($_SESSION['login_username'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

$username = $_SESSION['login_username'];
$query = "SELECT id, song_name, content FROM songs WHERE username = '$username'";
$result = mysqli_query($db_connection, $query);

if ($result) {
    $songs = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $songs[] = $row;
    }
    echo json_encode(['status' => 'success', 'songs' => $songs]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch songs']);
}

mysqli_close($db_connection);
?>