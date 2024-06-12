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
        Schema::create('suppliers_rows', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->string(('description_product'));
            $table->decimal('quantity', total:8, places: 2);
            $table->decimal('price_unity', total: 9, places: 2);
            $table->decimal('total_bruto', total: 9, places: 2);
            $table->unsignedBigInteger('iva');
            $table->unsignedBigInteger('irpf')->nullable();
            $table->decimal('total', total: 9, places: 2);
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('suppliers_orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('iva')->references('id')->on('i_v_a_s');
            $table->foreign('irpf')->references('id')->on('i_r_p_f_s');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers_rows');
    }
};
