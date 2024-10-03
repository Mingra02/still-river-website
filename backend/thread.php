<?php

session_save_path(__DIR__ . '/sessions');

session_start();

// Assuming you have a PDO connection setup as $conn
include 'dbconn.php'; // Include your database connection file

header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Credentials: true");

$allowedOrigins = array(
    'https://www.the-still-river.com',
    'https://the-still-river.com',
    'http://localhost:3000',
    'https://mingra02.github.io'
);

if (isset($_SERVER['HTTP_ORIGIN'])) {
    if (in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['thread_id'])) {
    // Handle GET request
    $threadId = $_GET['thread_id'];

    $stmt = $conn->prepare("
        SELECT topic.id as topic_id, topic.title as topic_title, t.id AS thread_id, t.title AS thread_title, p.id AS post_id, p.content, p.created_at, u.id AS user_id, u.username AS username, u.avatar as avatar
        FROM Posts p
        JOIN Users u ON p.user_id = u.id
        JOIN Threads t ON p.thread_id = t.id
        JOIN Topics topic ON t.topic_id = topic.id
        WHERE p.thread_id = :thread_id
        ORDER BY p.created_at ASC;
    ");
    $stmt->bindParam(':thread_id', $threadId, PDO::PARAM_INT);
    $stmt->execute();

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($posts);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['session_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Please log in to create a thread']);
        exit;
    }

    $sessionId = $_SESSION['session_id'];

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT username, id FROM Users WHERE session_id = :session_id");
    $stmt->bindParam(':session_id', $sessionId);

    // Execute the statement
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Handle POST request
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['title'], $data['content'], $data['topic_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing title or content']);
        exit;
    }

    $stmt = $conn->prepare("
        INSERT INTO Threads (title, user_id, topic_id, created_at)
        VALUES (:title, :user_id, :topic_id, NOW());
    ");
    $stmt->execute([
        ':title' => $data['title'],
        ':topic_id' => $data['topic_id'],
        ':user_id' => $result['id']
    ]);
    $threadId = $conn->lastInsertId();

    $stmt = $conn->prepare("
        INSERT INTO Posts (thread_id, user_id, content, created_at)
        VALUES (:thread_id, :user_id, :content, NOW());
    ");
    $stmt->execute([
        ':thread_id' => $threadId,
        ':user_id' => $result['id'],
        ':content' => $data['content']
    ]);

    http_response_code(201);
    echo json_encode(['message' => 'Thread created successfully', 'thread_id' => $threadId]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>