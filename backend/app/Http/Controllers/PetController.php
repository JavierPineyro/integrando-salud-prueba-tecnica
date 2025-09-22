<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use App\Services\PetService;

class PetController extends Controller
{

    protected $pet_service;

    public function __construct(PetService $pet_service){
        $this->pet_service = $pet_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $con_inactivos = $request->query('con_inactivos', '0') === '1';
        $result = $this->pet_service->getAll($con_inactivos);
        
        return response()->json($result);
    }

    public function listAllActive()
    {
        $result = $this->pet_service->getAllActives();
        return response()->json($result);
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
        $result = $this->pet_service->create($validatedData);
        return response()->json($result, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pet = $this->pet_service->findById($id);
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
        try {
            $validatedData = $request->validate([
                'nombre' => 'sometimes|string|max:255',
                'color' => 'sometimes|in:verde,amarillo,ambar,rojo',
                'intensidad' => 'sometimes|integer|between:1,10',
                'duracion_minutos' => 'sometimes|integer|min:1',
                'ayuno' => 'sometimes|boolean',
                'observaciones' => 'sometimes|string|nullable',
                'activo' => 'sometimes|boolean',
            ]);

            $result = $this->pet_service->update($id, $validatedData);
            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al actualizar el pet:' . $e->getMessage()], 422);
        }
    }
}
