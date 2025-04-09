
import { UUID } from "./common";

export interface EquipoClase {
  id: UUID;
  nombre: string;
  estado: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EquipoClaseFormValues {
  nombre: string;
  estado: boolean;
}
