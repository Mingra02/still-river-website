<?php

declare(strict_types=1);

require_once('vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV["MYSQL_HOSTNAME"];
$username = $_ENV["MYSQL_ID"] . "_" . $_ENV["MYSQL_USERNAME"];
$password = $_ENV['MYSQL_PASSWORD'];
$dbname = $_ENV["MYSQL_ID"] . "_" . $_ENV["MYSQL_DBNAME"];

return $conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    die('Could not connect: ' . mysqli_error());
}

?>