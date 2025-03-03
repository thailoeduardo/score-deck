<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerRoom extends Model
{
    use HasFactory;

    //
    protected $table = 'player_room';

    //
    protected $fillable = ['player_id', 'room_id'];

    //
    const UPDATED_AT = null; // Remove updated_at

    // Relacionamento com a tabela de usuários
    public function user()
    {
        return $this->belongsTo(User::class, 'player_id');
    }
}
