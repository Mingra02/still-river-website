<?php

session_save_path(__DIR__ . '/sessions');
session_start();


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

require 'dbconn.php';

if (!isset($_SESSION['session_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No session ID found. Please log in.']);
    exit;
}

$sessionId = $_SESSION['session_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['message'], $data['thread_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: message or thread_id.']);
        exit;
    }

    $message = $data['message'];
    $threadId = $data['thread_id'];

    try {
        $stmt = $conn->prepare("
            INSERT INTO Posts (content, thread_id, user_id, created_at) 
            VALUES (:message, :thread_id, (SELECT id FROM Users WHERE session_id = :session_id), NOW())
        ");
        $stmt->execute([
            ':message' => $message,
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