<?php

namespace Database\Seeders;

use App\Models\DeliveryNoteRow;
use App\Models\InvoiceRow;
use App\Models\Product;
use App\Models\Status;
use App\Models\Supplier;
use App\Models\SuppliersOrder;
use App\Models\SuppliersRow;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolSeeder::class,
            StatusSeeder::class,
            SupplierSeeder::class,
            IVASeeder::class,
            ProductSeeder::class,
            TradingSeeder::class,
            CustomerSeeder::class,
            OrderRowSeeder::class,
            DeliveryNoteRowSeeder::class,
            InvoiceRowSeeder::class,
            SuppliersRowSeeder::class,
        ]);
    }
}
