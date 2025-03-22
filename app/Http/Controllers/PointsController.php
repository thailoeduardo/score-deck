<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\PlayerRoom;
use App\Models\RoomPoints;
use Illuminate\Http\Request;

class PointsController extends Controller
{
    // show player points
    public function show($id, $room_id)
    {
        $room = Room::findOrFail($room_id);

        // Room is closed
        // if ($room->is_closed) {
        //     return redirect('/rooms')->with('error', 'Sala fechada!');
        // }

        // Encontrar os pontos pelo ID
        $points = RoomPoints::findOrFail($id);

        // Retornar todos os usuários da sala
        $usersRoom = PlayerRoom::where('room_id', $room_id)
            ->with('user')
            ->get()
            ->pluck('user');

        return view('points', ['points' => $points, 'usersRoom' => $usersRoom, 'room' => $room]);
    }

    // Update player points
    public function update($id, $room_id, Request $request)
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
        // $room = Room::findOrFail($id);

        // Encontrar o jogador na sala
        $player = PlayerRoom::where('room_id', $room_id)
                            ->where('player_id', $user_id)
                            ->first();

        if (!$player) {
            return redirect()->back()->with('error', 'Jogador não encontrado na sala!');
        }

        $roomPoints = new RoomPoints();
        //  $roomPoints->room_id = $id;
        $roomPoints->player_id = $user_id;
        $roomPoints->points = $points;
        $roomPoints->updated_at = now();
        $roomPoints->save();

        //  return redirect()->back()->with('success', 'Ponto adicionado com sucesso!');
        return redirect('/room/'.$room_id)->with('success', 'Ponto deletado com sucesso!');

            //     // Agrupar os pontos por usuário e calcular a soma total de cada jogador
            // // $points = RoomPoints::where('id', $point_id)
            // //     ->with('user')
            // //     ->get()
            // //     ->keyBy('player_id'); // Usa o user_id como chave para fácil acesso

            // $room = Room::findOrFail($id);

            // // Encontrar a sala pelo ID
            // $points = RoomPoints::findOrFail($point_id);

            // $usersRoom = PlayerRoom::where('room_id', $id)
            //     ->with('user')
            //     ->get()
            //     ->pluck('user');

            // return view('point', ['points' => $points, 'usersRoom' => $usersRoom, 'room' => $room]);

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

        // // Atualizar os pontos do jogador
        // $user = User::find($user_id);
        // $user->points = $points;
        // $user->save();

        // return redirect()->back()->with('success', 'Pontos atualizados com sucesso!');
    }


    // //update player points
    // public function update(Request $request)
    // {
    //     {
    //         $request->validate([
    //             'user_id' => 'required|exists:users,id',
    //             'points' => 'required|integer|min:0',
    //         ], [
    //             'user_id.required' => 'Selecione um jogador!',
    //             'user_id.exists' => 'Jogador não encontrado!',
    //         ]);

    //         // Pegar o ID do jogador e os pontos informados
    //         $user_id = $request->input('user_id');
    //         $points = $request->input('points');

    //         // Encontrar a sala pelo ID
    //         $room = Room::findOrFail($room_id);

    //         // Verificar se o novo jogador está na sala
    //         $player = PlayerRoom::where('room_id', $room_id)
    //                             ->where('player_id', $user_id)
    //                             ->first();

    //         if (!$player) {
    //             return redirect()->back()->with('error', 'Jogador não encontrado na sala!');
    //         }

    //         // Buscar o registro dos pontos pelo ID da pontuação ($point_id)
    //         $roomPoints = RoomPoints::find($point_id);

    //         if (!$roomPoints) {
    //             return redirect()->back()->with('error', 'Registro de pontuação não encontrado!');
    //         }

    //         // Atualizar jogador e pontos
    //         $roomPoints->player_id = $user_id;
    //         $roomPoints->points = $points;
    //         $roomPoints->save();

    //         return redirect('/room/'.$room_id)->with('success', 'Ponto atualziado com sucesso!');
    //     }

    //     // // $request->validate([
    //     // //     'user_id' => 'required|exists:users,id',
    //     // //     'points' => 'required|integer|min:0',
    //     // // ], [
    //     // //     'user_id.required' => 'Selecione um jogador!',
    //     // //     'user_id.exists' => 'Jogador não encontrado!',
    //     // // ]);

    //     // // Pegar o ID do jogador e os pontos informados
    //     // $user_id = $request->input('user_id');
    //     // $points = $request->input('points');

    //     // // Encontrar a sala pelo ID
    //     // $room = Room::findOrFail($room_id);

    //     // // Verificar se o novo jogador está na sala
    //     // $player = PlayerRoom::where('room_id', $room_id)
    //     //                     ->where('player_id', $user_id)
    //     //                     ->first();

    //     // if (!$player) {
    //     //     return redirect()->back()->with('error', 'Jogador não encontrado na sala!');
    //     // }

    //     // // Buscar o registro dos pontos pelo ID da pontuação ($point_id)
    //     // $roomPoints = RoomPoints::find($point_id);

    //     // if (!$roomPoints) {
    //     //     return redirect()->back()->with('error', 'Registro de pontuação não encontrado!');
    //     // }

    //     // // Atualizar jogador e pontos
    //     // $roomPoints->player_id = $user_id;
    //     // $roomPoints->points = $points;
    //     // $roomPoints->save();

    //     // return redirect('/room/'.$room_id)->with('success', 'Ponto atualziado com sucesso!');
    // }

    // delete player points
    public function destroy($id, $room_id, Request $request)
    {
        //   Log::info('Requisição DELETE recebida!', [
        //     'room_id' => $room_id,
        //     'point_id' => $point_id,
        //     'request' => $request->all()
        // ]);

        // Buscar o registro de pontos pelo ID
        $roomPoints = RoomPoints::where('id', $id)
                                ->where('room_id', $room_id)
                                ->first();

        // Verificar se o registro existe
        if (!$roomPoints) {
            return redirect()->back()->with('error', 'Registro de pontuação não encontrado!');
        }

        // Deletar o registro
        $roomPoints->delete();

        return redirect('/room/'.$room_id)->with('success', 'Ponto deletado com sucesso!');

        // // Log::info('Requisição DELETE recebida!', [
        // //     'room_id' => $room_id,
        // //     'point_id' => $point_id,
        // //     'request' => $request->all()
        // // ]);

        // // Teste se está chegando
        // dd("Recebi a requisição!", $room_id, $point_id, $request->all());

        // // Buscar o registro de pontos pelo ID
        // $roomPoints = RoomPoints::where('room_id', $room_id)
        //                         ->where('id', $point_id)
        //                         ->first();

        // // Verificar se o registro existe
        // if (!$roomPoints) {
        //     return redirect()->back()->with('error', 'Registro de pontuação não encontrado!');
        // }

        // // Deletar o registro
        // // $roomPoints->delete();

        // return redirect('/room/'.$room_id)->with('success', 'Ponto deletado com sucesso!');
    }
}
