<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/', function (Request $request) {
    return 'API v.1';
});
Route::post('/users', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::get('/refresh-token', [AuthController::class, 'refresh']);

Route::prefix('/users')->middleware('auth:api')->group(function () {
    Route::post('/add-following', [UsersController::class, 'addFollowingUser']);
    Route::post('/remove-following', [UsersController::class, 'removeFollowingUser']);
    Route::get('/find', [UsersController::class, 'find']);
});

Route::prefix('/posts')->middleware('auth:api')->group(function () {
    Route::get('/', [PostsController::class, 'list']);
    Route::post('/', [PostsController::class, 'create']);
});
