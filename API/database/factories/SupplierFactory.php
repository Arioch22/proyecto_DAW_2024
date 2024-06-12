<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $type = $this->faker->randomElement(['individual', 'company']);
        $name = $type === 'individual' ? $this->faker->name() : $this->faker->company();
        //$userId = \App\Models\User::inRandomOrder()->first()->id;
        $user = User::factory()->create(); // Crear un usuario si no existe ninguno
        $userId = $user->id;

        return [
            'user_id' => $userId, // 'user_id' => '1
            'name' => $name,
            'type' => $type,
            'cifnif' => $this->faker->unique()->randomNumber(8),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'postal_code' => $this->faker->postcode(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
        ];
    }
}
