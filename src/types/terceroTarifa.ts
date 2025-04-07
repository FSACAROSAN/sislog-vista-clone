
import { UUID } from './common';
import { Tercero } from './tercero';
import { TarifaGeneral } from './tarifaGeneral';

export interface TerceroTarifa {
  id: UUID;
  tercero_id: UUID;
  tarifa_general_id?: UUID;
  nombre: string;
  valor_tarifa: number;
  created_at?: string;
  updated_at?: string;
  tercero?: Tercero;
  tarifa_general?: TarifaGeneral;
}
