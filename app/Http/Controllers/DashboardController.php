<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomPoints;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // Show rooms
    public function index()
    {
        $rooms = Room::orderBy('created_at', 'desc')
            ->where('is_closed', true)
            ->get();

        $totalPoints = [];

        foreach ($rooms as $room) {
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
    }
}
