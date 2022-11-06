<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class APIUsersTest extends TestCase
{
    use DatabaseMigrations;
    use RefreshDatabase;

    protected $commonHeaders = [
        'Accept' => 'application/json',
    ];

    public function test_user_model_can_be_instantiated()
    {
        $user = User::factory()->create();
        $user->delete();
        $this->assertModelMissing($user);
    }

    public function test_new_users_can_registered()
    {
        $user = User::factory()->create();
        $userData = $user->toArray();
        $userData['password'] = $user->password;
        $user->delete();

        $response = $this->post('/api/users', $userData, $this->commonHeaders);
        $response->assertStatus(201);
    }
}
