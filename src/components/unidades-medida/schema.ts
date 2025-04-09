
import { z } from 'zod';

export const unidadMedidaFormSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  estado: z.boolean().default(true),
});

export type UnidadMedidaFormValues = z.infer<typeof unidadMedidaFormSchema>;
