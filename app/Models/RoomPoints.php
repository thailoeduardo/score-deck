<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomPoints extends Model
{
    //
    protected $table = 'room_points';

    //
    protected $fillable = ['room_id', 'player_id', 'points'];

    public function user()
    {
        return $this->belongsTo(User::class, 'player_id');
    }
}
