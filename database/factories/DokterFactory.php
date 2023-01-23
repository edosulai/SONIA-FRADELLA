<?php

namespace Database\Factories;

use App\Models\Spesialis;
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
            'no_identitas' => $this->faker->numerify('########'),
            'spesialis_id' => Spesialis::inRandomOrder()->first()->id,
            // 'awal_jam_praktek' => $this->faker->time('H:i:s'),
            // 'akhir_jam_praktek' => $this->faker->time('H:i:s'),
        ];
    }
}
