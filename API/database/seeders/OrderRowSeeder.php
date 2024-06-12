<?php

namespace Database\Seeders;

use App\Models\OrderRow;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderRowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        OrderRow::factory()
            ->count(40)
            ->create();
    }
}
