<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'name' => 'Test User 1',
            'username' => 'test1',
            'email' => 'test1@example.com',
            'password' => Hash::make('a1b2c3'),
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Test User 2',
            'username' => 'test2',
            'email' => 'test2@example.com',
            'password' => Hash::make('a1b2c3'),
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Test User 3',
            'username' => 'test3',
            'email' => 'test3@example.com',
            'password' => Hash::make('a1b2c3'),
        ]);

        DB::table('users_followers')->insert([
            'followed_user_id' => 1,
            'follower_user_id' => 2,
        ]);
    }
}
