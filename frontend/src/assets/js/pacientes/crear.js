import { $, $$ } from '../modules/utils.js';
import { postData } from '../modules/api.js';
import { pacienteSchema } from '../modules/validation.js';
import { ZodError } from 'https://cdn.skypack.dev/zod';

document.addEventListener('DOMContentLoaded', () => {
    const form = $('#form_filter');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

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
            
            const result = await postData('/api/pacientes', data);
            console.log('Paciente creado:', result);
            alert('Paciente creado con éxito!');
            window.location.href = './listar.html';

        } catch (error) {
            if (error instanceof ZodError) {
                displayErrors(error.issues);
            } else {
                console.error('Error al crear el paciente:', error.message);
                alert(`Error al crear el paciente: ${error.message}`);
            }
        }
    });
});

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
