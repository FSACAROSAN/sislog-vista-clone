
import { z } from 'zod';

export const terceroArticuloFormSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  referencia: z.string().optional(),
  unidad_medida_id: z.string().optional(),
  activo: z.boolean().default(true),
});

export type TerceroArticuloFormValues = z.infer<typeof terceroArticuloFormSchema>;
