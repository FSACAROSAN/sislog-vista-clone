
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UnidadMedida } from '@/types/unidadMedida';
import { useToast } from '@/hooks/use-toast';

export const useUnidadesMedida = () => {
  const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUnidadesMedida = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inv_unidades_medida')
        .select('*')
        .eq('estado', true)
        .order('nombre', { ascending: true });

      if (error) throw error;
      setUnidadesMedida(data as UnidadMedida[]);
    } catch (error: any) {
      console.error('Error fetching unidades de medida:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar las unidades de medida',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    unidadesMedida,
    loading,
    fetchUnidadesMedida
  };
};
