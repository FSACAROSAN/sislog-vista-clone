
import { z } from 'zod';

export const empresaFormSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  correo: z.string().email({ message: 'Correo electrónico inválido' }).optional().or(z.literal('')),
  telefono: z.string().optional().or(z.literal('')),
  estado: z.string().default('Activo'),
});

export type EmpresaFormValues = z.infer<typeof empresaFormSchema>;

export const defaultValues: EmpresaFormValues = {
  nombre: '',
  correo: '',
  telefono: '',
  estado: 'Activo',
};
