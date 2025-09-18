<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paciente;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $apellido = request->query('apellido');
        $dni = request->query('dni');
        
        $pacientes = Paciente::query();

        if ($apellido) {
            $pacientes->where('apellido', 'like', '%' . $apellido . '%');
        }
        if ($dni) {
            $pacientes->where('dni', $dni);
        }

        $lista_pacientes = $pacientes->paginate(10);
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

        $paciente = Paciente::create($validatedData);
        return response()->json($paciente, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $paciente = Paciente::find($id);
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
        $paciente = Paciente::find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Paciente no encontrado'], 422);
        }

        $validatedData = $request->validate([
            'nombre' => 'sometimes|string|max:100',
            'apellido' => 'sometimes|string|max:100',
            'dni' => 'sometimes|integer|unique:pacientes,dni,' . $id,
            'fecha_nacimiento' => 'sometimes|date',
            'sexo' => 'sometimes|in:M,F',
        ]);

        $paciente->update($validatedData);
        return response()->json($paciente);
    }

}
