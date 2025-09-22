<?php
namespace App\Services;

use App\Models\Tratamiento;

class TratamientoService
{
    function getAll($paciente_id = null) {
        $query = Tratamiento::with(['paciente', 'pet']);

        if ($paciente_id) {
            $query->where('paciente_id', $paciente_id);
        }

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }

    function create($data) {
        $tratamiento = Tratamiento::create($data);
        return $tratamiento->load(['paciente', 'pet']);
    }
}