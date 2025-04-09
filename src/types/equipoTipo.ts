
import { UUID } from "./common";

export interface EquipoTipo {
  id: UUID;
  nombre: string;
  estado: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EquipoTipoFormValues {
  nombre: string;
  estado: boolean;
}
