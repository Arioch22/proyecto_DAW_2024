<?php

namespace Database\Seeders;

use App\Models\SuppliersRow;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuppliersRowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SuppliersRow::class::factory()
            ->count(20)
            ->create();
    }
}
