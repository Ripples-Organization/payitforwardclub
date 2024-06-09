<?php
$servername = "localhost:3306";
$username = "payibgdj_payibgdj";
$password = "Payitforward1";
$dbname = "payibgdj_payitforwardclub";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
