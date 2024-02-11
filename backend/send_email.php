<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

// Enable CORS for React app
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // It's a preflight request. Respond successfully:
    http_response_code(200);
    exit;
}

// Function to handle the email sending
function sendEmail($data) {
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->Host = 'smtp.hostinger.com';
    $mail->Port = 465;
    $mail->Username = 'michael.ingram@the-still-river.com';
    $mail->Password = getenv('EMAIL_PASSWORD');
    $mail->setFrom('michael@the-still-river.com', 'Michael Ingram');
    $mail->addReplyTo($data->email, $data->name);
    $mail->addAddress('michael@the-still-river.com', 'Michael Ingram');
    $mail->Subject = 'Still River Contact Form Submission from ' . $data->name;
    $mail->isHTML(false);
    $mail->Body = "Name: {$data->name}\nEmail: {$data->email}\nMessage: {$data->message}";

    if (!$mail->send()) {
        error_log('Mailer Error: ' . $mail->ErrorInfo);
    } else {
        return 'The email message was sent.';
    }
}

// Only proceed with POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    setCorsHeaders();
    
    $content = file_get_contents('php://input');
    $decoded = json_decode($content);

    // Basic validation
    if (!empty($decoded->email) && filter_var($decoded->email, FILTER_VALIDATE_EMAIL) && !empty($decoded->given_name) && !empty($decoded->family_name) && !empty($decoded->message)) {
    
        // Sanitize input
        $decoded->given_name = filter_var($decoded->given_name, FILTER_SANITIZE_STRING);
        $decoded->family_name = filter_var($decoded->family_name, FILTER_SANITIZE_STRING);
        $decoded->name = $decoded->given_name . ' ' . $decoded->family_name;
        $decoded->name = filter_var($decoded->name, FILTER_SANITIZE_STRING);
        $decoded->email = filter_var($decoded->email, FILTER_SANITIZE_EMAIL);
        $decoded->message = filter_var($decoded->message, FILTER_SANITIZE_STRING);

        $response = sendEmail($decoded);

        echo json_encode(['message' => $response]);
    } else {
        echo json_encode(['message' => 'Invalid input. Please provide email, name, and message.']);
    }
} else {
    // Not a POST request
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed. Please use POST.']);
}
