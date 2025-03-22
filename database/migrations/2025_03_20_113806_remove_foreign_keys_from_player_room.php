<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (DB::getDriverName() !== 'sqlite') {
            Schema::table('player_room', function (Blueprint $table) {
                $table->dropForeign(['player_id']); // Remove a Foreign Key de player_id
                $table->dropForeign(['room_id']);   // Remove a Foreign Key de room_id
            });
        }
        // else {
        //     // Log::info("Remoção de Foreign Keys não é suportada para SQLite.");
        // }
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('player_room', function (Blueprint $table) {
            $table->foreign('player_id')->references('id')->on('users');
            $table->foreign('room_id')->references('id')->on('rooms');
        });
    }
};
