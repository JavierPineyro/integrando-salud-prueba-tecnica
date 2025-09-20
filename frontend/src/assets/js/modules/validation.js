import { z } from 'https://cdn.skypack.dev/zod';

export const pacienteSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre es requerido." }),
    apellido: z.string().min(1, { message: "El apellido es requerido." }),
    sexo: z.enum(['F', 'M'], { errorMap: () => ({ message: "Debe seleccionar un sexo." }) }),
    dni: z.string().min(7, { message: "El DNI debe tener al menos 7 caracteres." }),
    fecha_nacimiento: z.string().min(1, { message: "La fecha de nacimiento es requerida." })
});
