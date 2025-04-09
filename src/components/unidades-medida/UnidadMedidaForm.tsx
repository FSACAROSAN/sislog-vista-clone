
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUnidadMedidaForm } from './useUnidadMedidaForm';
import { Button } from '@/components/ui/button';
import UnidadMedidaFormFields from './UnidadMedidaFormFields';
import { UnidadMedida } from '@/types/unidadMedida';
import { FormProvider } from 'react-hook-form';

interface UnidadMedidaFormProps {
  unidadMedida: UnidadMedida | null;
  onSuccess: () => void;
}

const UnidadMedidaForm: React.FC<UnidadMedidaFormProps> = ({ unidadMedida, onSuccess }) => {
  const { toast } = useToast();
  const isEditing = Boolean(unidadMedida?.unidad_medida_id);
  
  const {
    form,
    isSubmitting,
    onSubmit
  } = useUnidadMedidaForm({
    unidadMedida,
    onSuccess: () => {
      toast({
        title: `Unidad de medida ${isEditing ? 'actualizada' : 'creada'} con éxito`,
        description: `La unidad de medida ha sido ${isEditing ? 'actualizada' : 'creada'} correctamente.`,
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Ha ocurrido un error. Inténtelo de nuevo.',
      });
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UnidadMedidaFormFields />
        
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isEditing ? 'Guardar cambios' : 'Crear unidad de medida'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UnidadMedidaForm;
