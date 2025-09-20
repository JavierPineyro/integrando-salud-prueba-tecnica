import {$, $$} from "../modules/utils.js"
import { fetchData } from '../modules/api.js';
import { baseUrl, formatDate, calculateAge } from '../modules/utils.js';
//const currentPath = window.location.pathname;


document.addEventListener('DOMContentLoaded', async () => {
    const $form = $("#form_filter")
 
    $form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const apellido = formData.get('apellido').trim();
        const dni = formData.get('dni').trim();
        loadPatients({ apellido, dni });
    });

    loadPatients();
});

function createSexoBadge(sexo) {
    const sexoText = sexo === 'M' ? 'Hombre' : 'Mujer';
    return `<span class="sexo-badge">${sexoText}</span>`;
}

async function loadPatients(filters = {}, page = 1) {

    const $tbody = $("#patients_table_body");
    const $paginationContainer = $(".pagination");
    const $totalPatients = $("#total");
    const $totalResults = $("#resultados");
    const $xPacientes = $(".x-pacientes");
    
    const { apellido = '', dni = '' } = filters;
    const queryParams = new URLSearchParams();
    
    if (apellido) queryParams.append('apellido', apellido);
    if (dni) queryParams.append('dni', dni);
    queryParams.append('page', page);

    $tbody.innerHTML = "";
    $paginationContainer.innerHTML = "";

    try {
        const patients = await fetchData(`/api/pacientes?${queryParams.toString()}`);
        $tbody.innerHTML = '';
        
        if (patients.data.length === 0) {
            $tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">No se encontraron pacientes.</td>
                </tr>
            `;
            $totalPatients.textContent = 0;
            $totalResults.textContent = 0;
            $xPacientes.textContent = 0;
            return;
        }
    
        $totalPatients.textContent = 0;
        $totalResults.textContent = patients.total;
        $xPacientes.textContent = patients.total;
        
        patients.data.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.nombre}</td>
                <td>${patient.apellido}</td>
                <td>${patient.dni}</td>
                <td>${calculateAge(patient.fecha_nacimiento)}</td>
                <td>${formatDate(patient.fecha_nacimiento)}</td>
                <td>${createSexoBadge(patient.sexo)}</td>
                <td>${formatDate(patient.created_at)}</td>
                <td>
                    <a title="ver más" href="./lista-tratamientos.html?id=${patient.id}" class="show-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                        </a>
                        <a title="editar" href="./editar.html?id=${patient.id}" class="edit-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                        </a>
                </td>
            `;
            $tbody.appendChild(row);
        });
        
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.disabled = !patients.prev_page_url;
        prevButton.addEventListener('click', () => {
            loadPatients(filters, patients.current_page - 1);
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.disabled = !patients.next_page_url;
        nextButton.addEventListener('click', () => {
            loadPatients(filters, patients.current_page + 1);
        });

        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Pág. ${patients.current_page} de ${patients.last_page}`;
        $paginationContainer.appendChild(prevButton);
        $paginationContainer.appendChild(pageInfo);
        $paginationContainer.appendChild(nextButton);
        
    } catch (error) {
         console.error('Error fetching patients:', error);
        $tbody.innerHTML = '<tr><td colspan="8" class="text-center">Hubo un error al cargar los pacientes.</td></tr>';
        $paginationContainer.innerHTML = '';
        alert('Hubo un error al cargar los pacientes. Por favor, inténtelo de nuevo más tarde.');
    }
}  

  let ejemploResultadoBackend = {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "nombre": "Luis Alfonso",
        "apellido": "Gómez",
        "dni": 32904231,
        "fecha_nacimiento": "1980-05-15T00:00:00.000000Z",
        "sexo": "M",
        "created_at": "2025-09-18T17:29:07.000000Z",
        "updated_at": "2025-09-18T17:29:07.000000Z"
      }
    ],
    "first_page_url": "http://localhost:8000/api/pacientes?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://localhost:8000/api/pacientes?page=1",
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "page": null,
        "active": false
      },
      {
        "url": "http://localhost:8000/api/pacientes?page=1",
        "label": "1",
        "page": 1,
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "page": null,
        "active": false
      }
    ],
    "next_page_url": null,
    "path": "http://localhost:8000/api/pacientes",
    "per_page": 10,
    "prev_page_url": null,
    "to": 1,
    "total": 1
  }
