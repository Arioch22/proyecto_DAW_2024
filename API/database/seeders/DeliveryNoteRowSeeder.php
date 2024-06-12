<?php

namespace Database\Seeders;

use App\Models\DeliveryNoteRow;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryNoteRowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        DeliveryNoteRow::factory()
            ->count(40)
            ->create();
    }
}
