<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogOutController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\Address\AddController;
use App\Http\Controllers\Api\Auth\Address\GetController;
use App\Http\Controllers\Api\Auth\Address\DeleteController;
use App\Http\Controllers\Api\Auth\Tracker\AddTrackerController;
use App\Http\Controllers\Api\Auth\Tracker\GetTrackerController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/register', RegisterController::class);
Route::post('/auth/login', LoginController::class);
Route::post('/auth/logout', LogOutController::class)->middleware("auth:sanctum");
Route::post('/auth/address', AddController::class)->middleware("auth:sanctum");
Route::options('/auth/address', GetController::class)->middleware("auth:sanctum");
Route::delete('/auth/address/{id}', DeleteController::class)->middleware("auth:sanctum");
Route::post('/auth/tracker', AddTrackerController::class)->middleware("auth:sanctum");
Route::get('/auth/tracker', GetTrackerController::class)->middleware("auth:sanctum");


Route::get('/check-connection', function () {
    try {
        DB::connection()->getRawPdo();
        echo "Connected successfully to the database!";
    } catch (\Exception $e) {
        die("Could not connect to the database. Error: " . $e);
    }
})->middleware("auth:sanctum");
