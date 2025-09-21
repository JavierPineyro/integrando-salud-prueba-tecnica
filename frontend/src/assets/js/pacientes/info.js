import {$, formatDate, getColor} from "../modules/utils.js";
import { fetchData } from '../modules/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  
    const queryParams = new URLSearchParams(window.location.search);
    const patientId = queryParams.get('id');

    if (!patientId ||  isNaN(Number(patientId))) {
        alert('ID de paciente no proporcionado en la URL.');
        window.location.href = './listar.html';
        return;
    }

    loadPatientsInfo(patientId);
}
);

async function loadPatientsInfo(patientId) {

    const $tbody = $("#pacientes_table_body");
    const $newTreatmentLink = $("#new_treatment_link");
    const $total_treatments = $("#total_treatments");
    const $lastTreatment = $("#last_treatment");
    const $petAmount = $("#pet_amount");
    const $name = $("#nombre");
    const $dni = $("#dni");
    const $sex = $("#sexo");
    const $birthday = $("#fecha_nacimiento");
    
    const id = Number(patientId);
    $tbody.innerHTML = "";

    try {
        const patient = await fetchData(`/api/pacientes/${id}`);

        $name.textContent = patient.nombre.concat(` ${patient.apellido}`);
        $dni.textContent = patient.dni;
        $sex.innerHTML = patient.sexo === "M" ? "Mujer" : "Hombre";
        $birthday.textContent = formatDate(patient.fecha_nacimiento);

        $total_treatments.textContent = patient.tratamientos_count ?? 0;
        $petAmount.textContent = patient.pets_unique_count ?? 0;
        $lastTreatment.textContent = getLastTreatmentDate(patient.tratamientos);

        $newTreatmentLink.href = `${$newTreatmentLink.href}?id=${id}`
        
        renderTableRows(patient.tratamientos)
                
    } catch (error) {
        console.error('Error fetching patients:', error);
        $tbody.innerHTML = '<tr><td colspan="8" class="text-center">Hubo un error al cargar los pacientes.</td></tr>';
        alert('Hubo un error al cargar los pacientes. Por favor, inténtelo de nuevo más tarde.');
    }
}  

function renderTableRows(treatments) {
  let $tbody = $("#pacientes_table_body");
  $tbody.innerHTML = "";

  if (treatments.length === 0) {
    $tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay tratamientos registrados para este paciente.</td></tr>';
    return;
  }

  treatments.forEach(t => {
    const row = document.createElement('tr');
    const color = getColor(t.pet.color);
    row.innerHTML = `
        <td>${t.pet.nombre}</td>
        <td style="color: ${color};">${t.pet.color}</td>
        <td>${t.pet.intensidad}/10</td>
        <td>${t.pet.duracion_minutos}</td>
        <td>${formatDate(t.fecha_inicio)}</td>
        <td><span class="sexo-badge">${t.ayuno ? "Requerido" : "No Requerido"}</span></td>
    `;
    $tbody.appendChild(row);
  });
}

function getLastTreatmentDate(treatments) {
  if (!treatments || treatments.length === 0) return 'N/A';

  const lastTreatment = treatments.reduce((latest, current) => {
    return new Date(current.fecha_inicio) > new Date(latest.fecha_inicio) ? current : latest;
  });

  return formatDate(lastTreatment.fecha_inicio);
}
