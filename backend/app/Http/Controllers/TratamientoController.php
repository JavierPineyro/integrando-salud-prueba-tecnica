<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tratamiento;

class TratamientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paciente_id = $request->query('paciente_id');
        $query = Tratamiento::with(['paciente', 'pet']);

        if ($paciente_id) {
            $query->where('paciente_id', $paciente_id);
        }

        $tratamientos = $query->orderBy('created_at', 'desc')->paginate(10);
        return response()->json($tratamientos);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'pet_id' => 'required|exists:pets,id,activo,1', // creo que la db acepta 1 como true???
            'fecha_inicio' => 'required|date',
        ]);

        $tratamiento = Tratamiento::create($validatedData);
        $full_response = $tratamiento->load(['paciente', 'pet']);
        return response()->json($full_response, 201);

    }

}
