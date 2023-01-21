<?php

namespace Database\Factories;

use App\Models\Status;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kunjungan>
 */
class KunjunganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'status_id' => Status::inRandomOrder()->first()->id,
            'unit_id' => Unit::inRandomOrder()->first()->id,
        ];
    }
}
