<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use App\Models\PlayerRoom;
use App\Models\Room;
use App\Models\RoomPoints;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlayersController;
use App\Http\Controllers\PointsController;
use App\Http\Controllers\RoomsController;

// Home
Route::get('/', [HomeController::class, 'show'])
    ->middleware('guest')
    ->name('home');

// Lista as ultiams salsa disponiveis
Route::get('/rooms', [RoomsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('rooms');

// Registrar uma nova sala
Route::post('/rooms', [RoomsController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('rooms');

// Show room
Route::get('/room/{id}', [RoomsController::class, 'show']
    )->middleware(['auth', 'verified'])
    ->name('room');

// Add player to room
Route::post('/room/{id}', [RoomsController::class, 'addPlayer'])
    ->middleware(['auth', 'verified'])
    ->name('room');

// Add point to player
Route::post('/room/{id}/point', [RoomsController::class, 'addPoint'])
    ->middleware(['auth', 'verified'])
    ->name('room');

// Route::delete('/room/{id}', function ($id) {
//     $room = Room::findOrFail($id);
//     $room->delete();
//     return redirect('/rooms');
// })->middleware(['auth', 'verified']);

Route::delete('/room/{id}', [RoomsController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('room.destroy');

// [RoomsController::class, 'delete']
//     )->middleware(['auth', 'verified'])
//     ->name('room');

// Show player points
Route::get('points/{id}/room/{room_id}', [PointsController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('points');

// Update player points
Route::patch('points/{id}/room/{room_id}', [PointsController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('points');

// Delete player points
Route::delete('/points/{point_id}/room/{room_id}', [PointsController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('points');

// Show rooms dashboard
Route::get('dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Show profile
Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

// Show all players
Route::get('players', [PlayersController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('players');

require __DIR__.'/auth.php';
