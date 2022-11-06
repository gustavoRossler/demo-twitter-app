<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostsRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    /**
     * Returns a json object with a list of Posts
     */
    public function list(Request $request)
    {
        // Set pagination variables
        $page = $request->page ?? 0;
        $pageSize = 10;

        // Loads logged user
        if (getenv('APP_ENV') == 'testing') {
            $userId = $request->userId;
        } else {
            $user = Auth::user();
            $userId = $user->id;
        }

        // Get request parameters used to filter the results
        $fromUsersFollowing = $request->fromUsersFollowing;
        $authorId = $request->authorId;

        // Check if the user is the author, or if the user is following the author
        if ($authorId) {
            $isFollowingAuthor = User::whereHas('following', function ($query) use ($authorId, $userId) {
                $query->where('followed_user_id', $authorId)
                    ->where('follower_user_id', $userId);
            })->exists();

            if (!$isFollowingAuthor && $authorId != $userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You must follow the user to see his/her posts.'
                ], 403);
            }
        }

        // If no filter is used then just the users posts will be listed by default
        if (!$fromUsersFollowing && !$authorId) {
            $authorId = $userId;
        }

        // Count the total items without pagination
        $total = $this->getPostsList($authorId, $userId, $fromUsersFollowing)
            ->count();

        // Fetch the items list paginated
        $posts = $this->getPostsList($authorId, $userId, $fromUsersFollowing)
            ->orderBy('created_at', 'desc')
            ->offset($page * $pageSize)
            ->limit($pageSize)
            ->get();

        return response()->json([
            'status' => 'success',
            'posts' => $posts,
            'totalItems' => $total,
            'totalPages' => ceil($total / $pageSize)
        ]);
    }

    /**
     * Returns a query builder object of Posts list
     */
    protected function getPostsList($authorId, $userId, $fromUsersFollowing)
    {
        return Post::where(function ($query) use ($authorId, $userId, $fromUsersFollowing) {
            if ($authorId) {
                $query->orWhere('author_id', $authorId);
            }
            if ($fromUsersFollowing) {
                $query->orWhereIn('author_id', function ($subQuery) use ($userId) {
                    $subQuery->from('users_followers')
                        ->select('followed_user_id')
                        ->where('follower_user_id', $userId);
                });
            }
        });
    }

    /**
     * Creates a new Post object in database and returns a json object with the created Post
     */
    public function create(PostsRequest $request)
    {
        if (getenv('APP_ENV') == 'testing') {
            $userId = $request->user_id;
        } else {
            $user = Auth::user();
            $userId = $user->id;
        }

        $post = Post::create([
            'content' => $request->content,
            'author_id' => $userId,
        ]);

        return response()->json([
            'status' => 'success',
            'post' => $post,
        ], 201);
    }
}
