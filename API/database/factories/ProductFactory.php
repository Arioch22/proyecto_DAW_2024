<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(1, 20),
            'stock' => $this->faker->numberBetween(1, 10),
            'stock_min' => $this->faker->numberBetween(1, 2)
        ];
    }
}
