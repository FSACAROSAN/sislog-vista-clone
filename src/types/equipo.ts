
import { UUID } from "./common";
import { EquipoClase } from "./equipoClase";
import { EquipoTipo } from "./equipoTipo";

export interface Equipo {
  id: UUID;
  codigo: string;
  referencia: string;
  estado: boolean;
  clase_id?: UUID | null;
  tipo_id?: UUID | null;
  created_at?: string;
  updated_at?: string;
  clase?: EquipoClase;
  tipo?: EquipoTipo;
}

export interface EquipoFormValues {
  codigo: string;
  referencia: string;
  estado: boolean;
  clase_id?: UUID | null;
  tipo_id?: UUID | null;
}
