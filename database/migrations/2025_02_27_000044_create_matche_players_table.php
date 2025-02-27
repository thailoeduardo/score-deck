<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matche_players', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('matche_id');
            $table->unsignedBigInteger('player_id');
            $table->integer('points')->default(0);
            $table->foreign('matche_id')->references('id')->on('matches');
            $table->foreign('player_id')->references('id')->on('users');
            $table->unique(['matche_id', 'player_id']);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matche_players');
    }
};
