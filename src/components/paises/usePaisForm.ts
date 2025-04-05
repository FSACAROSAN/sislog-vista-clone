
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Pais } from '@/types/pais';
import { PaisFormValues } from './schema';

interface UsePaisFormProps {
  pais?: Pais | null;
  form: UseFormReturn<PaisFormValues>;
  onSuccess?: () => void;
}

export const usePaisForm = ({ pais, form, onSuccess }: UsePaisFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (values: PaisFormValues) => {
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

        toast({
          title: 'Éxito',
          description: 'País actualizado correctamente',
        });
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

        toast({
          title: 'Éxito',
          description: 'País creado correctamente',
        });
      }

      form.reset();
      onSuccess?.();

    } catch (error: any) {
      console.error('Error saving país:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al guardar el país',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
