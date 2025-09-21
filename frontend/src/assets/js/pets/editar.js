import { $ } from '../modules/utils.js';
import { fetchData, updateData } from '../modules/api.js';
import { petSchema } from '../modules/validation.js';
import { ZodError } from 'https://cdn.skypack.dev/zod';

let patientId;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    patientId = params.get('id');
    
    if (!patientId || isNaN(Number(patientId))) {
        alert('No se proporcionó un ID de PET.');
        window.location.href = '../error.html';
        return;
    }

    loadPatientData(patientId);

    const form = $('#form_filter');
    form.addEventListener('submit', handleFormSubmit);
});

async function loadPatientData(id) {
    try {
        const pet = await fetchData(`/api/pets/${id}`);
        populateForm(pet);
    } catch (error) {
        console.error('Error al cargar los datos del PET:', error);
        alert('No se pudieron cargar los datos del PET.');
        window.location.href = "../error.html?msg='No se pudo cargar los datos del PET. Intenta de nueva más tarde.'";
    }
}

function populateForm(pet) {
    $('#editar_nombre_input').value = pet.nombre;
    $('#editar_color_input').value = pet.color;
    $('#editar_duracion_input').value = pet.duracion_minutos;
    $('#editar_intensidad_input').value = pet.intensidad;
    $('#editar_ayuno_input').checked = pet.ayuno;
    $('#observaciones').value = pet.observaciones;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    clearErrors();

    const form = $('#form_filter');
    const formData = new FormData(e.target);
    const data = {
        nombre: formData.get('nombre'),
        color: formData.get('color'),
        duracion_minutos: formData.get('duracion_minutos'),
        intensidad: formData.get('intensidad'),
        ayuno: formData.get('ayuno') === 'on' || formData.get("ayuno") === true || formData.get("ayuno") === 'true',
        observaciones: formData.get('observaciones')
    };

    try {
        petSchema.parse(data);
        
        const result = await updateData(`/api/pets/${patientId}`, data);
        alert('PET actualizado con éxito!');
        window.location.href = './listar.html';

    } catch (error) {
        if (error instanceof ZodError) {
            displayErrors(error.errors);
        } else {
            console.error('Error al actualizar el PET:', error);
            alert(`Error al actualizar el PET: ${error.message}`);
        }
    }
}

// estoy repitiendo esto, sacarlo al archivo utils e importarlo :)
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
    const errorElements = document.querySelectorAll('.error-text');
    errorElements.forEach(el => el.textContent = '');
}
