<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registran>
 */
class RegistranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nama_pasien' => $this->faker->name,
            'nama_kepala_keluarga' => $this->faker->name,
            'no_kartu' => $this->faker->numerify('############'),
            'umur' => $this->faker->numberBetween(6, 60),
            'alamat' => $this->faker->address,
            'jenis_kelamin' => $this->faker->randomElement(['laki-laki', 'perempuan']),
            'status' => $this->faker->randomElement(['umum', 'jkm', 'bpjs']),
        ];
    }
}
