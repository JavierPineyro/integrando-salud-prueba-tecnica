import { z } from 'https://cdn.skypack.dev/zod';

export const pacienteSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre es requerido." }).max(100, {message: "El nombre debe de ser menos de 100 caracteres.}),
    apellido: z.string().min(1, { message: "El apellido es requerido." }),
    sexo: z.enum(['F', 'M'], { errorMap: () => ({ message: "Debe seleccionar un sexo." }) }),
    dni: z.string().min(7, { message: "El DNI debe tener al menos 7 caracteres." }),
    fecha_nacimiento: z.string().min(1, { message: "La fecha de nacimiento es requerida." })
});

export const petSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre es requerido." }),
    color: z.enum(['verde', 'amarillo', 'ambar', 'rojo'], { errorMap: () => ({ message: "Debe seleccionar un color." }) }),
    duracion_minutos: z.coerce.number().min(1, { message: "La duración debe ser mayor a 0." }),
    intensidad: z.coerce.number().min(1, { message: "La intensidad debe ser al menos 1." }).max(10, { message: "La intensidad no puede ser mayor a 10." }),
    ayuno: z.preprocess(value => value === 'on', z.boolean()),
    observaciones: z.string().max(100, { message: "Las observaciones no pueden superar los 100 caracteres." }).optional(),
});

export const tratamientoSchema = z.object({
    paciente_id: z.number().min(1, {message: "El ID del Paciente es requerido para crear el Tratamiento"}),
    pet_id: z.number().min(1, {message: "El Tipo de PET es requerido para crear el tratamiento"}),
    fecha_inicio: z.string().min(1, {message: "La fecha de inicio es requerida"}),
})
