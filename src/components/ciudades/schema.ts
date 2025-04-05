
import { z } from 'zod';

export const ciudadFormSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  pais_id: z.string().uuid({ message: 'Debe seleccionar un país válido' }),
  estado: z.string().default('Activo'),
});

export type CiudadFormValues = z.infer<typeof ciudadFormSchema>;
