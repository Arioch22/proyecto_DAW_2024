<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerDeliveryNote>
 */
class CustomerDeliveryNoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $total_bruto = $this->faker->numberBetween(100, 2000);
        $total_iva = $this->faker->numberBetween(10, 122);

        return [
            
            'delivery_number' => $this->faker->unique()->randomNumber(8),
            'customer_id' => $this->faker->numberBetween(1, 40),
            'trading_id' => $this->faker->numberBetween(1, 20),
            'name_customer' => $this->faker->name(),
            'name_trading' => $this->faker->name(),
            'status_id' => $this->faker->randomElement([1,2,3]),
            'total_bruto' => $total_bruto,
            'total_iva' => $total_iva,
            'total_neto' => $total_bruto + $total_iva,
            'total_irpf' => null,
            'date_order' => $this->faker->dateTimeThisDecade(),
        ];
    }
}
