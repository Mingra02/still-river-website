<?php 

include "dbconn.php";


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

$query = "
SELECT 
    f.title AS Forum_Title, 
    f.description AS Forum_Description,
    tp.id AS Topic_ID,
    tp.title AS Topic_Title,
    tp.description AS Topic_Description,
    t.id as Thread_ID,
    t.title AS Thread_Title,
    u.id AS user_id,
    u.username AS user_name, 
    p.created_at AS post_date,
    COALESCE(thread_count.Thread_Count, 0) AS Thread_Count,
    COALESCE(post_count.Post_Count, 0) AS Post_Count
FROM 
    Forums f
JOIN 
    Topics tp ON f.id = tp.forum_id
LEFT JOIN 
    Threads t ON tp.id = t.topic_id
LEFT JOIN 
    Posts p ON t.id = p.thread_id
LEFT JOIN 
    Users u ON p.user_id = u.id
LEFT JOIN 
    (SELECT 
        tp.id AS Topic_ID, 
        COUNT(DISTINCT t.id) AS Thread_Count
    FROM 
        Threads t
    RIGHT JOIN Topics tp ON t.topic_id = tp.id
    GROUP BY 
        tp.id
    ) AS thread_count ON tp.id = thread_count.Topic_ID
LEFT JOIN 
    (SELECT 
        tp.id AS Topic_ID, 
        COUNT(p.id) AS Post_Count
    FROM 
        Posts p
    RIGHT JOIN Threads t ON p.thread_id = t.id
    RIGHT JOIN Topics tp ON t.topic_id = tp.id
    GROUP BY 
        tp.id
    ) AS post_count ON tp.id = post_count.Topic_ID
GROUP BY 
    tp.id, t.id, p.id
ORDER BY 
    f.id, tp.id, p.created_at DESC
";

$stmt = $conn->prepare($query);
$stmt->execute();

$data = [];
$currentForumTitle = null;
$currentTopicTitle = null;

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($currentForumTitle !== $row['Forum_Title']) {
        $currentForum = [
            'forum_title' => $row['Forum_Title'],
            'forum_description' => $row['Forum_Description'],
            'topics' => []
        ];
        $data[] = $currentForum;
        $currentForumTitle = $row['Forum_Title'];
    }
    if ($currentTopicTitle !== $row['Topic_Title']) {
        $currentTopic = [
            'topic_id' => $row['Topic_ID'],
            'topic_title' => $row['Topic_Title'],
            'topic_description' => $row['Topic_Description'],
            'thread_count' => $row['Thread_Count'],
            'post_count' => $row['Post_Count'],
            'threads' => []
        ];
        $data[count($data) - 1]['topics'][] = $currentTopic;
        $currentTopicTitle = $row['Topic_Title'];
    }
    if ($row['Thread_ID']) {
        $currentThread = [
            'thread_id' => $row['Thread_ID'],
            'thread_title' => $row['Thread_Title'],
            'user_id' => $row['user_id'],
            'user_name' => $row['user_name'],
            'post_date' => $row['post_date']
        ];
        $topics =& $data[count($data) - 1]['topics'];
        $topics[count($topics) - 1]['threads'][] = $currentThread;
    }
} 

header('Content-Type: application/json');
echo json_encode($data);

?>
