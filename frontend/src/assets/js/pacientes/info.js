




const mockResponse = {
  "id": 1,
  "nombre": "Luis Alfonso",
  "apellido": "Gómez",
  "dni": 32904231,
  "fecha_nacimiento": "1980-05-15T00:00:00.000000Z",
  "sexo": "M",
  "created_at": "2025-09-18T17:29:07.000000Z",
  "updated_at": "2025-09-18T17:29:07.000000Z",
  "tratamientos_count": 2,
  "pets_unique_count": 2,
  "tratamientos": [
    {
      "id": 1,
      "paciente_id": 1,
      "pet_id": 1,
      "fecha_inicio": "2025-09-18T00:00:00.000000Z",
      "created_at": "2025-09-18T17:29:07.000000Z",
      "updated_at": "2025-09-18T17:29:07.000000Z",
      "pet": {
        "id": 1,
        "nombre": "PET-CT Tomografía",
        "color": "verde",
        "intensidad": 2,
        "duracion_minutos": 35,
        "ayuno": true,
        "observaciones": "Ninguna",
        "activo": true,
        "created_at": "2025-09-18T17:29:06.000000Z",
        "updated_at": "2025-09-19T20:06:40.000000Z"
      }
    },
    {
      "id": 2,
      "paciente_id": 1,
      "pet_id": 2,
      "fecha_inicio": "2025-09-19T00:00:00.000000Z",
      "created_at": "2025-09-19T20:12:05.000000Z",
      "updated_at": "2025-09-19T20:12:05.000000Z",
      "pet": {
        "id": 2,
        "nombre": "PET-AF Radiografía Computarizada",
        "color": "verde",
        "intensidad": 1,
        "duracion_minutos": 5,
        "ayuno": false,
        "observaciones": "Ninguna",
        "activo": true,
        "created_at": "2025-09-19T20:07:10.000000Z",
        "updated_at": "2025-09-19T20:07:10.000000Z"
      }
    }
  ]
}