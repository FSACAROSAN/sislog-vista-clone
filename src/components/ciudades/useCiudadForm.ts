
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Ciudad } from '@/types/ciudad';
import { CiudadFormValues, ciudadFormSchema } from './schema';

interface UseCiudadFormProps {
  ciudad: Ciudad | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCiudadForm = ({ ciudad, onSuccess, onError }: UseCiudadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CiudadFormValues>({
    resolver: zodResolver(ciudadFormSchema),
    defaultValues: ciudad ? {
      nombre: ciudad.nombre,
      pais_id: ciudad.pais_id,
      estado: ciudad.estado || 'Activo',
    } : {
      nombre: '',
      pais_id: '',
      estado: 'Activo',
    }
  });

  const onSubmit = async (values: CiudadFormValues) => {
    try {
      setIsSubmitting(true);

      if (ciudad?.id) {
        // Update existing ciudad
        const { error } = await supabase
          .from('ciudades')
          .update({
            nombre: values.nombre,
            pais_id: values.pais_id,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('id', ciudad.id);

        if (error) throw error;
      } else {
        // Create new ciudad
        const { error } = await supabase
          .from('ciudades')
          .insert({
            nombre: values.nombre,
            pais_id: values.pais_id,
            estado: values.estado,
          } as any);

        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving ciudad:', error);
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
