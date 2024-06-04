<?php

$title = $_POST["title"];
$content = $_POST["content"];

 
$servername = "localhost";
$dbname = "payibgdj_payitforwardclub";
$username = "payibgdj_payibgdj";
$pass = "Payitforward1";
        
$conn = mysqli_connect($servername, $username, $pass, $dbname);
        
if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}           
        
$sql = "INSERT INTO post (title, body)
        VALUES (?, ?)";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
 
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "ss",
                       $title,
                       $content);

mysqli_stmt_execute($stmt);

echo "Record saved.";
?>