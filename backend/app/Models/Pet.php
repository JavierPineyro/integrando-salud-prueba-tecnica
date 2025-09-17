<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
            
class Pet extends Model
{
    protected $fillable = ['nombre', 
        'color', 
        'intesidad', 
        'duracion_minutos', 
        'ayuno', 
        'observaciones'
    ];
}
