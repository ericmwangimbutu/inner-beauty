<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        foreach ($rawProducts as $product) {
            DB::table('products')->insert([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'price' => $product['price'],
                'img' => $product['img'],
                'description' => $product['description'],
            ]);
        }
    }
}
