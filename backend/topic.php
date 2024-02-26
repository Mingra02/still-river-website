<?php

include 'dbconn.php'; 

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['topic_id'])) {
    $threadId = $_GET['topic_id'];
    $page = isset($_GET['page']) ? $_GET['page'] : 0;
    $resultsPerPage = 20;
    $offset = $page * $resultsPerPage;

    $stmt = $conn->prepare("
SELECT
    t.id AS Thread_ID,
    t.title AS Thread_Title,
    t.created_at AS Thread_Created_At,
    thread_author.id AS Thread_Author_ID,
    thread_author.username AS Thread_Author_Username,
    latest_post.Author_ID AS Latest_Post_Author_ID,
    latest_post.Author_Username AS Latest_Post_Author_Username,
    latest_post.Latest_Post_Created_At,
    COUNT(p.id) AS Post_Count
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
            MAX(p.created_at) AS Latest_Post_Created_At
        FROM
            Posts p
        JOIN
            Users u ON p.user_id = u.id
        GROUP BY
            p.thread_id, p.user_id, u.username
    ) AS latest_post ON t.id = latest_post.thread_id
JOIN
    Posts p ON t.id = p.thread_id
WHERE
    t.topic_id = :thread_id
GROUP BY
    Thread_ID,
    Thread_Author_ID,
    Latest_Post_Author_ID
ORDER BY
    latest_post.Latest_Post_Created_At DESC
LIMIT :results_per_page OFFSET :offset
    ");
    $stmt->bindParam(':thread_id', $threadId, PDO::PARAM_INT);
    $stmt->bindValue(':results_per_page', (int) $resultsPerPage, PDO::PARAM_INT);
    $stmt->bindValue(':offset', (int) $offset, PDO::PARAM_INT);
    $stmt->execute();

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($posts);

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>