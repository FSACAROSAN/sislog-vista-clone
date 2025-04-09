
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { TerceroArticulo } from '@/types/terceroArticulo';
import { TerceroArticuloFormValues, terceroArticuloFormSchema } from './schema';
import { useToast } from '@/hooks/use-toast';

interface UseTerceroArticuloFormProps {
  articulo: TerceroArticulo | null;
  terceroId: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useTerceroArticuloForm = ({ 
  articulo, 
  terceroId, 
  onSuccess, 
  onError 
}: UseTerceroArticuloFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<TerceroArticuloFormValues>({
    resolver: zodResolver(terceroArticuloFormSchema),
    defaultValues: articulo ? {
      nombre: articulo.nombre,
      referencia: articulo.referencia || '',
      unidad_medida_id: articulo.unidad_medida_id || '',
      activo: articulo.activo,
    } : {
      nombre: '',
      referencia: '',
      unidad_medida_id: '',
      activo: true,
    }
  });

  const onSubmit = async (values: TerceroArticuloFormValues) => {
    try {
      setIsSubmitting(true);

      if (articulo?.id) {
        // Update existing articulo - use "as any" to bypass type checking for now
        const { error } = await supabase
          .from('ge_tercero_articulos' as any)
          .update({
            nombre: values.nombre,
            referencia: values.referencia || null,
            unidad_medida_id: values.unidad_medida_id || null,
            activo: values.activo,
            updated_at: new Date().toISOString(),
          })
          .eq('id', articulo.id);

        if (error) throw error;
        
        toast({
          title: 'Éxito',
          description: 'Producto actualizado correctamente',
        });
      } else {
        // Create new articulo - use "as any" to bypass type checking for now
        const { error } = await supabase
          .from('ge_tercero_articulos' as any)
          .insert({
            tercero_id: terceroId,
            nombre: values.nombre,
            referencia: values.referencia || null,
            unidad_medida_id: values.unidad_medida_id || null,
            activo: values.activo,
          });

        if (error) throw error;
        
        toast({
          title: 'Éxito',
          description: 'Producto creado correctamente',
        });
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving tercero articulo:', error);
      
      toast({
        title: 'Error',
        description: error.message || 'Error al guardar el producto',
        variant: 'destructive',
      });
      
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
