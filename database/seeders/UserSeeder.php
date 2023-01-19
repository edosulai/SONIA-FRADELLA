<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@agrana.com',
            'password' => bcrypt('admin'),
            // 'remember_token' => Str::random(10),
            // 'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $admin->markEmailAsVerified();
    }
}
