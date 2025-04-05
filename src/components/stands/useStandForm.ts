
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
        // Update existing stand
        const { error } = await supabase
          .from('stands')
          .update({
            nombre: values.nombre,
            bodega_id: values.bodega_id,
            estado: values.estado,
            updated_at: new Date().toISOString()
          })
          .eq('id', stand.id);

        if (error) throw error;
      } else {
        // Create new stand
        const { error } = await supabase
          .from('stands')
          .insert({
            nombre: values.nombre,
            bodega_id: values.bodega_id,
            estado: values.estado
          });

        if (error) throw error;
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
