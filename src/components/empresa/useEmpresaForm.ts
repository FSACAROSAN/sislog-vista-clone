
import { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/empresa';
import { useToast } from '@/hooks/use-toast';
import { empresaFormSchema, EmpresaFormValues, defaultValues } from './schema';
import { debounce } from 'lodash';

interface UseEmpresaFormProps {
  empresa?: Empresa | null;
  onSuccess?: () => void;
}

export const useEmpresaForm = ({ empresa, onSuccess }: UseEmpresaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const submittedRef = useRef(false);

  // Initialize form with default values or existing empresa data
  const form = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaFormSchema),
    defaultValues: empresa ? {
      nombre: empresa.nombre || '',
      correo: empresa.correo || '',
      telefono: empresa.telefono || '',
      estado: empresa.estado || 'Activo',
    } : defaultValues,
  });

  const onSubmit = useCallback(async (values: EmpresaFormValues) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    
    try {
      setIsSubmitting(true);

      if (empresa?.id) {
        // Update existing empresa
        const { error } = await supabase
          .from('empresas')
          .update({
            nombre: values.nombre,
            correo: values.correo || null,
            telefono: values.telefono || null,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          })
          .eq('id', empresa.id);

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Empresa actualizada correctamente',
        });
      } else {
        // Create new empresa
        const { error } = await supabase
          .from('empresas')
          .insert({
            nombre: values.nombre,
            correo: values.correo || null,
            telefono: values.telefono || null,
            estado: values.estado,
          });

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Empresa creada correctamente',
        });
      }

      form.reset();
      
      // Use setTimeout to avoid running onSuccess immediately
      // which could cause UI updates during form submission
      setTimeout(() => {
        onSuccess?.();
        submittedRef.current = false;
      }, 100);

    } catch (error: any) {
      console.error('Error saving empresa:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al guardar la empresa',
        variant: 'destructive',
      });
      submittedRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  }, [empresa, form, onSuccess, toast]);

  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
