
import { z } from "zod";
import { TerceroTarifa } from "@/types/terceroTarifa";

/**
 * Zod schema for tarifa form validation
 * - nombre: Required, string with minimum length of 1
 * - valor_tarifa: Required, positive number (coerced to handle form input)
 * - tarifa_general_id: Optional string (UUID)
 */
export const tarifaFormSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  valor_tarifa: z.coerce.number().min(0, "El valor debe ser mayor o igual a cero"),
  tarifa_general_id: z.string().optional(),
});

/**
 * Type representing the form values for a tarifa
 */
export type TarifaFormValues = z.infer<typeof tarifaFormSchema>;

/**
 * Creates a refined schema with duplicate tarifa validation
 * @param existingTarifas - Array of existing tarifas for the tercero
 * @param initialTarifaId - ID of the tarifa being edited (if any)
 * @returns A Zod schema with additional validation for duplicate tarifas
 */
export const createTarifaFormSchemaWithValidation = (
  existingTarifas: TerceroTarifa[],
  initialTarifaId?: string
) => {
  return tarifaFormSchema.refine(
    (data) => {
      // Skip validation if no tarifa_general_id or if it's "ninguna"
      if (!data.tarifa_general_id || data.tarifa_general_id === "ninguna") {
        return true;
      }

      // Check if this tarifa_general_id already exists for another tarifa
      return !existingTarifas.some(
        (tarifa) =>
          tarifa.tarifa_general_id === data.tarifa_general_id &&
          (!initialTarifaId || tarifa.id !== initialTarifaId)
      );
    },
    {
      message: "Este tercero ya tiene asignada esta tarifa general.",
      path: ["tarifa_general_id"],
    }
  );
};
