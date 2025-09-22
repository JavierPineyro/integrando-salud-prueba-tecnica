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
        $pet8 = \App\Models\Pet::create([
            'nombre' => 'Spect Óseo con tecnecio-99m',
            'color' => 'amarillo',
            'intensidad' => 5,
            'duracion_minutos' => 60,
            'ayuno' => false,
            'observaciones' => 'Hidratación adecuada.',
            'activo' => true,
        ]);

        $pet4 = \App\Models\Pet::create([
            'nombre' => 'PET Cerebral FDG',
            'color' => 'ambar',
            'intensidad' => 7,
            'duracion_minutos' => 40,
            'ayuno' => true,
            'observaciones' => 'Ayuno de 6 horas; evitar estimulantes',
            'activo' => true,
        ]);

        $pet11 = \App\Models\Pet::create([
            'nombre' => 'Tomografía Estándar',
            'color' => 'verde',
            'intensidad' => 3,
            'duracion_minutos' => 16,
            'ayuno' => true,
            'observaciones' => 'Ninguna.',
            'activo' => true,
        ]);

        $pet10 = \App\Models\Pet::create([
            'nombre' => 'Terapia Hipotiroidismo',
            'color' => 'amarillo',
            'intensidad' => 4,
            'duracion_minutos' => 35,
            'ayuno' => true,
            'observaciones' => 'No embarazos; aislamiento posterior al tratamiento.',
            'activo' => true,
        ]);

        $pet7 = \App\Models\Pet::create([
            'nombre' => 'Gammagrafía renal con DMSA',
            'color' => 'verde',
            'intensidad' => 4,
            'duracion_minutos' => 30,
            'ayuno' => false,
            'observaciones' => 'Hidratación post-procedimiento.',
            'activo' => true,
        ]);

        $pet6 = \App\Models\Pet::create([
            'nombre' => 'PET/CT de próstata PSMA',
            'color' => 'ambar',
            'intensidad' => 7,
            'duracion_minutos' => 60,
            'ayuno' => false,
            'observaciones' => 'Hidratación previa adecuada.',
            'activo' => true,
        ]);

        $pet3 = \App\Models\Pet::create([
            'nombre' => 'PET-CT Cuerpo completo',
            'color' => 'rojo',
            'intensidad' => 8,
            'duracion_minutos' => 90,
            'ayuno' => true,
            'observaciones' => 'Ayuno de 6 horas; no ejercitarse 24hs antes',
            'activo' => true,
        ]);

        $pet2 = \App\Models\Pet::create([
            'nombre' => 'PET-AF Radiografía Computarizada',
            'color' => 'verde',
            'intensidad' => 1,
            'duracion_minutos' => 5,
            'ayuno' => false,
            'observaciones' => 'Ninguna',
            'activo' => true,
        ]);

        $pet1 = \App\Models\Pet::create([
            'nombre' => 'PET-CT Tomografía',
            'color' => 'verde',
            'intensidad' => 2,
            'duracion_minutos' => 35,
            'ayuno' => true,
            'observaciones' => 'Ninguna',
            'activo' => true,
        ]);
        $pet12 = \App\Models\Pet::create([
            'nombre' => 'PET-CL de alta intensidad',
            'color' => 'rojo',
            'intensidad' => 10,
            'duracion_minutos' => 5,
            'ayuno' => true,
            'observaciones' => 'No embarazos; aislamiento posterior al tratamiento.',
            'activo' => false,
        ]);

        $pet9 = \App\Models\Pet::create([
            'nombre' => 'Terapia I-131 para Hipertiroidismo',
            'color' => 'rojo',
            'intensidad' => 8,
            'duracion_minutos' => 35,
            'ayuno' => true,
            'observaciones' => 'No embarazos; aislamiento posterior al tratamiento.',
            'activo' => false,
        ]);

        $pet5 = \App\Models\Pet::create([
            'nombre' => 'PET Cardíaco con Amoníaco',
            'color' => 'rojo',
            'intensidad' => 9,
            'duracion_minutos' => 45,
            'ayuno' => false,
            'observaciones' => 'Requiere monitoreo cardíaco continuo.',
            'activo' => false,
        ]);


        $paciente13 = \App\Models\Paciente::create([
            'nombre' => 'Martín',
            'apellido' => 'Giménez',
            'sexo' => 'M',
            'dni' => 34567213,
            'fecha_nacimiento' => '1985-03-22',
        ]);

        $paciente14 = \App\Models\Paciente::create([
            'nombre' => 'Camila',
            'apellido' => 'Ruiz',
            'sexo' => 'F',
            'dni' => 41230876,
            'fecha_nacimiento' => '1998-10-05',
        ]);

        $paciente15 = \App\Models\Paciente::create([
            'nombre' => 'Emiliano',
            'apellido' => 'Sosa',
            'sexo' => 'M',
            'dni' => 38900123,
            'fecha_nacimiento' => '1993-12-14',
        ]);

        $paciente16 = \App\Models\Paciente::create([
            'nombre' => 'Julieta',
            'apellido' => 'Mansilla',
            'sexo' => 'F',
            'dni' => 40678450,
            'fecha_nacimiento' => '2001-01-30',
        ]);

        $paciente17 = \App\Models\Paciente::create([
            'nombre' => 'Tomás',
            'apellido' => 'Delgado',
            'sexo' => 'M',
            'dni' => 37455678,
            'fecha_nacimiento' => '1987-07-19',
        ]);

        $paciente12 = \App\Models\Paciente::create([
            'nombre' => 'Ana',
            'apellido' => 'Llorente',
            'sexo' => 'F',
            'dni' => 40192301,
            'fecha_nacimiento' => '1991-07-02',
        ]);

        $paciente11 = \App\Models\Paciente::create([
            'nombre' => 'Gabriel',
            'apellido' => 'Rodriguez',
            'sexo' => 'M',
            'dni' => 42780651,
            'fecha_nacimiento' => '2003-07-15',
        ]);

        $paciente10 = \App\Models\Paciente::create([
            'nombre' => 'Valentina',
            'apellido' => 'Perez',
            'sexo' => 'F',
            'dni' => 32768556,
            'fecha_nacimiento' => '1991-06-10',
        ]);

        $paciente9 = \App\Models\Paciente::create([
            'nombre' => 'Andrea',
            'apellido' => 'Lopez',
            'sexo' => 'F',
            'dni' => 30123456,
            'fecha_nacimiento' => '1990-09-21',
        ]);

        $paciente8 = \App\Models\Paciente::create([
            'nombre' => 'Javier',
            'apellido' => 'Torres',
            'sexo' => 'M',
            'dni' => 25776345,
            'fecha_nacimiento' => '1989-05-12',
        ]);

        $paciente7 = \App\Models\Paciente::create([
            'nombre' => 'Luciano',
            'apellido' => 'Torres',
            'sexo' => 'M',
            'dni' => 41779043,
            'fecha_nacimiento' => '1999-05-14',
        ]);

        $paciente6 = \App\Models\Paciente::create([
            'nombre' => 'Sofía',
            'apellido' => 'Galindo',
            'sexo' => 'F',
            'dni' => 41704438,
            'fecha_nacimiento' => '1982-11-03',
        ]);

        $paciente5 = \App\Models\Paciente::create([
            'nombre' => 'Mario',
            'apellido' => 'Martinez',
            'sexo' => 'M',
            'dni' => 39200312,
            'fecha_nacimiento' => '1976-09-21',
        ]);

        $paciente4 = \App\Models\Paciente::create([
            'nombre' => 'Florencia',
            'apellido' => 'Vega',
            'sexo' => 'F',
            'dni' => 40863442,
            'fecha_nacimiento' => '2000-08-12',
        ]);

        $paciente3 = \App\Models\Paciente::create([
            'nombre' => 'Agustina',
            'apellido' => 'Llorente',
            'sexo' => 'F',
            'dni' => 38709282,
            'fecha_nacimiento' => '1996-05-06',
        ]);

        $tratamiento1 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente4->id,
            'pet_id' => $pet10->id,
            'fecha_inicio' => '2025-09-24',
        ]);

        $tratamiento2 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente6->id,
            'pet_id' => $pet3->id,
            'fecha_inicio' => '2025-10-21',
        ]);

        $tratamiento3 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente3->id,
            'pet_id' => $pet1->id,
            'fecha_inicio' => '2025-12-19',
        ]);

        $tratamiento4 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente5->id,
            'pet_id' => $pet4->id,
            'fecha_inicio' => '2025-09-22',
        ]);

        $tratamiento5 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente7->id,
            'pet_id' => $pet6->id,
            'fecha_inicio' => '2025-09-27',
        ]);

        $tratamiento6 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente10->id,
            'pet_id' => $pet2->id,
            'fecha_inicio' => '2025-11-29',
        ]);

        $tratamiento7 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente8->id,
            'pet_id' => $pet7->id,
            'fecha_inicio' => '2025-09-21',
        ]);

        $tratamiento8 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente12->id,
            'pet_id' => $pet12->id,
            'fecha_inicio' => '2025-09-23',
        ]);

        $tratamiento9 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente14->id,
            'pet_id' => $pet5->id,
            'fecha_inicio' => '2025-12-02',
        ]);

        $tratamiento10 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente14->id,
            'pet_id' => $pet9->id,
            'fecha_inicio' => '2025-10-14',
        ]);

        $tratamiento11 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente11->id,
            'pet_id' => $pet11->id,
            'fecha_inicio' => '2025-09-24',
        ]);

        $tratamiento12 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente16->id,
            'pet_id' => $pet8->id,
            'fecha_inicio' => '2025-12-12',
        ]);

        $tratamiento13 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente13->id,
            'pet_id' => $pet3->id,
            'fecha_inicio' => '2025-09-22',
        ]);

        $tratamiento14 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente15->id,
            'pet_id' => $pet6->id,
            'fecha_inicio' => '2025-09-21',
        ]);

        $tratamiento15 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente15->id,
            'pet_id' => $pet10->id,
            'fecha_inicio' => '2025-010-07',
        ]);

        $tratamiento16 = \App\Models\Tratamiento::create([
            'paciente_id' => $paciente17->id,
            'pet_id' => $pet1->id,
            'fecha_inicio' => '2025-11-26',
        ]);
    }
}
