
import { z } from "zod";

export const equipoClaseSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(120, "Máximo 120 caracteres"),
  estado: z.boolean().default(true),
});

export const equipoTipoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(120, "Máximo 120 caracteres"),
  estado: z.boolean().default(true),
});
