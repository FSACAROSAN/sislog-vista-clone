
import * as z from 'zod';

export const bodegaFormSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres',
  }),
  centro_logistico_id: z.string().min(1, {
    message: 'Debe seleccionar un centro logístico',
  }),
  estado: z.string(),
});

export type BodegaFormValues = z.infer<typeof bodegaFormSchema>;
