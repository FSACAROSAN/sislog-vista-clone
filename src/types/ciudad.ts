
export interface Ciudad {
  id: string;
  nombre: string;
  pais_id: string;
  pais_nombre?: string; // For display purposes
  estado?: string;
  created_at?: string;
  updated_at?: string;
}
