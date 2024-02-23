<?php

include "dbconn.php";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

    $result = $conn->query("SELECT * FROM User");

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["user_id"]. " - Name: " . $row["name"]. " " . $row["email"]. "<br>";
        }
    } else {
        echo "0 results";
    }
?>

<hr>

<?php

    $result = $conn->query("SELECT * FROM Forums");

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["Forum_ID"]. " - Name: " . $row["forum_title"]. " " . $row["forum_description"]. "<br>";
        }
    } else {
        echo "0 results";
    }

    ?>

    <hr>

    <?php

    $result = $conn->query("SELECT * FROM Thread");

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["Thread_ID"]. " - Name: " . $row["Topic_ID"]. " " . $row["Thread_Title"]. "<br>";
        }
    } else {
        echo "0 results";
    }

    ?>

    <hr>

    <?php

    $result = $conn->query("SELECT * FROM Topics");

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["Topic_ID"]. " - Name: " . $row["Forum_ID"]. " " . $row["Topic_Title"]. " <i>". $row["Topic_Description"] . "</i><br>";
        }
    } else {
        echo "0 results";
    }
?>
<hr>
<?php

    $result = $conn->query("SELECT * FROM Post");

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["Post_ID"]. " - Name: " . $row["Thread_ID"]. " " . $row["user_id"]. " <i>". $row["date"] . "</i>" . $row["content"] . "<br>";
        }
    } else {
        echo "0 results";
    }
?>
<hr>
<?php
    
        $result = $conn->query("SELECT f.forum_title, f.forum_description, t.Topic_Title, t.Topic_Description
        FROM Forums f, Topics t
        WHERE f.Forum_ID = t.Forum_ID
        ORDER BY f.Forum_ID, t.Topic_ID;");

        if ($result->num_rows > 0) {
            // Output data of each row
            while($row = $result->fetch_assoc()) {
                echo "Forum: " . $row["forum_title"]. " - " . $row["forum_description"]. " Topic: " . $row["Topic_Title"]. " <i>". $row["Topic_Description"] . "</i><br>";
            }
        } else {
            echo "0 results";
        }
?>


</body>
</html>