<?php

include 'dbconn.php'; 

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $threadId = $_GET['topic_id'];
    $page = isset($_GET['page']) ? $_GET['page'] : 0;
    $resultsPerPage = 20;
    $offset = $page * $resultsPerPage;

    $stmt = $conn->prepare("
    SELECT t.id AS thread_id, t.title AS thread_title, u.id AS user_id, u.username, p.created_at
    FROM (
        SELECT thread_id, MAX(id) AS post_id
        FROM Posts
        GROUP BY thread_id
        ORDER BY post_id DESC
        LIMIT 3
    ) AS recent_posts
    JOIN Posts p ON recent_posts.post_id = p.id
    JOIN Users u ON p.user_id = u.id
    JOIN Threads t ON p.thread_id = t.id
    ORDER BY p.created_at DESC
    ");
    $stmt->execute();

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($posts);

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>