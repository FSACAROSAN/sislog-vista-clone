
import * as z from 'zod';

export const centroLogisticoFormSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  pais_id: z.string().min(1, { message: 'El país es requerido' }),
  ciudad_id: z.string().min(1, { message: 'La ciudad es requerida' }),
  estado: z.string().optional(),
});

export type CentroLogisticoFormValues = z.infer<typeof centroLogisticoFormSchema>;
