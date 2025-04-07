
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TipoDocumento } from '@/types/tercero';

export const useTiposDocumento = () => {
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTiposDocumento = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ge_tercero_tipo_documento')
        .select('*')
        .order('orden', { ascending: true }) as any;

      if (error) throw error;
      
      setTiposDocumento(data as TipoDocumento[]);
    } catch (error: any) {
      console.error('Error fetching tipos de documento:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar los tipos de documento',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposDocumento();
  }, []);

  return {
    tiposDocumento,
    loading,
    fetchTiposDocumento
  };
};
