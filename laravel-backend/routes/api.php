<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

// Public API routes
Route::get('/services', [ApiController::class, 'getServices']);
Route::get('/products', [ApiController::class, 'getProducts']);
Route::get('/testimonials', [ApiController::class, 'getTestimonials']);
Route::post('/bookings', [ApiController::class, 'handleBooking']);
Route::post('/ai', [ApiController::class, 'handleAi']);

// Protected routes
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
