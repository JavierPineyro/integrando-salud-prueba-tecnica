<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $con_inactivos = $request->query('con_inactivos', '0') === '1';
        $pets = Pet::query();

        if (!$con_inactivos) {
            $pets->where('activo', true);
        }

        $lista_pets = $pets->paginate(10);
        return response()->json($lista_pets);
    }

    public function listAllActive()
    {
        $pets = Pet::where('activo', true)->select('id', 'nombre')->get();
        return response()->json($pets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'color' => 'required|in:verde,amarillo,ambar,rojo',
            'intensidad' => 'required|integer|between:1,10',
            'duracion_minutos' => 'required|integer|min:1',
            'ayuno' => 'sometimes|boolean',
            'observaciones' => 'sometimes|string|nullable',
            'activo' => 'sometimes|boolean',
        ]);

        // Acá tammbien devuelve error 500 si falla, mucho boilerplate poner try catch
        $pet = Pet::create($validatedData);
        return response()->json($pet, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pet = Pet::find($id);
        if (!$pet) {
            return response()->json([
                'message' => 'Tipo de tratamiento (PET) no encontrado'], 422);
        }
        return response()->json($pet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pet = Pet::find($id);
        if (!$pet) {
            return response()->json(['message' => 'Tipo de tratamiento (PET) no encontrado'], 422);
        }

        $validatedData = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'color' => 'sometimes|in:verde,amarillo,ambar,rojo',
            'intensidad' => 'sometimes|integer|between:1,10',
            'duracion_minutos' => 'sometimes|integer|min:1',
            'ayuno' => 'sometimes|boolean',
            'observaciones' => 'sometimes|string|nullable',
            'activo' => 'sometimes|boolean',
        ]);

        $is_success = $pet->update($validatedData);
        if (!$is_success) {
            return response()->json(['message' => 'Error al actualizar el tipo de tratamiento (PET)'], 422);
        }
        return response()->json($pet);
    }
}
