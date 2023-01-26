<?php

namespace Database\Factories;

use App\Models\Pasien;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UnitPasien>
 */
class UnitPasienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'pasien_id' => Pasien::inRandomOrder()->first()->id,
            'unit_id' => Unit::inRandomOrder()->first()->id
        ];
    }
}
