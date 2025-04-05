
import { z } from 'zod';

export const paisFormSchema = z.object({
  nombre_es: z.string().min(2, { message: 'El nombre en español debe tener al menos 2 caracteres' }),
  nombre_en: z.string().min(2, { message: 'El nombre en inglés debe tener al menos 2 caracteres' }),
  iso2: z.string().length(2, { message: 'El código ISO2 debe tener exactamente 2 caracteres' }),
  iso3: z.string().length(3, { message: 'El código ISO3 debe tener exactamente 3 caracteres' }),
  codigo: z.coerce.number().int().positive({ message: 'El código debe ser un número positivo' }),
  estado: z.string().default('Activo'),
});

export type PaisFormValues = z.infer<typeof paisFormSchema>;
