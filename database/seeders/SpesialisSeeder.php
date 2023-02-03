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
                'nama_spesialis' => "Umum"
            ], [
                'nama_spesialis' => "Gigi"
            ], [
                'nama_spesialis' => "Anak"
            ], [
                'nama_spesialis' => "Kebidanan dan Kandungan"
            ], [
                'nama_spesialis' => "THT"
            ],
        ]);
    }
}
