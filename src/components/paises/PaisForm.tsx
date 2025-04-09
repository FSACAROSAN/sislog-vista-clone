
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePaisForm } from './usePaisForm';
import { Button } from '@/components/ui/button';
import PaisFormFields from './PaisFormFields';
import { Pais } from '@/types/pais';
import { FormProvider } from 'react-hook-form';

interface PaisFormProps {
  pais: Pais | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const PaisForm: React.FC<PaisFormProps> = ({ pais, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const isEditing = Boolean(pais?.id);
  
  const {
    form,
    isSubmitting,
    onSubmit
  } = usePaisForm({
    pais,
    onSuccess: () => {
      toast({
        title: `País ${isEditing ? 'actualizado' : 'creado'} con éxito`,
        description: `El país ha sido ${isEditing ? 'actualizado' : 'creado'} correctamente.`,
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
        <PaisFormFields />
        
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
            {isEditing ? 'Guardar cambios' : 'Crear país'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PaisForm;
