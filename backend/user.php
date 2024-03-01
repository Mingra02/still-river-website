<?php

session_save_path(__DIR__ . '/sessions');

session_start();

require __DIR__ . '/vendor/autoload.php';

use League\OAuth2\Client\Provider\Google;

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

// Database connection
$db = new PDO("mysql:host=$host;dbname=$dbname", $dbUsername, $dbPassword);

// Check if session_id is set
if (isset($_SESSION['session_id'])) {
    $sessionId = $_SESSION['session_id'];

    // Prepare SQL statement
    $stmt = $db->prepare("SELECT username, id FROM Users WHERE session_id = :session_id");
    $stmt->bindParam(':session_id', $sessionId);

    // Execute the statement
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Return the username and user_id
        header('Content-Type: application/json');
        echo json_encode(['username' => $result['username'], 'id' => $result['id']]);

    } else {
        // No user found with this session_id
        header('Content-Type: application/json');
        echo json_encode(['error' => 'No user found with this session ID.']);
    }


} else {
    // No session_id set
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No session ID set']);
}

?>