<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    //
    protected $table = 'rooms';

    //
    protected $fillable = ['is_closed'];

    //
    const UPDATED_AT = null; // Remove updated_at
}
