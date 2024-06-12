<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SuppliersRow>
 */
class SuppliersRowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $quantity = $this->faker->numberBetween(1, 10);
        $iva = $this->faker->randomElement([1, 2, 3]);
        $totalIva = $iva === 1 ? 1.21 : ($iva === 2 ? 1.10 : 1.04);
        $id = \App\Models\SuppliersOrder::inRandomOrder()->first()->id;
        $product = \App\Models\Product::inRandomOrder()->first();
        $productPrice = $product->price;
        $productDescription = $product->description;




        return [

            'order_id' => $id,
            'product_id' => $product,
            'description_product' => $productDescription,
            'quantity' => $quantity,
            'price_unity' => $productPrice,
            'total_bruto' => $quantity * $productPrice,
            'iva' => $iva,
            'irpf' => NULL,
            'total' => ($quantity * $productPrice) * $totalIva,

        ];
    }
}
