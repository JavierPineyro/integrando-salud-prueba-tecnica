<?php

namespace App\Services;

use App\Models\Paciente;

class PacienteService {
    function getAll($apellido = null, $dni = null, $perPage = 10) {
        $query = Paciente::query();

        if ($apellido) {
            $query->where('apellido', 'like', '%' . $apellido . '%');
        }
        if ($dni) {
            $query->where('dni', $dni);
        }
        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    function create($data) {
        return Paciente::create($data);
    }

    function findById($id) {
        $paciente = Paciente::with(['tratamientos.pet'])->withCount('tratamientos')->find($id);
        if ($paciente) {
            $petsUniqueCount = $paciente->tratamientos->pluck('pet.id')->filter()->unique()->count();
            $paciente->setAttribute('pets_unique_count', $petsUniqueCount);
        }
        return $paciente;
    }

    function update($id, $data) {
        $paciente = Paciente::find($id);
        if (!$paciente) {
            throw Exception('Paciente no encontrado');
        }
        $is_success = $paciente->update($data);
        if (!$is_success) {
            throw Exception('Error actualizando paciente');
        }
        return $paciente;
    }
}