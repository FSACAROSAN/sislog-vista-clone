
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { TarifaGeneral } from '@/types/tarifaGeneral';
import { TarifaGeneralFormValues, tarifaGeneralFormSchema } from './schema';

interface UseTarifaGeneralFormProps {
  tarifaGeneral: TarifaGeneral | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useTarifaGeneralForm = ({ 
  tarifaGeneral, 
  onSuccess, 
  onError 
}: UseTarifaGeneralFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with default values from the tarifaGeneral object if it exists
  const form = useForm<TarifaGeneralFormValues>({
    resolver: zodResolver(tarifaGeneralFormSchema),
    defaultValues: tarifaGeneral ? {
      nombre: tarifaGeneral.nombre,
      precio: tarifaGeneral.precio,
      estado: tarifaGeneral.estado || 'Activo',
    } : {
      nombre: '',
      precio: 0,
      estado: 'Activo',
    }
  });

  const onSubmit = async (values: TarifaGeneralFormValues) => {
    try {
      setIsSubmitting(true);

      if (tarifaGeneral?.id) {
        // Update existing tarifa
        const { error } = await supabase
          .from('tarifas_generales')
          .update({
            nombre: values.nombre,
            precio: values.precio,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          })
          .eq('id', tarifaGeneral.id);

        if (error) throw error;
      } else {
        // Create new tarifa
        const { error } = await supabase
          .from('tarifas_generales')
          .insert({
            nombre: values.nombre,
            precio: values.precio,
            estado: values.estado,
          });

        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving tarifa general:', error);
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
