
import { z } from "zod";

export const equipoFormSchema = z.object({
  codigo: z.string().min(1, "El código es requerido").max(15, "El código no puede exceder 15 caracteres"),
  referencia: z.string().min(1, "La referencia es requerida").max(120, "La referencia no puede exceder 120 caracteres"),
  estado: z.boolean().default(true),
  clase_id: z.string().uuid().nullable().optional(),
  tipo_id: z.string().uuid().nullable().optional(),
});

export const equipoClaseSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  estado: z.boolean().default(true)
});

export const equipoTipoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  estado: z.boolean().default(true)
});

export type EquipoFormValues = z.infer<typeof equipoFormSchema>;
export type EquipoClaseFormValues = z.infer<typeof equipoClaseSchema>;
export type EquipoTipoFormValues = z.infer<typeof equipoTipoSchema>;
