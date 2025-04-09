
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCentroLogisticoForm } from './useCentroLogisticoForm';
import { Button } from '@/components/ui/button';
import CentroLogisticoFormFields from './CentroLogisticoFormFields';
import { CentroLogistico } from '@/types/centroLogistico';
import { FormProvider } from 'react-hook-form';

interface CentroLogisticoFormProps {
  centroLogistico: CentroLogistico | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const CentroLogisticoForm: React.FC<CentroLogisticoFormProps> = ({ 
  centroLogistico, 
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  const isEditing = Boolean(centroLogistico?.id);
  
  const {
    form,
    isSubmitting,
    onSubmit,
    paises,
    ciudades
  } = useCentroLogisticoForm({
    centroLogistico,
    onSuccess: () => {
      toast({
        title: `Centro Logístico ${isEditing ? 'actualizado' : 'creado'} con éxito`,
        description: `El centro logístico ha sido ${isEditing ? 'actualizado' : 'creado'} correctamente.`,
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
        <CentroLogisticoFormFields paises={paises} ciudades={ciudades} />
        
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
            {isEditing ? 'Guardar cambios' : 'Crear centro logístico'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CentroLogisticoForm;
