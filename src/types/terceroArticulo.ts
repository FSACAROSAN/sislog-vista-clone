
import { UUID } from './common';
import { Tercero } from './tercero';
import { UnidadMedida } from './unidadMedida';

export interface TerceroArticulo {
  id: UUID;
  tercero_id: UUID;
  nombre: string;
  referencia?: string;
  activo: boolean;
  unidad_medida_id?: UUID;
  unidad_medida?: UnidadMedida;
  created_at?: string;
  updated_at?: string;
}
