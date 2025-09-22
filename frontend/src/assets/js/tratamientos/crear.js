import { $, $$ } from '../modules/utils.js';
import { postData, fetchData } from '../modules/api.js';
import { tratamientoSchema } from '../modules/validation.js';
import { ZodError } from 'https://cdn.skypack.dev/zod';

let patientId;

document.addEventListener('DOMContentLoaded', async () => {
    const $form = $('#form_filter');

    const params = new URLSearchParams(window.location.search);
    patientId = params.get('id');
    
    if (!patientId || isNaN(Number(patientId))) {
        alert('No se proporcionó un ID del Paciente.');
        window.location.href = '../error.html?msg="No existe la página que quiere visitar"';
        return;
    }
    $('#paciente_info').textContent = "Cargando ..."
    $('#new_treatment_btn').disabled = true
    $('#new_treatment_btn').textContent = "Cargando ..."
    

    const results = await Promise.allSettled([
        await loadPatientInfo(patientId),
        await loadPetTypes(patientId)
    ]);

    // Verificar si alguna promesa fallo
    const errors = results.filter(result => result.status === 'rejected');
    if (errors.length > 0) {
        alert('Hubo un error al cargar la información.');
        window.location.href = `../pacientes/lista-tratamientos.html?id=${patientId}`;
        return;
    }

    $('#new_treatment_btn').disabled = false
    $('#new_treatment_btn').textContent = "Crear Tratamiento"

    $form.addEventListener('submit', handleSubmit);
});

async function handleSubmit(e) {
    e.preventDefault();
    clearErrors();

    const formData = new FormData(e.target);
    const data = {
        "paciente_id": Number(patientId),
        "pet_id": Number(formData.get('pet_id')),
        "fecha_inicio": formData.get('fecha_inicio')
    };

    try {
        tratamientoSchema.parse(data);

        const result = await postData('/api/tratamientos', data);
        alert('Tratamiento creado con éxito!');
        window.location.href = `../pacientes/lista-tratamientos.html?id=${patientId}`;

    } catch (error) {
        if (error instanceof ZodError) {
            displayErrors(error.errors);
        } else {
            console.error('Error al crear el Tratamiento:', error.message);
            alert(`Error al crear el Tratamiento: ${error.message}`);
        }
    }
}

async function loadPatientInfo(patientId) {

    const $goBack = $('#go_back_to_listar')
    const $pacienteInfo = $('#paciente_info')
    let id;
    try {
        id = Number(patientId);
        const patient = await fetchData(`/api/pacientes/${id}`);

        $pacienteInfo.textContent = `Paciente: ${patient.nombre} ${patient.apellido} - DNI: ${patient.dni}`;
        $goBack.href = `../pacientes/lista-tratamientos.html?id=${id}`
                
    } catch (error) {
        console.error('Error fetching patient:', error);
        
        alert('Hubo un error al cargar los datos del paciente. Por favor, inténtelo de nuevo más tarde.');
        window.location.href = `../pacientes/lista-tratamientos.html?id=${id}`
    }
}  

async function loadPetTypes(patientId){

    const $select_pet_id = $('#pet_id');
    const id = Number(patientId);

    try {
        const activePets = await fetchData(`/api/pets/activos/all`);
        console.log(activePets);
        activePets.forEach(pet => {
            let $option = document.createElement("option");
            $option.value = pet.id;
            $option.textContent = pet.nombre;
            $select_pet_id.appendChild($option);
        })
                
    } catch (error) {
        console.error('Error fetching pets:', error);
        
        alert('Hubo un error al cargar los PETs activos. Por favor, inténtelo de nuevo más tarde.');
        //window.location.href = `../pacientes/lista-tratamientos.html?id=${id}`
    }
}

function displayErrors(errors) {
    errors.forEach(err => {
        const path = err.path[0];
        const errorMessage = err.message;
        const errorElement = $(`#error-${path}`);
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    });
}

function clearErrors() {
    const $errorElements = $$('.error-text');
    $errorElements.forEach(el => el.textContent = '');
}
