<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DeliveryNoteRow>
 */
class DeliveryNoteRowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $quantity = $this->faker->numberBetween(1, 10);
        $price = $this->faker->numberBetween(1, 20);
        $iva = $this->faker->randomElement([1, 2, 3]);
        $totalIva = $iva === 1 ? 1.21 : ($iva === 2 ? 1.10 : 1.04);

        return [
            
            'customer_delivery_note_id' => $this->faker->numberBetween(1, 40),
            'product_id' => $this->faker->numberBetween(1, 40),
            'description_product' => $this->faker->text(),
            'quantity' => $quantity,
            'price_unity' => $price,
            'total_neto' => $quantity * $price,
            'iva' => $iva,
            'irpf' => NULL,
            'total' => ($quantity * $price) * $totalIva,
            
        ];
    }
}
