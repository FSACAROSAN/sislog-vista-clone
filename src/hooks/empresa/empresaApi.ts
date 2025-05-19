
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/empresa';

// Fetch empresas from the database
export const fetchEmpresasFromDb = async (): Promise<Empresa[]> => {
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw error;
  
  return data || [];
};

// Delete empresa by id
export const deleteEmpresaFromDb = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('empresas')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
