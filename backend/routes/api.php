<?php

use \App\Http\Controllers\PacienteController;
use \App\Http\Controllers\PetController;
use \App\Http\Controllers\TratamientoController;

#Route::apiResource('pacientes', PacienteController::class)->only(['index','store', 'show', 'update']);
Route::get('pacientes', [PacienteController::class, 'index']);
Route::get('pacientes/{id}', [PacienteController::class, 'show']);
Route::post('pacientes', [PacienteController::class, 'store']);
Route::put('pacientes/{id}', [PacienteController::class, 'update']);

#Route::apiResource('tratamientos', TratamientoController::class)->only(['index','store']);
Route::get('tratamientos', [TratamientoController::class, 'index']);
Route::post('tratamientos', [TratamientoController::class, 'store']);

#Route::apiResource('pets', PetController::class)->only(['index', 'store', 'show', 'update']);
Route::get('pets', [PetController::class, 'index']);
Route::get('pets/{id}', [PetController::class, 'show']);
Route::post('pets', [PetController::class, 'store']);
Route::put('pets/{id}', [PetController::class, 'update']);
Route::get('pets/activos', [PetController::class, 'listAllActive']);