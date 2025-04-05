
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TarifaGeneral } from '@/types/tarifaGeneral';

export const useTarifasGenerales = () => {
  const [tarifas, setTarifas] = useState<TarifaGeneral[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchTarifas();
  }, [searchTerm]);

  const fetchTarifas = async () => {
    try {
      setLoading(true);
      
      // Using any to bypass the TypeScript error since tarifas_generales exists in the database
      // but not in the TypeScript definitions
      const query = supabase
        .from('tarifas_generales' as any)
        .select('*');
      
      if (searchTerm) {
        query.ilike('nombre', `%${searchTerm}%`);
      }
      
      const { data, error } = await query.order('nombre');
      
      if (error) throw error;
      // Cast the result to TarifaGeneral[] since we know the structure
      setTarifas(data as unknown as TarifaGeneral[]);
    } catch (error: any) {
      console.error('Error fetching tarifas:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron cargar las tarifas generales.',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTarifa = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('tarifas_generales' as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Tarifa eliminada',
        description: 'La tarifa ha sido eliminada correctamente.',
      });
      
      fetchTarifas();
    } catch (error: any) {
      console.error('Error deleting tarifa:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar la tarifa.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    tarifas,
    loading,
    searchTerm,
    setSearchTerm,
    refreshTarifas: fetchTarifas,
    deleteTarifa,
  };
};
