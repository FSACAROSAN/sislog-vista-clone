
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TerceroTarifa } from '@/types/terceroTarifa';
import { UUID } from '@/types/common';

export const useTerceroTarifas = (terceroId: UUID | null) => {
  const [tarifas, setTarifas] = useState<TerceroTarifa[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTarifas = async () => {
    if (!terceroId) {
      setTarifas([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ge_tercero_tarifas' as any)
        .select(`
          *,
          tarifa_general:tarifas_generales(*)
        `)
        .eq('tercero_id', terceroId) as any;

      if (error) throw error;
      
      setTarifas(data as TerceroTarifa[]);
    } catch (error: any) {
      console.error('Error fetching tercero tarifas:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar las tarifas del tercero',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createTarifa = async (tarifa: Omit<TerceroTarifa, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ge_tercero_tarifas' as any)
        .insert({
          tercero_id: tarifa.tercero_id,
          tarifa_general_id: tarifa.tarifa_general_id || null,
          nombre: tarifa.nombre,
          valor_tarifa: tarifa.valor_tarifa,
        })
        .select() as any;

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Tarifa creada correctamente',
      });
      
      await fetchTarifas();
      return data[0];
    } catch (error: any) {
      console.error('Error creating tarifa:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al crear la tarifa',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTarifa = async (id: UUID, tarifa: Partial<TerceroTarifa>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('ge_tercero_tarifas' as any)
        .update({
          tarifa_general_id: tarifa.tarifa_general_id,
          nombre: tarifa.nombre,
          valor_tarifa: tarifa.valor_tarifa,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id) as any;

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Tarifa actualizada correctamente',
      });
      
      await fetchTarifas();
    } catch (error: any) {
      console.error('Error updating tarifa:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al actualizar la tarifa',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTarifa = async (id: UUID) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('ge_tercero_tarifas' as any)
        .delete()
        .eq('id', id) as any;

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Tarifa eliminada correctamente',
      });
      
      await fetchTarifas();
    } catch (error: any) {
      console.error('Error deleting tarifa:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar la tarifa',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarifas();
  }, [terceroId]);

  return {
    tarifas,
    loading,
    fetchTarifas,
    createTarifa,
    updateTarifa,
    deleteTarifa
  };
};
