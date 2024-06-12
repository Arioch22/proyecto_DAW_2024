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
        Schema::create('customer_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('trading_id');
            $table->string('name_customer');
            $table->string('name_trading');
            $table->unsignedBigInteger('status_id');
            $table->decimal('total_bruto', total: 9, places: 2);
            $table->decimal('total_neto', total: 9, places: 2);
            $table->decimal('total_iva', total: 9, places: 2);
            $table->decimal('total_irpf', total: 9, places: 2)->nullable();
            $table->datetime('date_order');
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('trading_id')->references('id')->on('tradings')->onUpdate('cascade');
            $table->foreign('status_id')->references('id')->on('statuses')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_orders');
    }
};
