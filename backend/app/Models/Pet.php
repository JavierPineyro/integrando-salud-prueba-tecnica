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
        'intensidad', 
        'observaciones'
    ];

    protected $casts = [
       'ayuno' => 'boolean',         
       'activo' => 'boolean',        
       'intensidad' => 'integer',       
       'duracion_minutos' => 'integer', 
    ];


    public function tratamientos()
    {
        return $this->hasMany(Tratamiento::class);
    }
}
