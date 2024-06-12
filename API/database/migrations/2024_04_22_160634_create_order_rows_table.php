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
        Schema::create('order_rows', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_order_id');
            $table->unsignedBigInteger('product_id');
            $table->string(('description_product'));
            $table->decimal('quantity', total:8, places: 2);
            $table->decimal('price_unity', total: 9, places: 2);
            $table->decimal('total_neto', total: 9, places: 2);
            $table->unsignedBigInteger('tipo_iva');
            $table->decimal('iva', total: 9, places: 2);
            $table->unsignedBigInteger('tipo_irpf')->nullable();
            $table->decimal('irpf', total: 9, places: 2)->nullable();
            $table->decimal('total', total: 9, places: 2);
            $table->timestamps();

            $table->foreign('customer_order_id')->references('id')->on('customer_orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('tipo_iva')->references('id')->on('i_v_a_s');
            $table->foreign('tipo_irpf')->references('id')->on('i_r_p_f_s');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_rows');
    }
};
