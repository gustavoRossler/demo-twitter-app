<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\UsersSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class APIAuthTest extends TestCase
{
    use DatabaseMigrations;
    use RefreshDatabase;

    protected $commonHeaders = [
        'Accept' => 'application/json',
    ];

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UsersSeeder::class);
    }

    public function test_refresh_token_permission()
    {
        $response = $this->get('/api/refresh-token', $this->commonHeaders);
        $response->assertStatus(401);
    }

    public function test_user_can_login()
    {
        $this->seed();
        $loginData = [
            'username' => 'test1',
            'password' => 'a1b2c3',
        ];
        $response = $this->post('/api/login', $loginData, $this->commonHeaders);
        $response->assertStatus(200)
            ->assertJsonFragment([
                'status' => 'success',
            ]);
        $jsonData = json_decode($response->getContent());
        return $jsonData->authorization->token;
    }

    /**
     * @depends test_user_can_login
     */
    public function test_can_refresh_token($token)
    {
        $headers = [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ];
        $response = $this->get('/api/refresh-token', $headers);
        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'user',
                'authorization' => [
                    'token',
                    'type'
                ]
            ]);
    }

    public function test_check_authentication_on_private_route()
    {
        $response = $this->get('/api/posts', $this->commonHeaders);
        $response->assertStatus(401);
    }
}
