<?php
include(__DIR__ . "/../../config/config.php");

if (!isset($_SESSION['login_username'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

$username = $_SESSION['login_username'];
$songName = isset($_GET['song_name']) ? mysqli_real_escape_string($db_connection, $_GET['song_name']) : null;

if ($songName) {
    // Fetch a specific song by name
    $query = "SELECT content FROM songs WHERE song_name = '$songName'";
    $result = mysqli_query($db_connection, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode(['status' => 'success', 'song_content' => $row['content']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Song not found']);
    }
} else {
    // Fetch all songs if no specific song is requested
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
}

mysqli_close($db_connection);
?>
