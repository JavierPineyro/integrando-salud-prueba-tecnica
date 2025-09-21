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
        $apellido = $request->query('apellido');
        $dni = $request->query('dni');
        
        $pacientes = Paciente::query();

        if ($apellido) {
            $pacientes->where('apellido', 'like', '%' . $apellido . '%');
        }
        if ($dni) {
            $pacientes->where('dni', $dni);
        }

        $lista_pacientes = $pacientes->orderBy('created_at', 'desc')->paginate(10);
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
        $paciente = Paciente::create($validatedData);
        return response()->json($paciente, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $paciente = Paciente::with(['tratamientos.pet'])->withCount('tratamientos')->find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Paciente no encontrado'], 422);
        }

        $petsUniqueCount = $paciente->tratamientos->pluck('pet.id')->filter()->unique()->count();
        $paciente->setAttribute('pets_unique_count', $petsUniqueCount);
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

        $is_success = $paciente->update($validatedData);
        if (!$is_success) {
            return response()->json(['message' => 'Error al actualizar el paciente'], 422);
        }
        return response()->json($paciente);
    }

}
