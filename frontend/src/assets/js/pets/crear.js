import { $, $$ } from '../modules/utils.js';
import { postData } from '../modules/api.js';
import { petSchema } from '../modules/validation.js';
import { ZodError } from 'https://cdn.skypack.dev/zod';

document.addEventListener('DOMContentLoaded', () => {
    const form = $('#form_filter');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const formData = new FormData(e.target);
        const data = {
            nombre: formData.get('nombre'),
            color: formData.get('color'),
            duracion_minutos: formData.get('duracion_minutos'),
            intensidad: formData.get('intensidad'),
            ayuno: formData.get('ayuno'),
            observaciones: formData.get('observaciones')
        };

        try {
            petSchema.parse(data);
            
            const result = await postData('/api/pets', data);
            alert('PET creado con éxito!');
            window.location.href = './listar.html';

        } catch (error) {
            if (error instanceof ZodError) {
                displayErrors(error.errors);
            } else {
                console.error('Error al crear el PET:', error.message);
                alert(`Error al crear el PET: ${error.message}`);
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
