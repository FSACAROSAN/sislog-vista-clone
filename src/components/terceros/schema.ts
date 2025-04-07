
import * as z from "zod";

export const terceroFormSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre es requerido" })
    .max(200, { message: "El nombre no puede tener más de 200 caracteres" }),
  documento: z.string()
    .min(1, { message: "El documento es requerido" })
    .max(30, { message: "El documento no puede tener más de 30 caracteres" }),
  dv: z.string().max(1, { message: "El dígito de verificación debe ser un solo carácter" }).optional(),
  direccion: z.string().optional(),
  email_tercero: z.string().email({ message: "Correo electrónico inválido" }).optional().or(z.literal('')),
  telefono_1_tercero: z.string().max(30, { message: "El teléfono no puede tener más de 30 caracteres" }).optional(),
  telefono_2_tercero: z.string().max(30, { message: "El teléfono no puede tener más de 30 caracteres" }).optional(),
  nombre_contacto: z.string().max(200, { message: "El nombre de contacto no puede tener más de 200 caracteres" }).optional(),
  telefono_contacto: z.string().max(30, { message: "El teléfono de contacto no puede tener más de 30 caracteres" }).optional(),
  email_contacto: z.string().email({ message: "Correo electrónico de contacto inválido" }).optional().or(z.literal('')),
  cliente: z.boolean().default(false),
  transporte: z.boolean().default(false),
  proveedor: z.boolean().default(false),
  estado: z.boolean().default(true),
  tipo_documento_id: z.string().uuid({ message: "Tipo de documento inválido" }),
});

export type TerceroFormValues = z.infer<typeof terceroFormSchema>;
