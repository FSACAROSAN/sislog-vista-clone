
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useBodegaForm } from './useBodegaForm';
import { Button } from '@/components/ui/button';
import BodegaFormFields from './BodegaFormFields';
import { Bodega } from '@/types/bodega';
import { FormProvider } from 'react-hook-form';

interface BodegaFormProps {
  bodega: Bodega | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const BodegaForm: React.FC<BodegaFormProps> = ({ bodega, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const isEditing = Boolean(bodega?.id);
  
  const {
    form,
    isSubmitting,
    onSubmit,
    centrosLogisticos
  } = useBodegaForm({
    bodega,
    onSuccess: () => {
      toast({
        title: `Bodega ${isEditing ? 'actualizada' : 'creada'} con éxito`,
        description: `La bodega ha sido ${isEditing ? 'actualizada' : 'creada'} correctamente.`,
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
        <BodegaFormFields centrosLogisticos={centrosLogisticos} />
        
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isEditing ? 'Guardar cambios' : 'Crear bodega'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BodegaForm;
