
export interface Bodega {
  id: string;
  nombre: string;
  centro_logistico_id: string;
  centro_logistico_nombre?: string; // For display purposes
  estado?: string;
  created_at?: string;
  updated_at?: string;
}
