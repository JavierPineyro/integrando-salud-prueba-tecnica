<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    protected $fillable = [
        'nombre',
        'apellido',
        'fecha_nacimiento',
        'sexo',
        'dni',
    ];

    public function tratamientos()
    {
        return $this->hasMany(Tratamiento::class);
    }
}
