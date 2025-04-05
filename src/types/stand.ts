
export interface Stand {
  id: string;
  nombre: string;
  bodega_id: string;
  bodega_nombre?: string; // For display purposes
  estado?: string;
  created_at?: string;
  updated_at?: string;
}
