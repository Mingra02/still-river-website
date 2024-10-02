<?php

session_save_path(__DIR__ . '/sessions');

session_start();

include 'dbconn.php'; 

header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Credentials: true");

$allowedOrigins = array(
    'https://www.the-still-river.com',
    'https://the-still-river.com',
    'http://localhost:3000',
    'https://mingra02.github.io/still-river-website/'
);

if (isset($_SERVER['HTTP_ORIGIN'])) {
    if (in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $threadId = $_GET['topic_id'];
    $page = isset($_GET['page']) ? $_GET['page'] : 0;
    $resultsPerPage = 20;
    $offset = $page * $resultsPerPage;

    $stmt = $conn->prepare("
    SELECT
        (SELECT username FROM Users WHERE id = (SELECT MAX(id) FROM Users)) AS most_recent_user,
        (SELECT id FROM Users WHERE id = (SELECT MAX(id) FROM Users)) AS most_recent_user_id,
        COUNT(DISTINCT u.id) AS user_count,
        COUNT(DISTINCT p.id) AS post_count,
        COUNT(DISTINCT t.id) AS thread_count
    FROM
        Users u
    LEFT JOIN
        Posts p ON u.id = p.user_id
    LEFT JOIN
        Threads t ON u.id = t.user_id
    ");
    $stmt->execute();

    $posts = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($posts);

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>