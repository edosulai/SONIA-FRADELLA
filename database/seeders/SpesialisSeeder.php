<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpesialisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('spesialis')->insert([
            [
                'nama_spesialis' => "Cardiologist"
            ], [
                'nama_spesialis' => "Pediatrician"
            ], [
                'nama_spesialis' => "Neurologist"
            ],
        ]);
    }
}
