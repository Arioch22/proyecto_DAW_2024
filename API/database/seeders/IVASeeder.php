<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\IVA;

class IVASeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
    IVA::class::factory()
        ->count(3)
        ->create();
    }
}
