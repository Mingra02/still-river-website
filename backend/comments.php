<?php

session_save_path(__DIR__ . '/sessions');
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['slug'])) {
    $slug = $_GET['slug'];
    $page = isset($_GET['page']) ? intval($_GET['page']) : 0;
    $resultsPerPage = 10;
    $offset = $page * $resultsPerPage;

    $stmt = $conn->prepare(
        "SELECT c.id, c.blog_slug, c.content, c.created_at, u.id AS user_id, u.username, u.avatar
         FROM BlogComments c
         JOIN Users u ON c.user_id = u.id
         WHERE c.blog_slug = :slug
         ORDER BY c.created_at DESC
         LIMIT :limit OFFSET :offset"
    );
    $stmt->bindParam(':slug', $slug);
    $stmt->bindParam(':limit', $resultsPerPage, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($comments);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['session_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Please log in to comment']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['slug'], $data['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing slug or content']);
        exit;
    }

    $sessionId = $_SESSION['session_id'];
    $stmt = $conn->prepare("SELECT id FROM Users WHERE session_id = :session_id");
    $stmt->bindParam(':session_id', $sessionId);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    $stmt = $conn->prepare(
        "INSERT INTO BlogComments (blog_slug, user_id, content, created_at)
         VALUES (:slug, :user_id, :content, NOW())"
    );
    $stmt->execute([
        ':slug' => $data['slug'],
        ':user_id' => $user['id'],
        ':content' => $data['content']
    ]);

    $commentId = $conn->lastInsertId();
    http_response_code(201);
    echo json_encode(['message' => 'Comment created', 'comment_id' => $commentId]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);

?>
