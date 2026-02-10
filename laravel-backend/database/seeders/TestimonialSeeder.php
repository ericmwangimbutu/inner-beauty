<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        foreach ($testimonials as $testimonial) {
            DB::table('testimonials')->insert($testimonial);
        }
    }
}
