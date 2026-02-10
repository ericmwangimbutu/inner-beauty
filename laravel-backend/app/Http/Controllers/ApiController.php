<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    public function getServices()
    {
        $services = DB::table('services')->get();
        return response()->json($services);
    }

    public function getProducts()
    {
        $products = DB::table('products')->get();
        return response()->json($products);
    }

    public function getTestimonials()
    {
        $testimonials = DB::table('testimonials')->get();
        return response()->json($testimonials);
    }

    public function handleBooking(Request $request)
    {
        $payload = $request->json()->all();

        if (empty($payload['name']) || empty($payload['email'])) {
            return response()->json(['error' => 'Name and email are required.'], 422);
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

        try {
            $dbId = DB::table('bookings')->insertGetId([
                'name' => $booking['name'],
                'email' => $booking['email'],
                'event_date' => $this->normalize_date($booking['date']),
                'service' => $booking['service'] ?: null,
                'location' => $booking['location'] ?: null,
                'notes' => $booking['notes'] ?: null,
                'raw_payload' => json_encode($booking, JSON_UNESCAPED_UNICODE),
            ]);

            return response()->json(['status' => 'ok', 'bookingId' => $dbId, 'storage' => 'database']);
        } catch (\Throwable $exception) {
            error_log('Booking DB error: ' . $exception->getMessage());
            
            $fileId = $this->persist_booking_to_file($booking);
            return response()->json(['status' => 'ok', 'bookingId' => $fileId, 'storage' => 'filesystem']);
        }
    }

    private function persist_booking_to_file(array $booking): string
    {
        if (!isset($booking['id'])) {
            $booking['id'] = uniqid('booking_', true);
        }

        $file = storage_path('app/bookings.json');
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

    private function normalize_date(?string $value): ?string
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

    public function handleAi(Request $request)
    {
        $input = $request->json()->all();
        $prompt = trim((string) ($input['prompt'] ?? ''));
        $requestedModel = trim((string) ($input['model'] ?? ''));

        if ($prompt === '') {
            return response()->json(['error' => 'Prompt is required.'], 422);
        }

        $apiKey = env('GEMINI_API_KEY');
        if (!$apiKey) {
            return response()->json(['error' => 'Gemini API key not configured.'], 500);
        }

        $defaultModel = env('GEMINI_MODEL') ?: 'gemini-2.5-flash-preview-09-2025';
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
            return response()->json(['error' => 'AI service unavailable.'], 502);
        }

        $decoded = json_decode($result, true);
        $text = $decoded['candidates'][0]['content']['parts'][0]['text'] ?? '';
        return response()->json(['text' => $text]);
    }
}
