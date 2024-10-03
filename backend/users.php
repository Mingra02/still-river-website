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

if (!isset($_SESSION['session_id']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    http_response_code(401);
    echo json_encode(['error' => 'No session ID found. Please log in.']);
    exit;
} else if (isset($_SESSION['session_id'])) {
    $sessionId = $_SESSION['session_id'];
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) {
    // Handle GET request
    $user_id = $_GET['user_id'];

    // Fetch user and post details
    $stmt = $conn->prepare("
        SELECT 
            users.id AS user_id, users.first_name AS first_name, users.last_name AS last_name,
            users.username AS username, users.created_at AS member_since, users.updated_at AS last_seen,
            users.gender AS gender, users.birthday AS birthday, users.description AS description,
            users.type AS type, users.status AS status, users.title AS title, users.avatar AS avatar,
            COUNT(DISTINCT posts.id) AS total_posts, COUNT(DISTINCT threads.id) AS total_threads
        FROM Users users
        LEFT JOIN Posts posts ON users.id = posts.user_id
        LEFT JOIN Threads threads ON posts.thread_id = threads.id
        WHERE users.id = :user_id
    ");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    // Fetch recent activity (recent posts by the user)
    $activityStmt = $conn->prepare("
        SELECT 
            posts.content AS post_content, posts.created_at AS post_time, threads.title AS thread_title, threads.id AS thread_id, posts.id AS post_id
        FROM Posts posts
        JOIN Threads threads ON posts.thread_id = threads.id
        WHERE posts.user_id = :user_id
        ORDER BY posts.created_at DESC
        LIMIT 5
    ");
    $activityStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $activityStmt->execute();
    $recentActivity = $activityStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch profile posts for the user
    $profilePostStmt = $conn->prepare("
        SELECT 
            from_users.username AS from_username, from_users.id AS from_user_id, from_users.avatar AS from_users_avatar, 
            to_users.username AS to_username, to_users.id AS to_user_id, to_users.avatar AS to_users_avatar, 
            profileposts.content AS content, profileposts.created_at AS created_at, profileposts.id AS post_id
        FROM ProfilePosts profileposts
        JOIN Users from_users ON profileposts.from_user_id = from_users.id
        JOIN Users to_users ON profileposts.to_user_id = to_users.id
        WHERE to_users.id = :user_id
        ORDER BY profileposts.created_at DESC
    ");
    $profilePostStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $profilePostStmt->execute();
    $profilePosts = $profilePostStmt->fetchAll(PDO::FETCH_ASSOC);

    // Prepare the final response data
    $response = [
        'user_id' => (int)$userData['user_id'] ?? 0,
        'first_name' => $userData['first_name'] ?? '',
        'last_name' => $userData['last_name'] ?? '',
        'username' => $userData['username'] ?? '',
        'member_since' => $userData['member_since'] ?? '',
        'last_seen' => $userData['last_seen'] ?? '',
        'gender' => $userData['gender'] ?? '',
        'birthday' => $userData['birthday'] ?? '',
        'total_posts' => (int)$userData['total_posts'] ?? 0,
        'total_threads' => (int)$userData['total_threads'] ?? 0,
        'recent_activity' => $recentActivity,
        'profile_posts' => $profilePosts,
        'description' => $userData['description'] ?? '',
        'type' => $userData['type'] ?? '',
        'status' => $userData['status'] ?? '',
        'title' => $userData['title'] ?? '',
        'avatar' => (int)$userData['avatar'] ?? 0
    ];

    echo json_encode($response);

} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['summary']) ){
    // Select Most Active Users

    $stats = $_GET['summary'];

    if ($stats === '1') {
        
        $stmt = $conn->prepare("
        SELECT 
            users.id AS user_id, 
            users.first_name AS first_name, 
            users.last_name AS last_name,
            users.username AS username, 
            users.created_at AS member_since, 
            users.updated_at AS last_seen,
            users.gender AS gender, 
            users.birthday AS birthday, 
            users.description AS description,
            users.type AS type, 
            users.status AS status, 
            users.title AS title, 
            users.avatar AS avatar,
            IFNULL(post_counts.total_posts, 0) AS total_posts  -- Ensure zero is returned if no posts
        FROM Users users
        LEFT JOIN (
            SELECT user_id, COUNT(id) AS total_posts
            FROM Posts
            GROUP BY user_id
        ) post_counts ON users.id = post_counts.user_id
        ORDER BY post_counts.total_posts DESC
        LIMIT 5;
        ");
        $stmt->execute();
        $statsSend = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($statsSend);
    } else if ($stats === '2') {
        // Select most recent users
        $stmt = $conn->prepare("
        SELECT 
            users.id AS user_id, 
            users.first_name AS first_name, 
            users.last_name AS last_name,
            users.username AS username, 
            users.created_at AS member_since, 
            users.updated_at AS last_seen,
            users.gender AS gender, 
            users.birthday AS birthday, 
            users.description AS description,
            users.type AS type, 
            users.status AS status, 
            users.title AS title, 
            users.avatar AS avatar,
            IFNULL(post_counts.total_posts, 0) AS total_posts  -- Ensure zero is returned if no posts
        FROM Users users
        LEFT JOIN (
            SELECT user_id, COUNT(id) AS total_posts
            FROM Posts
            GROUP BY user_id
        ) post_counts ON users.id = post_counts.user_id
        ORDER BY users.created_at DESC
        LIMIT 5;
        ");
        $stmt->execute();
        $statsSend = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($statsSend);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid stats parameter']);
    }

} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['search'])) {

    $search = $_GET['search'];

    $stmt = $conn->prepare("
        SELECT 
            users.id AS user_id, users.first_name AS first_name, users.last_name AS last_name,
            users.username AS username, users.created_at AS member_since, users.updated_at AS last_seen,
            users.gender AS gender, users.birthday AS birthday, users.description AS description,
            users.type AS type, users.status AS status, users.title AS title, users.avatar AS avatar
        FROM Users users
        WHERE users.username LIKE :search
        ORDER BY users.username ASC
    ");

    $stmt->execute([':search' => '%' . $search . '%']);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);

} else if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['content'], $data['to_user_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: content or to_user_id.']);
        exit;
    }

    $content = $data['content'];
    $to_user_id = $data['to_user_id'];

    try {
        $stmt = $conn->prepare("
            INSERT INTO ProfilePosts (content, to_user_id, from_user_id, created_at) 
            VALUES (:content, :to_user_id, (SELECT id FROM Users WHERE session_id = :session_id), NOW())
        ");
        $stmt->execute([
            ':content' => $content,
            ':to_user_id' => $to_user_id,
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
    echo json_encode(['error' => 'Method not allowed']);
}

?>
