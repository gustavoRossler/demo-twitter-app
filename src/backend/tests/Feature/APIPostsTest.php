<?php

namespace Tests\Feature;

use App\Models\Post;
use Database\Seeders\PostsSeeder;
use Database\Seeders\UsersSeeder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class APIPostsTest extends TestCase
{
    use WithoutMiddleware;
    use RefreshDatabase;
    use DatabaseMigrations;

    protected $commonHeaders = [
        'Accept' => 'application/json',
    ];

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(UsersSeeder::class);
        $this->seed(PostsSeeder::class);
    }

    public function test_can_create_new_post()
    {
        $postData = [
            'user_id' => 1,
            'content' => 'Post test ...',
        ];
        $response = $this->post('/api/posts', $postData, $this->commonHeaders);
        $response->assertStatus(201);
    }

    public function test_can_list_author_posts()
    {
        $totalPosts = Post::where('author_id', 2)->count();
        $response = $this->get('/api/posts?authorId=2&userId=2', $this->commonHeaders);
        $response->assertStatus(200)
            ->assertJsonFragment([
                'totalItems' => $totalPosts,
            ]);
    }

    public function test_can_list_following_users_posts()
    {
        $totalPosts = Post::where('author_id', 1)->count();
        $response = $this->get('/api/posts?userId=2&fromUsersFollowing=1', $this->commonHeaders);
        $response->assertStatus(200)
            ->assertJsonFragment([
                'totalItems' => $totalPosts,
            ]);
    }
}
