<?php

namespace Database\Seeders;

use App\Models\Kunjungan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KunjunganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Kunjungan::factory(1500)->create();
    }
}
