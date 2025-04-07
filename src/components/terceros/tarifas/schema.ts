
import { z } from "zod";

export const tarifaFormSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  valor_tarifa: z.coerce.number().min(0, "El valor debe ser mayor o igual a cero"),
  tarifa_general_id: z.string().optional(),
});

export type TarifaFormValues = z.infer<typeof tarifaFormSchema>;
