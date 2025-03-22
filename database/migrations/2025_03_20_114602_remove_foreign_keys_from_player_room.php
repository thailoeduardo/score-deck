<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Verificar se o banco de dados é SQLite
        if (DB::getDriverName() === 'sqlite') {
            // Desativar chaves estrangeiras temporariamente no SQLite
            DB::statement('PRAGMA foreign_keys=OFF;');

            // Criar uma tabela temporária sem as Foreign Keys
            Schema::create('player_room_temp', function (Blueprint $table) {
                $table->id();
                $table->integer('player_id'); // Removemos o foreign key
                $table->integer('room_id');   // Removemos o foreign key
                $table->timestamp('created_at')->nullable();
            });

            // Copiar os dados da tabela original para a tabela temporária
            DB::statement('INSERT INTO player_room_temp (id, player_id, room_id, created_at) SELECT id, player_id, room_id, created_at FROM player_room;');

            // Remover a tabela original
            Schema::dropIfExists('player_room');

            // Renomear a tabela temporária para o nome original
            Schema::rename('player_room_temp', 'player_room');

            // Reativar as chaves estrangeiras
            DB::statement('PRAGMA foreign_keys=ON;');
        }
        else {
            // Caso não seja SQLite, podemos apenas logar ou fazer algo diferente
            // Exemplo: lançar uma exceção ou apenas deixar o processo passar sem realizar a migração
            // Você pode lançar uma exceção ou apenas registrar no log, caso seja necessário:
            // Log::info("Remoção de Foreign Keys só é suportada para SQLite.");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Caso precise reverter, podemos recriar a tabela original com as Foreign Keys
        if (DB::getDriverName() === 'sqlite') {
            Schema::create('player_room_old', function (Blueprint $table) {
                $table->id();
                $table->integer('player_id');
                $table->integer('room_id');
                $table->timestamp('created_at')->nullable();
                $table->foreign('player_id')->references('id')->on('users');
                $table->foreign('room_id')->references('id')->on('rooms');
            });

            DB::statement('INSERT INTO player_room_old (id, player_id, room_id, created_at) SELECT id, player_id, room_id, created_at FROM player_room;');

            Schema::dropIfExists('player_room');
            Schema::rename('player_room_old', 'player_room');
        }
    }
};
