<?php

namespace App\Services;

use App\Models\Pet;

class PetService {
   
    function getAll($con_inactivos) {
        $pets = Pet::query();

         if (!$con_inactivos) {
            $pets->where('activo', true);
        }else{
            $pets->where('activo', false);
        }

        $lista_pets = $pets->orderBy('updated_at', 'desc')->paginate(10);
        $total_actives = Pet::where("activo", true)->count();
        $total_inactives = Pet::where("activo", false)->count();
        $total_pet_items = Pet::count();

        $result = $lista_pets->toArray();
        $result["total_actives"] = $total_actives;
        $result["total_inactives"] = $total_inactives;
        $result["total_pet_items"] = $total_pet_items;

        return $result;
    }

    function getAllActives() {
        return Pet::where('activo', true)
                        ->orderBy('created_at', 'desc')
                        ->select('id', 'nombre')
                        ->get();
    }

    function create($data) {
        return Pet::create($data);
    }

    function findById($id) {
        return Pet::find($id);
    }

    function update($id, $data) {
        $pet = Pet::find($id);
        if (!$pet) {
            throw Exception('Tipo de tratamiento (PET) no encontrado');
        }
        $is_success = $pet->update($data);
        if (!$is_success) {
            throw Exception('Error al actualizar el tipo de tratamiento (PET)');
        }
        return $pet;
    }
}