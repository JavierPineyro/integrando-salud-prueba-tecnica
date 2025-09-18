<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $pet = \App\Models\Pet::create([
            'nombre' => 'PET-CT Tomografía',
            'color' => 'verde',
            'activo' => true,
            'ayuno' => true,
            'duracion_minutos' => 35,
            'intensidad' => 4,
            'observaciones' => 'Ninguna'
        ]);
        $paciente = \App\Models\Paciente::create([
            'nombre' => 'Luis Alfonso',
            'apellido' => 'Gómez',
            'sexo' => 'M',
            'dni' => 32904231,
            'fecha_nacimiento' => '1980-05-15',
        ]);
        $tratamientos = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente->id,
            'pet_id' => $pet->id,
            'fecha_inicio' => '2025-09-18',
        ]);
    }
}
