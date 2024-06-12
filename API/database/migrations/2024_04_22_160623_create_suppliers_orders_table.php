<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('warehouse_id');
            $table->string('name_supplier');
            $table->string('name_warehouse');
            $table->unsignedBigInteger('status_id');
            $table->decimal('total_bruto', total: 9, places: 2);
            $table->decimal('total_neto', total: 9, places: 2);
            $table->decimal('total_iva', total: 9, places: 2);
            $table->decimal('total_irpf', total: 9, places: 2)->nullable();
            $table->datetime('date_order');
            $table->datetime('paid_dated')->nullable();
            $table->timestamps();

            $table->foreign('supplier_id')->references('id')->on('suppliers');
            $table->foreign('status_id')->references('id')->on('statuses');
            $table->foreign('warehouse_id')->references('id')->on('warehouses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers_orders');
    }
};
