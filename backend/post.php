<?php

session_start(); 

require 'dbconn.php';

if (!isset($_SESSION['session_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No session ID found. Please log in.']);
    exit;
}

$sessionId = $_SESSION['session_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['content'], $data['thread_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: content or thread_id.']);
        exit;
    }

    $content = $data['content'];
    $threadId = $data['thread_id'];

    try {
        $stmt = $conn->prepare("
            INSERT INTO Posts (content, thread_id, user_id, created_at) 
            VALUES (:content, :thread_id, (SELECT id FROM Users WHERE session_id = :session_id), NOW())
        ");
        $stmt->execute([
            ':content' => $content,
            ':thread_id' => $threadId,
            ':session_id' => $sessionId
        ]);

        $postId = $conn->lastInsertId();
        http_response_code(201);
        echo json_encode(['message' => 'Post created successfully', 'post_id' => $postId]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to insert post: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'This endpoint accepts only POST requests.']);
}

?>