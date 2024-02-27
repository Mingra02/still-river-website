<?php

session_start();
session_regenerate_id(true);
$sessionID = session_id();

$env = getenv('PHP_ENV');

if ($env === 'production') {
    $clientID = getenv('GOOGLE_OAUTH_ID');
    $clientSecret = getenv('GOOGLE_OAUTH_SECRET');
    $host = getenv("MYSQL_HOSTNAME");
    $dbUsername = getenv("MYSQL_ID") . "_" . getenv("MYSQL_USERNAME");
    $dbPassword = getenv('MYSQL_PASSWORD');
    $dbname = getenv("MYSQL_ID") . "_" . getenv("MYSQL_DBNAME");
} else {
    $dotenvPath = __DIR__ . '/.env.dev';
    if (!file_exists($dotenvPath)) {
        exit('Environment file not found: ' . $dotenvPath);
    }
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '.env.dev');
    $dotenv->load();
    $clientID = $_ENV['GOOGLE_OAUTH_ID'];
    $clientSecret = $_ENV['GOOGLE_OUTH_SECRET'];
    $host = $_ENV["MYSQL_HOSTNAME"];
    $dbUsername = $_ENV["MYSQL_ID"] . "_" . $_ENV["MYSQL_USERNAME"];
    $dbPassword = $_ENV['MYSQL_PASSWORD'];
    $dbname = $_ENV["MYSQL_ID"] . "_" . $_ENV["MYSQL_DBNAME"];
}

$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$conn = new PDO($dsn, $dbUsername, $dbPassword, $opt);

?>