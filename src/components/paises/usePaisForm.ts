
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Pais } from '@/types/pais';
import { PaisFormValues, paisFormSchema } from './schema';

interface UsePaisFormProps {
  pais: Pais | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const usePaisForm = ({ pais, onSuccess, onError }: UsePaisFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with default values from the pais object if it exists
  const form = useForm<PaisFormValues>({
    resolver: zodResolver(paisFormSchema),
    defaultValues: pais ? {
      nombre_es: pais.nombre_es,
      nombre_en: pais.nombre_en,
      iso2: pais.iso2,
      iso3: pais.iso3,
      codigo: pais.codigo,
      estado: pais.estado || 'Activo',
    } : {
      nombre_es: '',
      nombre_en: '',
      iso2: '',
      iso3: '',
      codigo: 0,
      estado: 'Activo',
    }
  });

  const onSubmit = async (values: PaisFormValues) => {
    try {
      setIsSubmitting(true);

      if (pais?.id) {
        // Update existing país
        const { error } = await supabase
          .from('paises')
          .update({
            nombre_es: values.nombre_es,
            nombre_en: values.nombre_en,
            iso2: values.iso2.toUpperCase(),
            iso3: values.iso3.toUpperCase(),
            codigo: values.codigo,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('id', pais.id);

        if (error) throw error;
      } else {
        // Create new país
        const { error } = await supabase
          .from('paises')
          .insert({
            nombre_es: values.nombre_es,
            nombre_en: values.nombre_en,
            iso2: values.iso2.toUpperCase(),
            iso3: values.iso3.toUpperCase(),
            codigo: values.codigo,
            estado: values.estado,
          } as any);

        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving país:', error);
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
