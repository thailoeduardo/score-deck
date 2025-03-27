<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlayersController;
use App\Http\Controllers\PointsController;
use App\Http\Controllers\RoomsController;

// Home
Route::get('/', [HomeController::class, 'show'])
    ->middleware('guest')
    ->name('home');

// Dashboard
Route::get('dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Listar as ultimas salas disponiveis
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

// Adicionar jogador na sala
Route::post('/room/{id}', [RoomsController::class, 'addPlayer'])
    ->middleware(['auth', 'verified'])
    ->name('room');

// Adicionar ponto ao jogador
Route::post('/room/{id}/point', [RoomsController::class, 'addPoint'])
    ->middleware(['auth', 'verified'])
    ->name('room');

// Apagar sala
Route::delete('/room/{id}', [RoomsController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('room.destroy');

// Exibir pontos do jogador
Route::get('points/{id}/room/{room_id}', [PointsController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('points');

// Atualziar pontos do jogador
Route::patch('points/{id}/room/{room_id}', [PointsController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('points');

// Apagar pontos do jogador
Route::delete('/points/{point_id}/room/{room_id}', [PointsController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('points');

// Exibir os dados do jogador
Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

// Exibir todos os jogadores
Route::get('players', [PlayersController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('players');

require __DIR__.'/auth.php';
