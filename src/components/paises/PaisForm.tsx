
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pais } from '@/types/pais';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { paisFormSchema, PaisFormValues } from './schema';
import { PaisNameFields, PaisCodeFields, PaisStatusField } from './PaisFormFields';
import { usePaisForm } from './usePaisForm';

interface PaisFormProps {
  pais?: Pais | null;
  onSuccess?: () => void;
}

const PaisForm: React.FC<PaisFormProps> = ({ pais, onSuccess }) => {
  const defaultValues: PaisFormValues = {
    nombre_es: pais?.nombre_es || '',
    nombre_en: pais?.nombre_en || '',
    iso2: pais?.iso2 || '',
    iso3: pais?.iso3 || '',
    codigo: pais?.codigo || 0,
    estado: pais?.estado || 'Activo',
  };

  const form = useForm<PaisFormValues>({
    resolver: zodResolver(paisFormSchema),
    defaultValues,
  });

  const { isSubmitting, handleSubmit } = usePaisForm({ 
    pais, 
    form, 
    onSuccess 
  });

  return (
    <FormProvider {...form}>
      <Form>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <PaisNameFields />
          <PaisCodeFields />
          <PaisStatusField />

          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                pais?.id ? 'Actualizar país' : 'Crear país'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default PaisForm;
