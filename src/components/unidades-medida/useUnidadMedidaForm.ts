
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { UnidadMedida } from '@/types/unidadMedida';
import { UnidadMedidaFormValues, unidadMedidaFormSchema } from './schema';

interface UseUnidadMedidaFormProps {
  unidadMedida: UnidadMedida | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useUnidadMedidaForm = ({ unidadMedida, onSuccess, onError }: UseUnidadMedidaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<UnidadMedidaFormValues>({
    resolver: zodResolver(unidadMedidaFormSchema),
    defaultValues: unidadMedida ? {
      nombre: unidadMedida.nombre,
      estado: unidadMedida.estado,
    } : {
      nombre: '',
      estado: true,
    }
  });

  const onSubmit = async (values: UnidadMedidaFormValues) => {
    try {
      setIsSubmitting(true);

      if (unidadMedida?.unidad_medida_id) {
        // Update existing unidad de medida
        const { error } = await supabase
          .from('inv_unidades_medida')
          .update({
            nombre: values.nombre,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          })
          .eq('unidad_medida_id', unidadMedida.unidad_medida_id);

        if (error) throw error;
      } else {
        // Create new unidad de medida
        const { error } = await supabase
          .from('inv_unidades_medida')
          .insert({
            nombre: values.nombre,
            estado: values.estado,
          });

        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving unidad de medida:', error);
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit
  };
};
