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

function slugify($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    if (empty($text)) {
        return 'n-a';
    }
    return $text;
}

$servicesData = [
  "Braids & Cornrows" => [
    ['name' => "Knotless Braids", 'price' => "Ksh 1500+", 'duration' => "180 min"],
    ['name' => "Standard Hair Braids", 'price' => "Ksh 3000+", 'duration' => "120 min"],
    ['name' => "Ghanaian Braids", 'price' => "Ksh 2000+", 'duration' => "150 min"],
    ['name' => "Cornrows (All Styles)", 'price' => "Ksh 2000+", 'duration' => "60 min"],
    ['name' => "Box Braids", 'price' => "Ksh 4000+", 'duration' => "240 min"],
    ['name' => "Feed-in Braids", 'price' => "Ksh 2500+", 'duration' => "180 min"],
    ['name' => "Crochet Braids", 'price' => "Ksh 3500+", 'duration' => "180 min"],
    ['name' => "Faux Locs", 'price' => "Ksh 5000+", 'duration' => "300 min"],
    ['name' => "Braided Updos", 'price' => "Ksh 3000+", 'duration' => "90 min"],
    ['name' => "Braided Ponytails", 'price' => "Ksh 2500+", 'duration' => "60 min"],
    ['name' => "Braided Crowns", 'price' => "Ksh 3500+", 'duration' => "120 min"],
    ['name' => "Braided Wigs Installation", 'price' => "Ksh 6000+", 'duration' => "180 min"],
    ['name' => "Braided Extensions Removal", 'price' => "Ksh 1000+", 'duration' => "60 min"],
    ['name' => "Braided Hair Touch-Up", 'price' => "Ksh 1500+", 'duration' => "90 min"],
    ['name' => "Braided Hair Consultation", 'price' => "Ksh 500", 'duration' => "30 min"],
    ['name' => "Braided Hair Maintenance", 'price' => "Ksh 2000+", 'duration' => "60 min"],
    ['name' => "Braided Hair Styling", 'price' => "Ksh 2500+", 'duration' => "60 min"],
    ['name' => "Braided Hair Treatments", 'price' => "Ksh 1500+", 'duration' => "45 min"],
    ['name' => "Braided Hair Accessories", 'price' => "Ksh 300+", 'duration' => "15 min"],
    ['name' => "Braided Hair Color", 'price' => "Ksh 4000+", 'duration' => "120 min"],
    ['name' => "Braided Hair Highlights", 'price' => "Ksh 4500+", 'duration' => "150 min"],
    ['name' => "Braided Hair Extensions", 'price' => "Ksh 5000+", 'duration' => "180 min"],
    ['name' => "Braided Hair Removal", 'price' => "Ksh 1200+", 'duration' => "60 min"],
    ['name' => "Braided Hair Refresh", 'price' => "Ksh 2000+", 'duration' => "90 min"],
    ['name' => "Braided Hair Deep Conditioning", 'price' => "Ksh 1800+", 'duration' => "60 min"],
    ['name' => "Braided Hair Scalp Treatment", 'price' => "Ksh 1500+", 'duration' => "45 min"],
    ['name' => "Braided Hair Detangling", 'price' => "Ksh 1000+", 'duration' => "30 min"],
    ['name' => "Braided Hair Detox", 'price' => "Ksh 2000+", 'duration' => "60 min"],
    ['name' => "Braided Hair Protein Treatment", 'price' => "Ksh 1800+", 'duration' => "45 min"],
    ['name' => "Braided Hair Moisture Treatment", 'price' => "Ksh 1600+", 'duration' => "45 min"],
    ['name' => "Braided Hair Shine Treatment", 'price' => "Ksh 1500+", 'duration' => "30 min"],
    ['name' => "Braided Hair Frizz Control", 'price' => "Ksh 1200+", 'duration' => "30 min"],
    ['name' => "Braided Hair Edge Control", 'price' => "Ksh 800+", 'duration' => "15 min"],
  ],
  "Locs & Natural" => [
    ['name' => "Sisterlocks Restoration & Retie", 'price' => "Ksh 10000+", 'duration' => "240 min"],
    ['name' => "Dreadlocks Retie", 'price' => "Ksh 3000+", 'duration' => "90 min"],
    ['name' => "Twistouts", 'price' => "Ksh 4000+", 'duration' => "60 min"],
    ['name' => "Natural Hair Styling", 'price' => "Ksh 2500+", 'duration' => "60 min"],
    ['name' => "Loc Installation", 'price' => "Ksh 8000+", 'duration' => "180 min"],
    ['name' => "Sisterlocks Installation", 'price' => "Ksh 20000+", 'duration' => "300 min"],
    ['name' => "Dreadlocks Installation", 'price' => "Ksh 15000+", 'duration' => "240 min"],
  ],
  "Hair Styling" => [
    ['name' => "Wash & Blowout", 'price' => "Ksh 1500", 'duration' => "60 min"],
    ['name' => "Updo Styles", 'price' => "Ksh 3000+", 'duration' => "90 min"],
    ['name' => "Protective Styles", 'price' => "Ksh 4000+", 'duration' => "120 min"],
    ['name' => "Hair Treatments", 'price' => "Ksh 2000+", 'duration' => "60 min"],
    ['name' => "Edge Styling", 'price' => "Ksh 800", 'duration' => "15 min"],
    ['name' => "Scalp Massage", 'price' => "Ksh 1000", 'duration' => "30 min"],
    ['name' => "Hot Oil Treatment", 'price' => "Ksh 1500", 'duration' => "45 min"],
    ['name' => "Deep Conditioning", 'price' => "Ksh 1200", 'duration' => "30 min"],
    ['name' => "Detangling Session", 'price' => "Ksh 1000", 'duration' => "30 min"],
    ['name' => "Blow Dry & Style", 'price' => "Ksh 1800", 'duration' => "60 min"],
    ['name' => "Flat Ironing", 'price' => "Ksh 2000", 'duration' => "60 min"],
    ['name' => "Curling/Waving", 'price' => "Ksh 2000", 'duration' => "60 min"],
    ['name' => "Hair Trimming", 'price' => "Ksh 800", 'duration' => "20 min"],
    ['name' => "Scalp Treatment", 'price' => "Ksh 1500", 'duration' => "45 min"],
    ['name' => "Hair Detox", 'price' => "Ksh 2000+", 'duration' => "60 min"],
    ['name' => "Protein Treatment", 'price' => "Ksh 1800", 'duration' => "45 min"],
    ['name' => "Moisture Treatment", 'price' => "Ksh 1600", 'duration' => "45 min"],
  ],
  "Makeup Services" => [
    ['name' => "Daytime Makeup", 'price' => "Ksh 1500", 'duration' => "45 min"],
    ['name' => "Bridal Makeup", 'price' => "Ksh 5000", 'duration' => "120 min"],
    ['name' => "Special Occasion Makeup", 'price' => "Ksh 3000", 'duration' => "60 min"],
    ['name' => "Makeup Touch-Up", 'price' => "Ksh 1000", 'duration' => "30 min"],
    ['name' => "Makeup Lessons", 'price' => "Ksh 4000", 'duration' => "90 min"],
    ['name' => "Airbrush Makeup", 'price' => "Ksh 3500", 'duration' => "60 min"],
    ['name' => "Makeup Removal", 'price' => "Ksh 800", 'duration' => "15 min"],
    ['name' => "Eyebrow Shaping & Tinting", 'price' => "Ksh 1200", 'duration' => "30 min"],
    ['name' => "Eyelash Extensions", 'price' => "Ksh 4000", 'duration' => "90 min"],
    ['name' => "Eyelash Lift & Tint", 'price' => "Ksh 2500", 'duration' => "60 min"],
  ],
  "Nails & Care" => [
    ['name' => "Classic Manicure", 'price' => "Ksh 500", 'duration' => "45 min"],
    ['name' => "Luxury Pedicure", 'price' => "Ksh 500", 'duration' => "60 min"],
    ['name' => "Gel Application", 'price' => "Ksh 1000", 'duration' => "45 min"],
    ['name' => "Nail Polish Change", 'price' => "Ksh 500", 'duration' => "30 min"],
    ['name' => "Nail Art Design", 'price' => "Ksh 1500", 'duration' => "60 min"],
  ],
  "Waxing & Threading" => [
    ['name' => "Eyebrow Threading", 'price' => "Ksh 500", 'duration' => "15 min"],
    ['name' => "Full Face Waxing", 'price' => "Ksh 1500", 'duration' => "30 min"],
    ['name' => "Leg Waxing", 'price' => "Ksh 2000", 'duration' => "45 min"],
  ],
  "Face & Body" => [
    ['name' => "Full Facial", 'price' => "Ksh 1000", 'duration' => "75 min"],
    ['name' => "Deep Scrubbing", 'price' => "Ksh 1500", 'duration' => "45 min"],
    ['name' => "Evening Makeup", 'price' => "Ksh 2000", 'duration' => "60 min"],
  ],
  "Weddings & Remote" => [
    ['name' => "Bridal Package (Hair+Makeup)", 'price' => "Ksh 15000", 'duration' => "240 min"],
    ['name' => "Wedding Party Group", 'price' => "Consult", 'duration' => "Var"],
    ['name' => "Remote Home Service", 'price' => "+Ksh 1000 Fee", 'duration' => "Travel"],
  ]
];

$services = [];
foreach ($servicesData as $category => $serviceList) {
    foreach ($serviceList as $service) {
        $services[] = [
            'id' => slugify($service['name']),
            'name' => $service['name'],
            'price' => $service['price'],
            'duration' => $service['duration'],
            'category' => $category,
        ];
    }
}

$rawProducts = [
  ['name' => "Inner Beauty Velvet Lipstick", 'price' => "Ksh 3000", 'img' => "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80", 'description' => "A luxurious, long-lasting velvet lipstick that provides a bold, matte finish."],
  ['name' => "Hydrating Facial Mist", 'price' => "Ksh 2350", 'img' => "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80", 'description' => "A refreshing facial mist that hydrates and revitalizes your skin throughout the day."],
  ['name' => "Loc Maintenance Oil", 'price' => "Ksh 1000", 'img' => "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=400&q=80", 'description' => "A nourishing oil blend that keeps your locs healthy, shiny, and moisturized without buildup."],
  ['name' => "Nourishing Hair Butter", 'price' => "Ksh 1500", 'img' => "https://images.unsplash.com/photo-1590080877777-4b2f3f3b8e2d?auto=format&fit=crop&w=400&q=80", 'description' => "A rich, creamy hair butter that deeply conditions, strengthens, and promotes healthy hair growth."],
  ['name' => "Smoothing Edge Control", 'price' => "Ksh 1200", 'img' => "https://images.unsplash.com/photo-1612832021044-5f4e1c3b6f3e?auto=format&fit=crop&w=400&q=80", 'description' => "A non-flaky, long-lasting edge control that provides a smooth, sleek hold for all hair types."],
  ['name' => "Luxury Nail Kit", 'price' => "Ksh 3500", 'img' => "https://images.unsplash.com/photo-1587614382346-4ec2b3d3f1b4?auto=format&fit=crop&w=400&q=80", 'description' => "A complete nail care kit for a perfect, salon-quality manicure and pedicure at home."],
  ['name' => "Makeup Brush Set", 'price' => "Ksh 4000", 'img' => "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=400&q=80", 'description' => "A set of professional-grade makeup brushes for a flawless and seamless application every time."],
  ['name' => "Facial Cleansing Balm", 'price' => "Ksh 1800", 'img' => "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80", 'description' => "A gentle yet effective cleansing balm that melts away makeup, sunscreen, and impurities."],
  ['name' => "Inner Beauty Gift Card", 'price' => "Ksh 5000", 'img' => "https://images.unsplash.com/photo-1606813909353-1c4a3f4e5b6e?auto=format&fit=crop&w=400&q=80", 'description' => "The perfect gift for any beauty lover. Can be redeemed for any of our services or products."],
  ['name' => "Sisterlocks Care Kit", 'price' => "Ksh 2500", 'img' => "https://images.unsplash.com/photo-1612831455543-8f4e1c3b6f3e?auto=format&fit=crop&w=400&q=80", 'description' => "Everything you need to maintain your Sisterlocks and keep them looking their absolute best."],
  ['name' => "Hydrating Body Lotion", 'price' => "Ksh 2200", 'img' => "https://images.unsplash.com/photo-1590080877777-4b2f3f3b8e2d?auto=format&fit=crop&w=400&q=80", 'description' => "A lightweight, fast-absorbing body lotion that provides long-lasting hydration for smooth skin."],
  ['name' => "Makeup Setting Spray", 'price' => "Ksh 1500", 'img' => "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80", 'description' => "A fine mist setting spray that locks in your makeup for a fresh, just-applied look that lasts all day."],
  ['name' => "Nail Strengthening Serum", 'price' => "Ksh 1300", 'img' => "https://images.unsplash.com/photo-1587614382346-4ec2b3d3f1b4?auto=format&fit=crop&w=400&q=80", 'description' => "A powerful serum that strengthens and protects your nails from chipping, splitting, and breaking."],
];

$products = [];
foreach ($rawProducts as $product) {
    $products[] = [
        'id' => slugify($product['name']),
        'name' => $product['name'],
        'price' => $product['price'],
        'img' => $product['img'],
        'description' => $product['description'],
    ];
}

$testimonials = [
    [
        'name' => 'Judy W. Macharia',
        'title' => 'Destination Bride',
        'quote' => 'Inner Beauty orchestrated my nails, hair, and skin prep in one fluid experience — elegant, calm, and unforgettable.',
    ],
    [
        'name' => 'Lucy Macharia',
        'title' => 'Creative Director',
        'quote' => 'Their knotless braids survived Paris Fashion Week and remote fittings. The craftsmanship is unmatched.',
    ],
    [
        'name' => 'Esther Macharia',
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
