

export function fetchData(endpoint) {
    return fetch(`http://localhost:8000${endpoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de red, hubo un problema con la solicitud');
            }
            return response.json();
        }
    );
}