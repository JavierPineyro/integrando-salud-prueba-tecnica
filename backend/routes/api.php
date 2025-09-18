<?php

use \App\Http\Controllers\PacienteController;
use \App\Http\Controllers\PetController;
use \App\Http\Controllers\TratamientoController;

Route::apiResource('pacientes', PacienteController::class)->only(['index','store', 'show', 'update']);
Route::apiResource('tratamientos', TratamientoController::class)->only(['index','store']);

Route::apiResource('pets', PetController::class)->only(['index', 'store', 'show', 'update']);
Route::get('pets/activos', [PetController::class, 'listAllActive']);