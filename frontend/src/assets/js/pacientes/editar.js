import { $, $$ } from '../modules/utils.js';
import { fetchData, updateData } from '../modules/api.js';
import { pacienteSchema } from '../modules/validation.js';
import { ZodError } from 'https://cdn.skypack.dev/zod';

let patientId;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    patientId = params.get('id');
    
    if (!patientId || isNaN(Number(patientId))) {
        alert('No se proporcionó un ID de paciente.');
        let msgParam = new URLSearchParams();
        msgParam.append("msg", 'No se proporcionó un ID de paciente por lo que no puede acceder a esa página.')
        window.location.href = `../error.html?${msgParam.toString()}`;
        return;
    }

    loadPatientData(patientId);

    const form = $('#form_filter');
    form.addEventListener('submit', handleFormSubmit);
});

async function loadPatientData(id) {
    try {
        const patient = await fetchData(`/api/pacientes/${id}`);
        populateForm(patient);
    } catch (error) {
        console.error('Error al cargar los datos del paciente:', error);
        alert('No se pudieron cargar los datos del paciente.');
        let msqParams = new URLSearchParams();
        msqParams.append("msg", "No se pudo cargar los datos del paciente. Intenta de nueva más tarde.");
        window.location.href = `../error.html?${msqParams.toString()}`;
    }
}

function populateForm(patient) {
    $('#crear_nombre_input').value = patient.nombre;
    $('#crear_apellido_input').value = patient.apellido;
    $('#crear_sexo_input').value = patient.sexo;
    $('#crear_dni_input').value = patient.dni;
    $('#fecha_nacimiento').value = patient.fecha_nacimiento.split('T')[0];
}

async function handleFormSubmit(e) {
    e.preventDefault();
    clearErrors();

    const form = $('#form_filter');
    const formData = new FormData(e.target);
    const data = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        sexo: formData.get('sexo'),
        dni: formData.get('dni'),
        fecha_nacimiento: formData.get('fecha_nacimiento')
    };

    try {
        pacienteSchema.parse(data);
        
        const result = await updateData(`/api/pacientes/${patientId}`, data);
        alert('Paciente actualizado con éxito!');
        window.location.href = './listar.html';

    } catch (error) {
        if (error instanceof ZodError) {
            displayErrors(error.errors);
        } else {
            console.error('Error al actualizar el paciente:', error);
            alert(`Error al actualizar el paciente: ${error.message}`);
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
