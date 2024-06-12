<?php

namespace Database\Seeders;

use App\Models\InvoiceRow;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InvoiceRowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        InvoiceRow::factory()
        ->count(40)
        ->create();
    }
}
