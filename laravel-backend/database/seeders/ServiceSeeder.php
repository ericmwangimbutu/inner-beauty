<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        foreach ($servicesData as $category => $serviceList) {
            foreach ($serviceList as $service) {
                DB::table('services')->insert([
                    'name' => $service['name'],
                    'slug' => Str::slug($service['name']),
                    'price' => $service['price'],
                    'duration' => $service['duration'],
                    'category' => $category,
                ]);
            }
        }
    }
}
