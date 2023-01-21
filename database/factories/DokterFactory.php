<?php

namespace Database\Factories;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dokter>
 */
class DokterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nama_dokter' => $this->faker->name,
            'no_telp' => $this->faker->phoneNumber,
            'unit_id' => Unit::inRandomOrder()->first()->id,
        ];
    }
}
