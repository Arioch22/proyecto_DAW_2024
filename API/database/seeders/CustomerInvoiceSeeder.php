<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\CustomerInvoice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerInvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        CustomerInvoice::factory()
        ->count(2)
        ->create();
    }
}
