<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PlayersController extends Controller
{
    // show all players
    public function index()
    {
        $players = User::all();

        return view('players', ['players' => $players]);
    }
}
