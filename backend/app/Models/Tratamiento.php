<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tratamiento extends Model
{
    protected $fillable = [
        'paciente_id',
        'pet_id',
        'fecha_inicio',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
    ];

    
    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
}
