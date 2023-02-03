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
                'jenis_unit' => "Poliklinik Umum"
            ], [
                'jenis_unit' => "Poliklinik Gigi Mulut"
            ], [
                'jenis_unit' => "KIA/KB"
            ], [
                'jenis_unit' => "MTBS"
            ], [
                'jenis_unit' => "Imunisasi"
            ],
        ]);
    }
}
