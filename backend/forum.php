<?php 

include "dbconn.php";

$query = "
SELECT 
f.Forum_Title, 
f.Forum_Description,
tp.Topic_Title,
tp.Topic_Description,
t.Thread_Title,
u.name AS user_name, 
p.date AS post_date 
FROM 
Post p
JOIN 
Thread t ON p.Thread_ID = t.Thread_ID
JOIN 
Topics tp ON t.Topic_ID = tp.Topic_ID
JOIN 
Forums f ON tp.Forum_ID = f.Forum_ID
JOIN 
User u ON p.user_id = u.user_id
JOIN 
(SELECT 
    tp.Topic_ID, 
    MAX(p.date) AS MaxDate
 FROM 
    Post p
 JOIN Thread t ON p.Thread_ID = t.Thread_ID
 JOIN Topics tp ON t.Topic_ID = tp.Topic_ID
 GROUP BY 
    tp.Topic_ID) AS latestPost ON tp.Topic_ID = latestPost.Topic_ID AND p.date = latestPost.MaxDate
ORDER BY 
f.Forum_ID,
tp.Topic_ID, 
p.date DESC;";

$result = $conn->query($query);

$data = [];
$currentForum = null;
$currentTopic = null;

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if ($currentForum === null || $currentForum['forum_title'] !== $row['Forum_Title']) {
            $currentForum = [
                'forum_title' => $row['Forum_Title'],
                'forum_desc' => $row['Forum_Description'],
                'topics' => []
            ];
            $data[] = &$currentForum;
            $currentTopic = null;
        }
        if ($currentTopic === null || $currentTopic['topic_title'] !== $row['Topic_Title']) {
            $currentTopic = [
                'topic_title' => $row['Topic_Title'],
                'topic_desc' => $row['Topic_Description'],
                'threads' => []
            ];
            $currentForum['topics'][] = &$currentTopic;
        }
        $currentTopic['threads'][] = [
            'thread_title' => $row['Thread_Title'],
            'user_name' => $row['user_name'],
            'post_date' => $row['post_date']
        ];
    }
} 

header('Content-Type: application/json');
echo json_encode($data);

?>