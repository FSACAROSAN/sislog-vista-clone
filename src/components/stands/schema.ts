
import * as z from 'zod';

export const standFormSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres',
  }),
  bodega_id: z.string().min(1, {
    message: 'Debe seleccionar una bodega',
  }),
  estado: z.string(),
});

export type StandFormValues = z.infer<typeof standFormSchema>;
