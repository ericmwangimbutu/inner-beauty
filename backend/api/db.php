<?php

declare(strict_types=1);

/**
 * Returns a shared PDO instance for the Inner Beauty database.
 *
 * Environment variables (optional):
 *  - DB_HOST (default: 127.0.0.1)
 *  - DB_PORT (default: 3306)
 *  - DB_NAME (default: inner_beauty)
 *  - DB_USER (default: root)
 *  - DB_PASSWORD (default: '')
 */
function db_connection(): PDO
{
    static $pdo;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $name = getenv('DB_NAME') ?: 'inner_beauty';
    $user = getenv('DB_USER') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: '';

    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $host, $port, $name);

    try {
        $pdo = new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (PDOException $e) {
        error_log('Database connection failed: ' . $e->getMessage());
        http_response_code(503);
        echo json_encode(['error' => 'Database service is unavailable.']);
        exit;
    }

    ensure_booking_table($pdo);

    return $pdo;
}

function ensure_booking_table(PDO $pdo): void
{
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS bookings (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(160) NOT NULL,
            event_date DATE NULL,
            service VARCHAR(160) NULL,
            location VARCHAR(160) NULL,
            notes TEXT NULL,
            raw_payload LONGTEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
    );
}

