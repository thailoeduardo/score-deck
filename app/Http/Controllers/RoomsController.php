<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
use App\Models\PlayerRoom;
use App\Models\RoomPoints;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomsController extends Controller
{
    // Shoow all rooms that are not closed
    public function index()
    {
        $rooms = Room::where('is_closed', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return view('rooms', compact('rooms'));
    }

    // Create a new room
    public function create()
    {
        $room = new Room();
        $room->is_closed = false;
        $room->save();

        return redirect('/room/' . $room->id);
    }

    // Show a room
    public function show($id)
    {
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

        $room = Room::findOrFail($id);

        return view('room', ['room' => $room]);
    }

    // Add a player to a room
    public function addPlayer($id, Request $request)
    {
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
        $player = new PlayerRoom();
        $player->room_id = $id;
        $player->player_id = $user_id;
        $player->save();

        return redirect()->back()->with('success', 'Jogador adicionado com sucesso!');
    }

    // Add points to a player
    public function addPoint(Request $request, $id)
    {
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

        // // Validação
        // $request->validate([
        //     'user_id' => 'required|exists:users,id',
        //     'points' => 'required|integer|min:0',
        // ], [
        //     'user_id.required' => 'Selecione um jogador!',
        //     'user_id.exists' => 'Jogador não encontrado!',
        // ]);

        // // Pegar o ID do usuário
        // $user_id = $request->input('user_id');

        // // Pegar o pontos do jogador
        // $points = $request->input('points');

        // // Encontrar a sala pelo ID
        // $room = Room::findOrFail($id);

        // // Encontrar o jogador na sala
        // $player = PlayerRoom::where('room_id', $id)
        //                     ->where('player_id', $user_id)
        //                     ->first();

        // if (!$player) {
        //     return redirect()->back()->with('error', 'Jogador não encontrado na sala!');
        // }

        // $roomPoints = new RoomPoints();
        // $roomPoints->room_id = $id;
        // $roomPoints->player_id = $user_id;
        // $roomPoints->points = $points;
        // $roomPoints->save();

        // return redirect()->back()->with('success', 'Ponto adicionado com sucesso!');
    }

    // Delete room
    public function destroy($id) {
        $room = Room::findOrFail($id);

        // Excluir os jogadores da sala antes de excluir a sala
        // DB::table('player_room')->where('room_id', $id)->delete();

        $room->delete();

        return redirect('/rooms')->with('success', 'Sala deletada com sucesso!');
    }
}
