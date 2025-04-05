
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Bodega } from '@/types/bodega';
import { BodegaFormValues, bodegaFormSchema } from './schema';

interface UseBodegaFormProps {
  bodega: Bodega | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useBodegaForm = ({ bodega, onSuccess, onError }: UseBodegaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [centrosLogisticos, setCentrosLogisticos] = useState<{ id: string; nombre: string }[]>([]);
  
  const form = useForm<BodegaFormValues>({
    resolver: zodResolver(bodegaFormSchema),
    defaultValues: bodega ? {
      nombre: bodega.nombre,
      centro_logistico_id: bodega.centro_logistico_id,
      estado: bodega.estado || 'Activo',
    } : {
      nombre: '',
      centro_logistico_id: '',
      estado: 'Activo',
    }
  });

  // Load centros logísticos data
  useEffect(() => {
    const fetchCentrosLogisticos = async () => {
      try {
        const { data, error } = await supabase
          .from('centro_logistico')
          .select('id, nombre')
          .order('nombre', { ascending: true });

        if (error) throw error;
        setCentrosLogisticos(data);
      } catch (error) {
        console.error('Error fetching centros logísticos:', error);
      }
    };

    fetchCentrosLogisticos();
  }, []);

  const onSubmit = async (values: BodegaFormValues) => {
    try {
      setIsSubmitting(true);

      if (bodega?.id) {
        // Update existing bodega
        const { error } = await supabase
          .from('bodegas')
          .update({
            nombre: values.nombre,
            centro_logistico_id: values.centro_logistico_id,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          })
          .eq('id', bodega.id);

        if (error) throw error;
      } else {
        // Create new bodega
        const { error } = await supabase
          .from('bodegas')
          .insert({
            nombre: values.nombre,
            centro_logistico_id: values.centro_logistico_id,
            estado: values.estado,
          });

        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving bodega:', error);
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
    centrosLogisticos
  };
};
