<?php

namespace Database\Factories;

use App\Models\Pasien;
use App\Models\Registran;
use App\Models\Unit;
use App\Models\UnitPasien;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pasien>
 */
class PasienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $timestamps = $this->faker->dateTimeBetween('-1 year', 'now');

        return [
            'registran_id' => Registran::inRandomOrder()->first()->id,
            'created_at' => $timestamps,
            'updated_at' => $timestamps
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Pasien $pasien) {
            $unitLength = rand(1, Unit::count());
            $units = Unit::all()->toArray();

            $unitPasien = [];
            for ($i = 0; $i < $unitLength; $i++) {
                $unitPasien[] = [
                    'id' => $this->faker->unique()->randomNumber(4),
                    'pasien_id' => $pasien->id,
                    'unit_id' => $units[$i]['id'],
                    'created_at' => $pasien->created_at,
                    'updated_at' => $pasien->updated_at
                ];
            }
            UnitPasien::insert($unitPasien);
        });
    }
}
