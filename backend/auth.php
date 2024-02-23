<?php

require __DIR__ . '/vendor/autoload.php';

use League\OAuth2\Client\Provider\Google;

session_save_path(__DIR__ . '/sessions');

session_start();
session_regenerate_id(true);
$sessionID = session_id();
        
$_SESSION['session_id'] = $sessionID;
$cookieParams = session_get_cookie_params();
session_set_cookie_params([
    'lifetime' => $cookieParams["lifetime"],
    'path' => '/',
    'domain' => $cookieParams["domain"],
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);

$_SESSION['expiry'] = time() + 86400;

$redirect_url = "https://www.the-still-river.com/";

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

$provider = new Google([
    'clientId'     => $clientID,
    'clientSecret' => $clientSecret,
    'redirectUri'  => 'https://www.the-still-river.com/api/forum/auth.php',
    // 'hostedDomain' => 'the-still-river.com', 
]);

if (!empty($_GET['error'])) {

    exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));

} elseif (empty($_GET['code'])) {

    // Check if session has already been set
    if (isset($_SESSION['session_id'])) {
        // Check for user in database
        $sessionID = $_SESSION['session_id'];
        $db = new PDO("mysql:host=$host;dbname=$dbname", $dbUsername, $dbPassword);
        $stmt = $db->prepare("SELECT id FROM Users WHERE session_id = :session_id");
        $stmt->bindParam(':session_id', $sessionID);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $_SESSION['user_id'] = $result['id'];
            $cookieParams = session_get_cookie_params();
            session_set_cookie_params([
                'lifetime' => $cookieParams["lifetime"],
                'path' => '/',
                'domain' => $cookieParams["domain"],
                'secure' => true,
                'httponly' => true,
                'samesite' => 'Lax'
            ]);
            $_SESSION['expiry'] = time() + 86400;

            header('Location: ' . $redirect_url);
        } else {
            unset($_SESSION['session_id']);
            unset($_SESSION['oath2state']);

            $authUrl = $provider->getAuthorizationUrl();
            $_SESSION['oauth2state'] = $provider->getState();
            header('Location: ' . $authUrl);

            exit;
        }


    } else {
        unset($_SESSION['oauth2state']);
        $authUrl = $provider->getAuthorizationUrl();
        $_SESSION['oauth2state'] = $provider->getState();
        header('Location: ' . $authUrl);
        exit;
    }

} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

    // State is invalid, possible CSRF attack in progress
    $authUrl = $provider->getAuthorizationUrl();
    $_SESSION['oauth2state'] = $provider->getState();
    header('Location: ' . $authUrl);

} else {

    // Try to get an access token (using the authorization code grant)
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);

    // Optional: Now you have a token you can look up a users profile data
    try {

        // We got an access token, let's now get the owner details
        $ownerDetails = $provider->getResourceOwner($token);

        // Values accessible through google api
        // echo $ownerDetails->getId();
        // echo $ownerDetails->getEmail();
        // echo $ownerDetails->getName();
        // echo $ownerDetails->getFirstName();
        // echo $ownerDetails->getLastName();
        // echo $ownerDetails->getAvatar();
        // echo $ownerDetails->getHostedDomain();
        // echo $ownerDetails->getLocale();
        // print_r($ownerDetails->toArray());

        $first_name = $ownerDetails->getFirstName();
        $last_name = $ownerDetails->getLastName();
        $email = $ownerDetails->getEmail();
        
        $username = $ownerDetails->getEmail();
        $username = explode('@', $username)[0];
        
        $randomPassword = bin2hex(random_bytes(8));
        $password = password_hash($randomPassword, PASSWORD_DEFAULT);
        
        $db = new PDO("mysql:host=$host;dbname=$dbname", $dbUsername, $dbPassword);
        
        $stmt = $db->prepare("
        INSERT INTO Users (username, password, email, first_name, last_name, session_id) 
        VALUES (:username, :password, :email, :first_name, :last_name, :session_id)
        ON DUPLICATE KEY UPDATE 
            id = LAST_INSERT_ID(id),
            username = VALUES(username), 
            password = VALUES(password), 
            first_name = VALUES(first_name), 
            last_name = VALUES(last_name),
            session_id = VALUES(session_id)
        ");
        
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':email', $ownerDetails->getEmail());
        $stmt->bindParam(':first_name', $ownerDetails->getFirstName());
        $stmt->bindParam(':last_name', $ownerDetails->getLastName());
        $stmt->bindParam(':session_id', $sessionID);
        $stmt->execute();
        
        $userID = $db->lastInsertId();
        
        $avatar = $ownerDetails->getAvatar();
        $avatar = str_replace('s96-c', 's400-c', $avatar);
        $avatarDir = __DIR__ . '/../../img/forum/avatars/';

        if (!is_dir($avatarDir)) {
            mkdir($avatarDir, 0777, true);
        }

        $avatarPath = $avatarDir . $userID . '.jpg';

        // Get the avatar image from the URL
        $imageData = file_get_contents($avatar);
        $image = imagecreatefromstring($imageData);

        if ($image !== false) {
            // Convert the image to JPEG and save it
            imagejpeg($image, $avatarPath);
            imagedestroy($image);
        } else {
            // Handle error
            echo "Failed to create image from string.";
        }

        header('Location: ' . $redirect_url);

    } catch (Exception $e) {

        // Failed to get user details
        exit('Something went wrong: ' . $e->getMessage());

    }

    // Use this to interact with an API on the users behalf
    // echo $token->getToken();

    // Use this to get a new access token if the old one expires
    // echo $token->getRefreshToken();

    // Unix timestamp at which the access token expires
    // echo $token->getExpires();
}
?>