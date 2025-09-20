<?php
use App\Models\Pet;

class PetService {
   
    function getAll($con_inactivos) {
        $pets = Pet::query();

        if (!$con_inactivos) {
            $pets->where('activo', true);
        }

        return $pets->paginate(10);
    }

    function getAllActives() {
        return Pet::where('activo', true)->select('id', 'nombre')->get();
    }

    function create($validatedData) {
        return Pet::create($validatedData);
    }

    function findById($id) {
        return Pet::find($id);
    }

    function update($id, $data) {
        $pet = Pet::find($id);
        if (!$pet) {
            throw Exception('Pet no encontrado');
        }
        $is_success = $pet->update($data);
        if (!$is_success) {
            throw Exception('Error actualizando pet');
        }
        return $pet;
    }
}