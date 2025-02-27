<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchePlayer extends Model
{
    //
    protected $table = 'matche_players';

    //
    protected $fillable = ['matche_id', 'player_id', 'points'];

    //
    const UPDATED_AT = null; // Remove updated_at
}
