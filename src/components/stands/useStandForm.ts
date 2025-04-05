
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Stand } from '@/types/stand';
import { StandFormValues, standFormSchema } from './schema';

interface UseStandFormProps {
  stand: Stand | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useStandForm = ({ stand, onSuccess, onError }: UseStandFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bodegas, setBodegas] = useState<{ id: string; nombre: string }[]>([]);
  
  const form = useForm<StandFormValues>({
    resolver: zodResolver(standFormSchema),
    defaultValues: stand ? {
      nombre: stand.nombre,
      bodega_id: stand.bodega_id,
      estado: stand.estado || 'Activo',
    } : {
      nombre: '',
      bodega_id: '',
      estado: 'Activo',
    }
  });

  // Load bodegas data
  useEffect(() => {
    const fetchBodegas = async () => {
      try {
        const { data, error } = await supabase
          .from('bodegas')
          .select('id, nombre')
          .order('nombre', { ascending: true });

        if (error) throw error;
        setBodegas(data);
      } catch (error) {
        console.error('Error fetching bodegas:', error);
      }
    };

    fetchBodegas();
  }, []);

  const onSubmit = async (values: StandFormValues) => {
    try {
      setIsSubmitting(true);

      if (stand?.id) {
        // Update existing stand using raw SQL query
        const { error } = await supabase.rpc('update_stand', {
          p_id: stand.id,
          p_nombre: values.nombre,
          p_bodega_id: values.bodega_id,
          p_estado: values.estado
        });

        if (error) {
          // Fallback to direct SQL query if RPC fails
          const { error: fallbackError } = await supabase.query(`
            UPDATE stands 
            SET nombre = $1, bodega_id = $2, estado = $3, updated_at = now() 
            WHERE id = $4
          `, [values.nombre, values.bodega_id, values.estado, stand.id]);

          if (fallbackError) throw fallbackError;
        }
      } else {
        // Create new stand using raw SQL query
        const { error } = await supabase.rpc('insert_stand', {
          p_nombre: values.nombre,
          p_bodega_id: values.bodega_id,
          p_estado: values.estado
        });

        if (error) {
          // Fallback to direct SQL query if RPC fails
          const { error: fallbackError } = await supabase.query(`
            INSERT INTO stands (nombre, bodega_id, estado) 
            VALUES ($1, $2, $3)
          `, [values.nombre, values.bodega_id, values.estado]);

          if (fallbackError) throw fallbackError;
        }
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving stand:', error);
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
    bodegas
  };
};
