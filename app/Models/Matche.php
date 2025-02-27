<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Matche extends Model
{
    //
    protected $table = 'matches';

    //
    protected $fillable = ['room_id'];

    //
    const UPDATED_AT = null; // Remove updated_at
}
