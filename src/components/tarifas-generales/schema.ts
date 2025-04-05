
import { z } from 'zod';

export const tarifaGeneralFormSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  precio: z.coerce.number().positive({ message: 'El precio debe ser un valor positivo' }),
  estado: z.string().default('Activo'),
});

export type TarifaGeneralFormValues = z.infer<typeof tarifaGeneralFormSchema>;
