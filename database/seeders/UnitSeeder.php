<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('units')->insert([
            [
                'nama_unit' => "Umum"
            ], [
                'nama_unit' => "Balita"
            ], [
                'nama_unit' => "Lansia"
            ], [
                'nama_unit' => "THT"
            ], [
                'nama_unit' => "Poliklinik"
            ],
        ]);
    }
}
