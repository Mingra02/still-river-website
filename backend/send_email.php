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
    $mail->addReplyTo('michael@the-still-river.com', 'Michael Ingram');
    $mail->addAddress($data->email, $data->name);
    $mail->addCC('michael@the-still-river.com', 'Michael Ingram');
    $mail->Subject = 'Thanks for reaching out to The Still River ' . $data->given_name . '!';
    $mail->isHTML(true);
    $mail->Body = "<!DOCTYPE html>
    <html lang=\"en\" xmlns:v=\"urn:schemas-microsoft-com:vml\">
    <head>
      <meta charset=\"utf-8\">
      <meta name=\"x-apple-disable-message-reformatting\">
      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
      <meta name=\"format-detection\" content=\"telephone=no, date=no, address=no, email=no, url=no\">
      <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings
                xmlns:o=\"urn:schemas-microsoft-com:office:office\"
              >
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <style>
            td,
            th,
            div,
            p,
            a,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-family: \"Segoe UI\", sans-serif;
              mso-line-height-rule: exactly;
            }
          </style>
        <![endif]-->
      <title>Thank you for reaching out!</title>
      <style>
        @media (max-width: 600px) {
          h1 {
            font-size: 24px !important;
            line-height: 32px !important;
          }
        }
        h2 {
          font-size: 24px;
          line-height: 32px;
          color: #0f172a;
        }
        @media (max-width: 600px) {
          h2 {
            font-size: 20px !important;
            line-height: 28px !important;
          }
        }
        h3 {
          font-size: 20px;
          line-height: 28px;
          color: #0f172a;
          margin: 0 0 16px;
        }
        @media (max-width: 600px) {
          h3 {
            font-size: 18px !important;
            line-height: 24px !important;
          }
        }
        h4 {
          font-size: 18px;
          line-height: 24px;
          color: #0f172a;
        }
        @media (max-width: 600px) {
          h4 {
            font-size: 16px !important;
            line-height: 20px !important;
          }
        }
        h5 {
          font-size: 16px;
          line-height: 20px;
          color: #0f172a;
        }
        @media (max-width: 600px) {
          h5 {
            font-size: 14px !important;
          }
        }
        h6 {
          font-size: 16px;
          text-transform: uppercase;
          line-height: 20px;
          color: #0f172a;
        }
        @media (max-width: 600px) {
          h6 {
            font-size: 14px !important;
          }
        }
        ul,
        ol {
          line-height: 24px;
          color: #475569;
        }
        blockquote p {
          margin: 0;
          font-size: 18px;
          line-height: 28px;
        }
        hr {
          height: 1px;
          border-width: 0px;
          background-color: #cbd5e1;
          color: #cbd5e1;
          margin-top: 32px;
          margin-bottom: 32px;
        }
        pre {
          margin-bottom: 24px;
          overflow: auto;
          white-space: pre;
          border-radius: 8px;
          padding: 24px;
          text-align: left;
          font-family: ui-monospace, Menlo, Consolas, monospace;
          font-size: 16px;
          color: #cbd5e1;
          hyphens: none;
          tab-size: 2;
          word-break: normal;
          word-spacing: normal;
          word-wrap: normal;
        }
        :not(pre) > code {
          border-radius: 4px;
          padding: 2px 6px;
          white-space: normal;
          font-size: 14px;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          color: #ec4899;
        }
        .hover-text-slate-300:hover {
          color: #cbd5e1 !important;
        }
        @media (max-width: 600px) {
          .sm-block {
            display: block !important;
          }
          .sm-w-full {
            width: 100% !important;
          }
          .sm-px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .sm-px-4 {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      </style>
    </head>
    <body style=\"margin: 0; width: 100%; background-color: #0F172A; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word\">
      <div align=\"center\" role=\"article\" aria-roledescription=\"email\" lang=\"en\" class=\"sm-px-4\" aria-label=\"Thank you for reaching out!\" style=\"background-color: #0F172A\">
        <div role=\"separator\" style=\"line-height: 40px\">&zwj;</div>
        <table cellpadding=\"0\" cellspacing=\"0\" role=\"none\">
          <tr>
            <td style=\"width: 600px; max-width: 100%\">
              <table style=\"width: 100%;\" cellpadding=\"0\" cellspacing=\"0\" role=\"none\">
                <tr>
                  <td class=\"sm-px-4\" style=\"padding-left: 32px; padding-right: 32px\">
                    <a href=\"https://www.the-still-river.com/\" style=\"color: #2563eb; text-decoration: underline\">
                      <img src=\"https://www.the-still-river.com/_next/static/media/logo.1fd7c5d1.png\" alt=\"The Still River\" width=\"40px\" height=\"40px\" style=\"max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; margin: auto\">
                    </a>
                  </td>
                  <td>
                    <a href=\"https://www.the-still-river.com/\" style=\"text-decoration: underline; text-align: left; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; font-size: 36px; color: #e2e8f0; text-decoration-line: none\">
                      The Still River
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div role=\"separator\" style=\"line-height: 40px\">&zwj;</div>
        <table style=\"font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;\" cellpadding=\"0\" cellspacing=\"0\" role=\"none\">
          <tr>
            <td style=\"width: 600px; max-width: 100%; border-radius: 12px; background-color: #fff; padding-top: 32px; padding-bottom: 32px\">
              <table style=\"width: 100%;\" cellpadding=\"0\" cellspacing=\"0\" role=\"none\">
                <tr>
                  <td class=\"sm-px-4\" style=\"padding-left: 32px; padding-right: 32px; font-size: 16px; line-height: 24px; color: #475569\">
                    <h1 style=\"font-size: 30px; line-height: 36px; color: #0f172a\">Thanks for reaching out!</h1>
                    <p style=\"font-size: 16px; line-height: 24px; color: #475569; margin: 0 0 32px\">Hello " . $data->given_name . ",</p>
                    <p style=\"font-size: 16px; line-height: 24px; color: #475569; margin: 0 0 32px;\">Thank you for reaching out to us! We're thrilled to hear from you and are eager to assist you further. Our team is currently reviewing your inquiry and will get back to you as quickly as possible.</p>
                    <p style=\"font-size: 16px; line-height: 24px; color: #475569; margin: 0 0 32px;\">Feel free to reply to this email if you have any immediate questions or need further information on our services. We're here to help you navigate your data science and analytics journey with ease. Looking forward to collaborating with you!</p>
                    <p style=\"font-size: 16px; line-height: 24px; color: #475569; margin: 0 0 32px;\">Best regards,</p>
                    <p style=\"font-size: 16px; line-height: 24px; color: #475569; margin: 0 0 32px;\">Michael</p>
                    <blockquote style=\"border-left: 4px solid #6366f1; margin: 0 0 32px; padding-left: 16px\">
                      <p style=\"color: #475569; margin: 0; font-size: 18px; line-height: 28px;\">" . $data->message . "</p>
                    </blockquote>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr role=\"separator\">
            <td style=\"line-height: 40px\">&zwj;</td>
          </tr>
          <tr>
            <td class=\"sm-px-4\" style=\"padding-left: 32px; padding-right: 32px\">
              <table style=\"width: 100%;\" cellpadding=\"0\" cellspacing=\"0\" role=\"none\">
                <tr>
                  <td class=\"sm-block sm-w-full sm-px-0\" style=\"padding-left: 32px; padding-right: 32px\">
                    <p style=\"line-height: 24px; margin: 0 0 8px; font-size: 14px; color: #94a3b8\">
                      ©️ The Still River, LLC. All rights reserved.
                      <br>
                      If you no longer wish to receive these emails, you can
                      <a href=\"https://www.the-still-river.com\" class=\"hover-text-slate-300\" style=\"text-decoration: underline; color: #94a3b8;\">unsubscribe</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div role=\"separator\" style=\"line-height: 40px\">&zwj;</div>
      </div>
    </body>
    </html>
    ";

    $mail->AltBody = 'Hello ' . $data->given_name . ', Thank you for getting in touch with us! We\'re thrilled to hear from you and are eager to assist you further. Our team is currently reviewing your inquiry and will get back to you as quickly as possible. Feel free to reply to this email if you have any immediate questions or need further information on our services. We\'re here to help you navigate your data science and analytics journey with ease. Looking forward to collaborating with you! Best regards, Michael';
    
    

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
?>