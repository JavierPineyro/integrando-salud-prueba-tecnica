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
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->enum('color', ['verde', 'yellow', 'ambar', 'rojo',]);
            $table->unsignedInteger('intensidad');
            $table->unsignedInteger('duracion_minutos');
            $table->boolean('ayuno')->default(false);
            $table->string('observaciones')->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
