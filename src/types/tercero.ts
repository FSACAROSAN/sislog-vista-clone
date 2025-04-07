
import { UUID } from './common';

export interface TipoDocumento {
  tipo_documento_id: UUID;
  codigo: string;
  nombre: string;
  sigla: string;
  orden?: number;
  documento_local?: number;
  estado?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Tercero {
  id: UUID;
  nombre: string;
  documento: string;
  dv?: string;
  direccion?: string;
  email_tercero?: string;
  telefono_1_tercero?: string;
  telefono_2_tercero?: string;
  nombre_contacto?: string;
  telefono_contacto?: string;
  email_contacto?: string;
  cliente?: boolean;
  transporte?: boolean;
  proveedor?: boolean;
  estado?: boolean;
  tipo_documento_id?: UUID;
  tipo_documento?: TipoDocumento;
  created_at?: string;
  updated_at?: string;
}
