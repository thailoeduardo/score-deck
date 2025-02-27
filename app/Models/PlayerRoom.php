<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayerRoom extends Model
{
    //
    protected $table = 'player_room';

    //
    protected $fillable = ['player_id', 'room_id'];

    //
    const UPDATED_AT = null; // Remove updated_at
}
