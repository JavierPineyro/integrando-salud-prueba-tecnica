import {$, $$, getColor} from "../modules/utils.js"
import { fetchData, updateData } from '../modules/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const $filter = $("#toggle_active")
    

    $filter.addEventListener('change', (e) => {
        loadPets({"con_inactivos": e.target.checked})
    });
    
    setupTableEventListeners();
    loadPets();
});

async function loadPets(filters = {}, page = 1) {

    const $tbody = $("#pacientes_table_body");
    const $paginationContainer = $(".pagination");
    const $totalPets = $("#total_pets");
    const $activesPets = $("#actives_pets");
    const $inactivesPets = $("#inactives_pets");
    
    const { con_inactivos = 0} = filters;
    const value = con_inactivos ? "1" : "0"
    
    const queryParams = new URLSearchParams();
    queryParams.append('con_inactivos', value);
    queryParams.append('page', page);

    $tbody.innerHTML = "";
    $paginationContainer.innerHTML = "";

    try {
        const pets = await fetchData(`/api/pets?${queryParams.toString()}`);
        $tbody.innerHTML = '';
        
        if (!pets || pets.data.length === 0) {
            $tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">No se encontraron resultados.</td>
                </tr>
            `;
            $totalPets.textContent = 0;
            $activesPets.textContent = 0;
            $inactivesPets.textContent = 0;

            return;
        }
    
        $totalPets.textContent = pets.total_pet_items;
        $activesPets.textContent = pets.total_actives;
        $inactivesPets.textContent = pets.total_inactives;

        renderTableRows(pets.data)
       
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.disabled = !pets.prev_page_url;
        prevButton.addEventListener('click', () => {
            loadPets(filters, pets.current_page - 1);
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.disabled = !pets.next_page_url;
        nextButton.addEventListener('click', () => {
            loadPets(filters, pets.current_page + 1);
        });

        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Pág. ${pets.current_page} de ${pets.last_page}`;
        $paginationContainer.appendChild(prevButton);
        $paginationContainer.appendChild(pageInfo);
        $paginationContainer.appendChild(nextButton);
               
    } catch (error) {
        console.error('Error fetching pets:', error);
        $tbody.innerHTML = '<tr><td colspan="8" class="text-center">Hubo un error al cargar los PETs.</td></tr>';
        $paginationContainer.innerHTML = '';
        alert('Hubo un error al cargar los PETs. Por favor, inténtelo de nuevo más tarde.');
    }
}  

function renderTableRows(pets){
    const $tbody = $("#pacientes_table_body");
    $tbody.innerHTML = "";

    if (pets.length === 0) {
        $tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay tratamientos PET registrados.</td></tr>';
        return;
    }

    pets.forEach(pet => {
        const row = document.createElement('tr');
        const color = getColor(pet.color);
        row.innerHTML = `
            <td id="t_nam" title="${pet.nombre}">${pet.nombre}</td>
            <td title="${pet.color}" style="color: ${color};">
                <span style=" height:20px; width:20px; border-radius:9999px; background-color:${color}; display:flex; justify-content:center; align-items:center;"></span>
            </td>
            <td>${pet.intensidad}/10</td>
            <td style="font-weight: 600; gap:5px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock9-icon lucide-clock-9"><path d="M12 6v6H8"/><circle cx="12" cy="12" r="10"/></svg>
                ${pet.duracion_minutos}
            </td>
            <td>${pet.ayuno ? "Sí" : "No"}</td>
            <td id="t_obs" title="${pet.observaciones}">${pet.observaciones}</td>
            <td title="${pet.activo ? "Activo" : "Inactivo"}">
                <label class="switch">
                  <input 
                    type="checkbox"
                    name="toggle_active table_toggle" 
                    data-id-pet="${pet.id}" 
                    ${pet.activo ? "checked" : ""}
                >
                  <span class="slider"></span>
                </label>
            </td>
            <td>
                <a title="editar" href="./editar.html?id=${pet.id}" class="edit-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                </a>
            </td>
        `;
        $tbody.appendChild(row);
    });
    
}

function setupTableEventListeners() {
    const $tbody = $("#pacientes_table_body");
    const $filter = $("#toggle_active");

    $tbody.addEventListener('change', async (e) => {
        const checkbox = e.target;

        if (checkbox.matches('input[type="checkbox"][data-id-pet]')) {
            const petId = checkbox.dataset.idPet;
            const newStatus = checkbox.checked;
            console.log(petId, newStatus)
            try {
                const dataToUpdate = {
                    activo: newStatus
                };
                
                const res = await updateData(`/api/pets/${petId}`, dataToUpdate);
                loadPets({ "con_inactivos": $filter.checked });

            } catch (error) {
                console.error(`Error al actualizar el estado del PET con ID ${petId}:`, error);
                checkbox.checked = !newStatus;
                alert('Hubo un error al actualizar el estado del PET.');
            }
        }
    });
}
