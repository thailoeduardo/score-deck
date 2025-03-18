<?php

use App\Http\Controllers\HomeController;
use App\Models\PlayerRoom;
use App\Models\Room;
use App\Models\RoomPoints;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', [HomeController::class, 'show'])
    ->middleware('guest')
    ->name('home');

/**
 * listar a ultima sala
 *
 */
Route::get('/rooms', function () {
    $rooms = Room::where('is_closed', false)->get();

    return view('rooms', ['rooms' => $rooms]);
})->middleware(['auth', 'verified'])->name('match');

/**
 * Registrar uma nova sala
 *
 */
Route::post('/rooms', function () {
    $room = new Room();
    $room->is_closed = false;
    $room->save();

    return redirect('/room/' . $room->id);
})->middleware(['auth', 'verified'])->name('rooms');

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
    $room = Room::findOrFail($id);

    $usersRoom = PlayerRoom::where('room_id', $id)
        ->with('user')
        ->get()
        ->pluck('user');

    $users = User::All();

    $points = RoomPoints::where('room_id', $id)
        ->with('user')
        ->get();


    // Agrupar os pontos por usuário e calcular a soma total de cada jogador
    $totalPoints = RoomPoints::where('room_id', $id)
        ->with('user')
        ->selectRaw('player_id, SUM(points) as total_points')
        ->groupBy('player_id')
        ->get()
        ->keyBy('player_id'); // Usa o user_id como chave para fácil acesso

    // validar se na sala algum jogador ja tem a pontuiuacao igual ou aciam de 100

    $playerWith100Points = RoomPoints::where('room_id', $id)
        ->selectRaw('player_id, SUM(points) as total_points')
        ->groupBy('player_id')
        ->havingRaw('SUM(points) >= 100')
        ->exists();

    // dd($playerWith100Points);

    // ATUALIZAR O STATUS DA SALA
    if ($playerWith100Points) {
        $room->is_closed = true;
        $room->closed_at = now();
        $room->save();
    }

    return view('room', [
        'room'      => $room,
        'usersRoom' => $usersRoom,
        'users'     => $users,
        'points'    => $points,
        'totalPoints'    => $totalPoints,
    ]);
})->middleware(['auth', 'verified'])->name('room');

/**
 * Adicionar um jogador a uma sala
 */
Route::post('/room/{id}', function ($id, Request $request) {
    // Validação
    $request->validate([
        'user_id' => 'required|exists:users,id',
    ], [
        'user_id.required' => 'Selecione um jogador!',
        'user_id.exists' => 'Jogador não encontrado!',
    ]);

    // Pegar o ID do usuário
    $user_id = $request->input('user_id');

    // Verificar se o jogador já está na sala
    $playerExists = PlayerRoom::where('room_id', $id)
                              ->where('player_id', $user_id)
                              ->exists();

    if ($playerExists) {
        return redirect()->back()->withErrors(['user_id' => 'Jogador já está na sala!']);
    }

    // Encontrar a sala pelo ID
    $room = Room::findOrFail($id);

    // Adicionar o jogador à sala
    PlayerRoom::create([
        'player_id' => $user_id,
        'room_id' => $id,
        'created_at' => now(),
    ]);

    return redirect()->back()->with('success', 'Jogador adicionado com sucesso!');

    // // Encontrar a sala pelo ID usando Eloquent
    // $room = Room::findOrFail($id);
    // // pegar o id do usuario
    // $user_id = request('user_id');

    // // validar se usuario existe
    // $user = User::find($user_id);
    // if (!$user) {
    //     return redirect()->back()->with('error', 'Jogador não encontrado!');
    // }

    // // valdiae se camo esta ppreenchido
    // if (!$user_id) {
    //     return redirect()->back()->with('error', 'Selecione um jogador!');
    // }

    // // validar se usuario ja esta na sala
    // $player = PlayerRoom::where('room_id', $id)->where('player_id', $user_id)->first();

    // if ($player) {
    //     return redirect()->back()->with('error', 'Jogador já está na sala!');
    // }


    // // dd($id, $user_id);

    // // adiciona na sala
    // $player = new PlayerRoom();
    // //converter string par inteiro
    // $player->player_id = $user_id;
    // $player->room_id = $id;
    // $player->created_at = now();
    // $player->save();
    // // return redirect('/room/' . $room->id);
    // return redirect()->back()->with('success', 'Jogador adicionado com sucesso!');
})->middleware(['auth', 'verified'])->name('room');

/**
 * Adicionar ponto ao jogador
 */
Route::post('/room/{id}/point', function ($id, Request $request) {
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'points' => 'required|integer|min:0',
    ], [
        'user_id.required' => 'Selecione um jogador!',
        'user_id.exists' => 'Jogador não encontrado!',
    ]);

    // Pegar o ID do usuário
    $user_id = $request->input('user_id');

    // Pegar o pontos do jogador
    $points = $request->input('points');

    // Encontrar a sala pelo ID
    $room = Room::findOrFail($id);

    // Encontrar o jogador na sala
    $player = PlayerRoom::where('room_id', $id)
                        ->where('player_id', $user_id)
                        ->first();

    if (!$player) {
        return redirect()->back()->with('error', 'Jogador não encontrado na sala!');
    }

     $roomPoints = new RoomPoints();
     $roomPoints->room_id = $id;
     $roomPoints->player_id = $user_id;
     $roomPoints->points = $points;
     $roomPoints->save();

    return redirect()->back()->with('success', 'Ponto adicionado com sucesso!');
})->middleware(['auth', 'verified'])->name('room');


Route::get('dashboard', function () {
    // $room = null; // Inicializa a variável para evitar erros

    // // Buscar o último ponto registrado
    // $lastPoint = RoomPoints::orderBy('id', 'desc')->first();

    // // Se existir um ponto, buscar a sala correspondente
    // if ($lastPoint) {
    //     $room = Room::where('id', $lastPoint->room_id)->first();

    //     // Se a sala estiver fechada, buscar a última sala aberta
    //     if ($room && $room->is_closed) {
    //         $room = Room::where('is_closed', false)
    //                     ->orderBy('id', 'desc')
    //                     ->first();
    //     }
    // }

    $rooms = Room::orderBy('id', 'desc')->get();
    $totalPoints = [];

    foreach ($rooms as $room) {
        // $totalPoints[]['room_id'] = $room->id;

        // $totalPoints[] = RoomPoints::where('room_id', $room->id)
        // ->with('user')
        // ->selectRaw('player_id, SUM(points) as total_points')
        // ->groupBy('player_id')
        // ->get()
        // ->keyBy('player_id');

        $totalPoints[$room->id] = [
            'room_id' => $room->id,
            'points' => RoomPoints::where('room_id', $room->id)
                ->with('user')
                ->selectRaw('player_id, SUM(points) as total_points')
                ->groupBy('player_id')
                ->get()
                ->keyBy('player_id'),
        ];

    }

    return view('dashboard', ['totalPoints' => $totalPoints]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');


Route::get('players', function () {
    return view('players');
})->middleware(['auth', 'verified'])->name('players');

require __DIR__.'/auth.php';
