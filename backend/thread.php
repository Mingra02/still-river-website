<?php

// Assuming you have a PDO connection setup as $conn
include 'dbconn.php'; // Include your database connection file

header('Content-Type: application/json');

session_start();

if (!isset($_SESSION['session_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No session ID found. Please log in.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['thread_id'])) {
    // Handle GET request
    $threadId = $_GET['thread_id'];

    $stmt = $conn->prepare("
        SELECT p.id, p.content, p.created_at, u.username AS author
        FROM Posts p
        JOIN Users u ON p.user_id = u.id
        WHERE p.thread_id = :thread_id
        ORDER BY p.created_at DESC
    ");
    $stmt->bindParam(':thread_id', $threadId, PDO::PARAM_INT);
    $stmt->execute();

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($posts);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['title'], $data['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing title or content']);
        exit;
    }

    $sessionId = $_SESSION['session_id'];

    $stmt = $conn->prepare("
        INSERT INTO Threads (title, user_id, created_at)
        VALUES (:title, (SELECT id FROM Users WHERE session_id = :session_id), NOW());
    ");
    $stmt->execute([
        ':title' => $data['title'],
        ':session_id' => $sessionId
    ]);
    $threadId = $conn->lastInsertId();

    $stmt = $conn->prepare("
        INSERT INTO Posts (thread_id, user_id, content, created_at)
        VALUES (:thread_id, (SELECT id FROM Users WHERE session_id = :session_id), :content, NOW());
    ");
    $stmt->execute([
        ':thread_id' => $threadId,
        ':session_id' => $sessionId,
        ':content' => $data['content']
    ]);

    http_response_code(201);
    echo json_encode(['message' => 'Thread created successfully', 'thread_id' => $threadId]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>