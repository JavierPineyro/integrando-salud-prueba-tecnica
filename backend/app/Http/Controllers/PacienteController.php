<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paciente;
use App\Services\PacienteService;

class PacienteController extends Controller
{
    protected $paciente_service;
    
    public function __construct(PacienteService $paciente_service) {
        $this->paciente_service = $paciente_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $apellido = $request->query('apellido');
        $dni = $request->query('dni');

        $lista_pacientes = $this->paciente_service->getAll($apellido, $dni);
        return response()->json($lista_pacientes);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'dni' => 'required|integer|unique:pacientes,dni',
            'fecha_nacimiento' => 'required|date',
            'sexo' => 'required|in:M,F',
        ]);

        // Si falla lanza un error 500 automáticamente creo
        // no voy a poner try catch para esto, demasiado boilerplate
        $result = $this->paciente_service->create($validatedData);
        return response()->json($result, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $paciente = $this->paciente_service->findById($id);
        if (!$paciente) {
            return response()->json(['message' => 'Paciente no encontrado'], 422);
        }

        return response()->json($paciente);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => 'sometimes|string|max:100',
                'apellido' => 'sometimes|string|max:100',
                'dni' => 'sometimes|integer|unique:pacientes,dni,' . $id,
                'fecha_nacimiento' => 'sometimes|date',
                'sexo' => 'sometimes|in:M,F',
            ]);
            $result =$this->paciente_service->update($id, $validatedData);
            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al actualizar el paciente:' . $e->getMessage()], 422);
        } 
    }
}
