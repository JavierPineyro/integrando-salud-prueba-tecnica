// src/assets/js/patients.js

import { fetchData, postData } from './modules/api.js';

// Detecta la ruta de la página actual
const currentPath = window.location.pathname;

// --- Lógica para la página de lista (patients/list.html) ---
if (currentPath.includes('patients/list.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const patients = await fetchData('/api/patients');
        // Lógica para mostrar la lista
    });
}

// --- Lógica para la página de creación (patients/create.html) ---
if (currentPath.includes('patients/create.html')) {
    const form = document.getElementById('create-patient-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newPatient = { /* datos del formulario */ };
        await postData('/api/patients', newPatient);
        window.location.href = './list.html'; // Redirige al listado
    });
}

// --- Lógica para la página de edición (patients/edit.html) ---
if (currentPath.includes('patients/edit.html')) {
    const patientId = new URLSearchParams(window.location.search).get('id');
    document.addEventListener('DOMContentLoaded', async () => {
        const patientData = await fetchData(`/api/patients/${patientId}`);
        // Lógica para rellenar el formulario de edición
    });
}
