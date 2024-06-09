<?php
include '../db_connect.php'; // Adjust the path to include the correct location


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $title = $conn->real_escape_string($_POST['title']);
    $content = $conn->real_escape_string($_POST['content']);

    // Prepare the SQL statement
    $sql = "INSERT INTO posts (title, content) VALUES ('$title', '$content')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        echo "New post created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the connection
    $conn->close();
}
?>
