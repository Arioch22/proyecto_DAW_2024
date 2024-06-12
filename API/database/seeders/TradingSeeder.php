<?php

namespace Database\Seeders;

use App\Models\Trading;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TradingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Trading::factory()
            ->count(40)
            ->create();
    }
}
