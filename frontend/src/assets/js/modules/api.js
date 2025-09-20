

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

export function postData(endpoint, data) {
    return fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Error de red, hubo un problema con la solicitud POST');
            });
        }
        return response.json();
    });
}