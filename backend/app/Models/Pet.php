<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
            
class Pet extends Model
{
    protected $fillable = [
        'nombre', 
        'color', 
        'activo',
        'ayuno', 
        'duracion_minutos', 
        'intesidad', 
        'observaciones'
    ];

    public function tratamientos()
    {
        return $this->hasMany(Tratamiento::class);
    }
}
