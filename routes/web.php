<?php

use App\Models\MatchePlayer;
use App\Models\PlayerRoom;
use App\Models\Room;
use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome');

// listar a ultiam sala ativa
Route::get('/rooms', function () {
    $room = Room::orderBy('id', 'desc')->first();

    return view('rooms', ['room' => $room]);
})->middleware(['auth', 'verified'])->name('match');

/**
 * Exibir dados da Sala selecionada
 *
 * findOrFail: Substituímos find por findOrFail para lidar automaticamente com o caso em que a sala
 * não é encontrada, retornando um erro 404.
 *
 * Eager Loading: Usamos with('user') para carregar os usuários relacionados com as salas de uma vez,
 * evitando múltiplas consultas no loop foreach.
 *
 *
 * Pluck: Utilizamos pluck('user.name') para obter diretamente os nomes dos usuários como uma
 * coleção de strings.
 *
 */
Route::get('/room/{id}', function ($id) {
    // Encontrar a sala pelo ID usando Eloquent
    $room = Room::findOrFail($id);

    // Carregar os usuários da sala usando Eager Loading
    // $users = PlayerRoom::where('room_id', $id)
    //     ->with('user')
    //     ->get()->pluck('user.name'); // Obter apenas os nomes dos usuários

     // Carregar os usuários da sala, garantindo que existam usuários associados
     $users = PlayerRoom::where('room_id', $id)
        ->with('user')
        ->get()
        ->pluck('user');
        // ->filter(fn($playerRoom) => $playerRoom->user) // Remove registros sem usuário
        // ->map(fn($playerRoom) => $playerRoom->user); // Retorna o objeto completo do usuário


    return view('room', [
        'room'  => $room,
        'users' => $users,
    ]);
})->middleware(['auth', 'verified'])->name('match');

// Route::view('/registrar-partida', 'match')->middleware(['auth', 'verified'])->name('match');

Route::get('/registrar-partida', function () {

    return view('match', ['users' => \App\Models\User::all()]);
})->middleware(['auth', 'verified'])->name('match');

Route::post('/registrar-partida', function () {

    return view('dashboard');
})->middleware(['auth', 'verified'])->name('match');

// Route::view('dashboard', 'dashboard')
//     ->middleware(['auth', 'verified'])
//     ->name('dashboard');

Route::get('dashboard', function () {
    $rooms = "";                                                    //Room::all(); // Busca todos as salas
                                                                    // # TODO: Buscar as ultimas cinco jogadaS
    $matches = MatchePlayer::orderBy('id', 'desc')->take(5)->get(); // Busca as ultimas cinco jogadas
                                                                    // Matche::orderBy('id', 'desc')->take(5)->get();//

    // $matches = MatchePlayer::all(); // Busca todos as jogadas

    return view('dashboard', ['rooms' => $rooms, 'matches' => $matches]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

require __DIR__.'/auth.php';
