<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tratamiento;
use App\Services\TratamientoService;

class TratamientoController extends Controller
{
    protected $tratamiento_service;

    public function __construct(TratamientoService $tratamiento_service){
        $this->tratamiento_service = $tratamiento_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paciente_id = $request->query('paciente_id');
        $result = $this->tratamiento_service->getAll($paciente_id);
        return response()->json($result);
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

        $result = $this->tratamiento_service->create($validatedData);
        return response()->json($result, 201);
    }

}
