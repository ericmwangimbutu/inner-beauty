<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$resource = $_GET['resource'] ?? 'services';

$services = [
    [
        'id' => 'manicure',
        'name' => 'Inner Bloom Manicure',
        'description' => 'Cuticle therapy, precision shaping, and nourishing oils finished with gel brilliance.',
        'duration' => '45 min',
        'price' => '$45',
        'category' => 'nails',
        'tags' => ['gel application', 'nail polish', 'cuticle care'],
    ],
    [
        'id' => 'pedicure',
        'name' => 'Sculpted Pedicure Ritual',
        'description' => 'Mineral soak, bamboo scrub, and reflexology massage that revives tired feet.',
        'duration' => '60 min',
        'price' => '$60',
        'category' => 'nails',
        'tags' => ['scrubbing', 'hydration'],
    ],
    [
        'id' => 'facial',
        'name' => 'Luminous Full Facial',
        'description' => 'Double cleanse, enzyme resurfacing, lymphatic sculpting, and LED calm therapy.',
        'duration' => '75 min',
        'price' => '$120',
        'category' => 'skin',
        'tags' => ['full facial', 'radiance', 'wedding ready'],
    ],
    [
        'id' => 'scrub',
        'name' => 'Amber Body Scrubbing',
        'description' => 'Velvety sugar crystals and shea hydration to unveil satin-touch skin.',
        'duration' => '50 min',
        'price' => '$85',
        'category' => 'skin',
        'tags' => ['body polish', 'aromatherapy'],
    ],
    [
        'id' => 'braids',
        'name' => 'Artisan Hair Braids',
        'description' => 'Custom patterns including knotless, Ghanaian, and classic cornrows with tension care.',
        'duration' => '2-4 hrs',
        'price' => 'From $180',
        'category' => 'hair',
        'tags' => ['braids', 'knotless', 'ghanian', 'conrows'],
    ],
    [
        'id' => 'sisterlocks',
        'name' => 'Sisterlocks Restore & Retire',
        'description' => 'Rejuvenation, tightening, or graceful retirement with strengthening cocktails.',
        'duration' => '3 hrs',
        'price' => 'From $220',
        'category' => 'hair',
        'tags' => ['sisterlocks', 'restoration', 'retire'],
    ],
    [
        'id' => 'dreadlocks',
        'name' => 'Dreadlocks Retire Ceremony',
        'description' => 'Gentle detangling, steam therapy, and protective styling transition.',
        'duration' => '4 hrs',
        'price' => 'From $240',
        'category' => 'hair',
        'tags' => ['dreadlocks', 'retire', 'protective'],
    ],
    [
        'id' => 'twistouts',
        'name' => 'Silk Twistouts & Texture',
        'description' => 'Moisture mapping, coil definition, and frizz seal for editorial finishes.',
        'duration' => '90 min',
        'price' => '$95',
        'category' => 'hair',
        'tags' => ['twistouts', 'curl care'],
    ],
    [
        'id' => 'gelApplication',
        'name' => 'Luxury Gel Application',
        'description' => 'Builder gel structure, chrome finishes, and flawless long-wear polish.',
        'duration' => '50 min',
        'price' => '$55',
        'category' => 'nails',
        'tags' => ['gel application', 'long wear'],
    ],
];

$products = [
    [
        'id' => 'ritual-kit',
        'name' => 'Inner Beauty Ritual Kit',
        'description' => 'Cleanser, rosewater tonic, vitamin dew serum, and balm.',
        'price' => '$140',
    ],
    [
        'id' => 'atelier-lacquer',
        'name' => 'Atelier Lacquer Collection',
        'description' => 'Gel-compatible vegan shades curated for bridal parties.',
        'price' => '$24',
    ],
    [
        'id' => 'texture-elixir',
        'name' => 'Texture Couture Elixir',
        'description' => 'Ceramide-rich therapy for braids, knotless, and sisterlocks.',
        'price' => '$38',
    ],
];

$testimonials = [
    [
        'name' => 'Isabella M.',
        'title' => 'Destination Bride',
        'quote' => 'Inner Beauty orchestrated my nails, hair, and skin prep in one fluid experience — elegant, calm, and unforgettable.',
    ],
    [
        'name' => 'Nia O.',
        'title' => 'Creative Director',
        'quote' => 'Their knotless braids survived Paris Fashion Week and remote fittings. The craftsmanship is unmatched.',
    ],
    [
        'name' => 'Tayo A.',
        'title' => 'Wellness Coach',
        'quote' => 'Remote facial coaching plus curated products kept my glow intact on tour. Boutique care with global reach.',
    ],
];

switch ($resource) {
    case 'services':
        echo json_encode($services);
        break;
    case 'products':
        echo json_encode($products);
        break;
    case 'testimonials':
        echo json_encode($testimonials);
        break;
    case 'bookings':
        handle_booking();
        break;
    case 'ai':
        handle_ai();
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
}

function handle_booking(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }

    $payload = json_decode(file_get_contents('php://input'), true);
    if (!is_array($payload)) {
        http_response_code(422);
        echo json_encode(['error' => 'Invalid payload']);
        return;
    }

    $booking = [
        'name' => trim((string) ($payload['name'] ?? '')),
        'email' => trim((string) ($payload['email'] ?? '')),
        'date' => trim((string) ($payload['date'] ?? '')),
        'service' => trim((string) ($payload['service'] ?? '')),
        'location' => trim((string) ($payload['location'] ?? '')),
        'notes' => trim((string) ($payload['notes'] ?? '')),
        'receivedAt' => gmdate(DATE_ATOM),
    ];

    if ($booking['name'] === '' || $booking['email'] === '') {
        http_response_code(422);
        echo json_encode(['error' => 'Name and email are required.']);
        return;
    }

    $dbId = save_booking_to_db($booking);
    if ($dbId !== null) {
        echo json_encode(['status' => 'ok', 'bookingId' => $dbId, 'storage' => 'database']);
        return;
    }

    $fileId = persist_booking_to_file($booking);
    echo json_encode(['status' => 'ok', 'bookingId' => $fileId, 'storage' => 'filesystem']);
}

function save_booking_to_db(array $booking): ?string
{
    try {
        $pdo = db_connection();
        $stmt = $pdo->prepare(
            'INSERT INTO bookings (name, email, event_date, service, location, notes, raw_payload)
             VALUES (:name, :email, :event_date, :service, :location, :notes, :raw_payload)'
        );

        $stmt->execute([
            ':name' => $booking['name'],
            ':email' => $booking['email'],
            ':event_date' => normalize_date($booking['date']),
            ':service' => $booking['service'] ?: null,
            ':location' => $booking['location'] ?: null,
            ':notes' => $booking['notes'] ?: null,
            ':raw_payload' => json_encode($booking, JSON_UNESCAPED_UNICODE),
        ]);

        return (string) $pdo->lastInsertId();
    } catch (Throwable $exception) {
        error_log('Booking DB error: ' . $exception->getMessage());
        return null;
    }
}

function persist_booking_to_file(array $booking): string
{
    if (!isset($booking['id'])) {
        $booking['id'] = uniqid('booking_', true);
    }

    $file = __DIR__ . '/../storage/bookings.json';
    $directory = dirname($file);
    if (!is_dir($directory)) {
        mkdir($directory, 0777, true);
    }

    $bookings = [];
    if (file_exists($file)) {
        $existing = json_decode((string) file_get_contents($file), true);
        if (is_array($existing)) {
            $bookings = $existing;
        }
    }

    $bookings[] = $booking;
    file_put_contents($file, json_encode($bookings, JSON_PRETTY_PRINT));

    return (string) $booking['id'];
}

function normalize_date(?string $value): ?string
{
    if ($value === null || $value === '') {
        return null;
    }

    $timestamp = strtotime($value);
    if ($timestamp === false) {
        return null;
    }

    return date('Y-m-d', $timestamp);
}

function handle_ai(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $prompt = trim((string) ($input['prompt'] ?? ''));
    $requestedModel = trim((string) ($input['model'] ?? ''));

    if ($prompt === '') {
        http_response_code(422);
        echo json_encode(['error' => 'Prompt is required.']);
        return;
    }

    $apiKey = getenv('GEMINI_API_KEY');
    if (!$apiKey) {
        http_response_code(500);
        echo json_encode(['error' => 'Gemini API key not configured.']);
        return;
    }

    $defaultModel = getenv('GEMINI_MODEL') ?: 'gemini-2.5-flash-preview-09-2025';
    $model = $requestedModel !== '' ? $requestedModel : $defaultModel;

    $endpoint = sprintf(
        'https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s',
        rawurlencode($model),
        rawurlencode($apiKey)
    );

    $payload = json_encode([
        'contents' => [
            [
                'parts' => [
                    ['text' => $prompt],
                ],
            ],
        ],
    ]);

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_TIMEOUT => 15,
    ]);

    $result = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($result === false || $status >= 400) {
        error_log('Gemini proxy error: ' . ($error ?: $result));
        http_response_code(502);
        echo json_encode(['error' => 'AI service unavailable.']);
        return;
    }

    $decoded = json_decode($result, true);
    $text = $decoded['candidates'][0]['content']['parts'][0]['text'] ?? '';
    echo json_encode(['text' => $text]);
}
