
<?php

header('Content-Type: application/json');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

$firstName = trim($_POST['first_name'] ?? '');
$lastName  = trim($_POST['last_name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$query     = trim($_POST['query'] ?? '');

if (
    !$firstName ||
    !$lastName ||
    !$email ||
    !$phone ||
    !$query ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please enter valid form details.'
    ]);
    exit;
}

$allowedQueries = [
    'EMERGENCY',
    'ALIGNERS',
    'BRACES',
    'VENEERS',
    'GENERAL CONSULTATION'
];

if (!in_array($query, $allowedQueries, true)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid query selection.'
    ]);
    exit;
}

$subject = 'New Website Enquiry - Sonnet Smile';

$message = "
New enquiry received from Sonnet Smile website.

First Name: $firstName
Last Name: $lastName
Email: $email
Phone: $phone
Nature of Query: $query
";

$payload = [
    'apikey' => ELASTIC_EMAIL_API_KEY,
    'subject' => $subject,
    'from' => FROM_EMAIL,
    'fromName' => FROM_NAME,
    'to' => TO_EMAIL,
    'bodyText' => $message,
    'replyTo' => $email,
    'isTransactional' => true
];

$ch = curl_init('https://api.elasticemail.com/v4/emails');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Accept: application/json'
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 20
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

if ($response === false || $curlError) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Unable to connect to email service.'
    ]);
    exit;
}

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you! Your enquiry has been submitted successfully.'
    ]);
} else {
    error_log('Elastic Email error: ' . $response);

    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Email could not be sent. Please try again.'
    ]);
}

?>
