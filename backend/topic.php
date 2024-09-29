<?php

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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['topic_id'])) {
    $topicID = $_GET['topic_id'];
    $page = isset($_GET['page']) ? $_GET['page'] : 0;
    $resultsPerPage = 20;
    $offset = $page * $resultsPerPage;

    $stmt = $conn->prepare("
SELECT
    topic.id AS topic_id,
    topic.title AS topic_title,
    topic.description AS topic_description,
    t.id AS thread_id,
    t.title AS thread_title,
    t.created_at AS thread_created_at,
    thread_author.id AS thread_author_id,
    thread_author.username AS thread_author_username,
    thread_author.avatar as thread_author_avatar,
    latest_post.Author_ID AS latest_post_author_id,
    latest_post.Author_Username AS latest_post_author_username,
    latest_post.Author_Avatar AS latest_post_author_avatar, -- Corrected typo from Avater to Avatar
    latest_post.Latest_Post_Created_At AS latest_post_created_at,
    COUNT(p.id) AS post_count
FROM
    Threads t
JOIN
    Users thread_author ON t.user_id = thread_author.id
LEFT JOIN
    (
        SELECT
            p.thread_id,
            p.user_id AS Author_ID,
            u.username AS Author_Username,
            u.avatar AS Author_Avatar, -- Corrected typo from Avater to Avatar
            p.created_at AS Latest_Post_Created_At
        FROM
            Posts p
        JOIN
            Users u ON p.user_id = u.id
        WHERE
            p.created_at IN (
                SELECT MAX(p2.created_at)
                FROM Posts p2
                WHERE p2.thread_id = p.thread_id
            )
    ) AS latest_post ON t.id = latest_post.thread_id
LEFT JOIN
    Posts p ON t.id = p.thread_id
JOIN
    Topics topic ON t.topic_id = topic.id
WHERE
    t.topic_id = :topic_id
GROUP BY
    t.id, topic.id, thread_author.id, latest_post.Author_ID, latest_post.Latest_Post_Created_At
ORDER BY
    latest_post.Latest_Post_Created_At DESC
LIMIT :results_per_page OFFSET :offset
    ");
    $stmt->bindParam(':topic_id', $topicID, PDO::PARAM_INT);
    $stmt->bindValue(':results_per_page', (int) $resultsPerPage, PDO::PARAM_INT);
    $stmt->bindValue(':offset', (int) $offset, PDO::PARAM_INT);
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if(empty($posts)) {
        $stmt = $conn->prepare("
            SELECT
                topic.id AS topic_id,
                topic.title AS topic_title,
                topic.description AS topic_description
            FROM
                Topics topic
            WHERE
                topic.id = :topic_id
        ");
        $stmt->bindParam(':topic_id', $topicID, PDO::PARAM_INT);
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode($posts);

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>