<?php

namespace App\Http\Controllers;

use App\Http\Requests\FollowersRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UsersController extends Controller
{

    public function addFollowingUser(FollowersRequest $request)
    {
        $user = Auth::user();

        $user->following()->attach($request->user_id, ['created_at' => date("Y-m-d H:i:s", strtotime('now'))]);

        return response()->json([
            'status' => 'success',
            'message' => 'User added to the following list successfully',
        ], 201);
    }

    public function removeFollowingUser(FollowersRequest $request)
    {
        $user = Auth::user();

        $user->following()->detach($request->user_id);

        return response()->json([
            'status' => 'success',
            'message' => 'User removed from following list successfully',
        ]);
    }
}
