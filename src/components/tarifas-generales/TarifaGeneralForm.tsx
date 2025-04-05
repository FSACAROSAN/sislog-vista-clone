
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTarifaGeneralForm } from './useTarifaGeneralForm';
import { Button } from '@/components/ui/button';
import TarifaGeneralFormFields from './TarifaGeneralFormFields';
import { TarifaGeneral } from '@/types/tarifaGeneral';
import { FormProvider } from 'react-hook-form';

interface TarifaGeneralFormProps {
  tarifaGeneral: TarifaGeneral | null;
  onSuccess: () => void;
}

const TarifaGeneralForm: React.FC<TarifaGeneralFormProps> = ({ tarifaGeneral, onSuccess }) => {
  const { toast } = useToast();
  const isEditing = Boolean(tarifaGeneral?.id);
  
  const {
    form,
    isSubmitting,
    onSubmit
  } = useTarifaGeneralForm({
    tarifaGeneral,
    onSuccess: () => {
      toast({
        title: `Tarifa general ${isEditing ? 'actualizada' : 'creada'} con éxito`,
        description: `La tarifa ha sido ${isEditing ? 'actualizada' : 'creada'} correctamente.`,
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
        <TarifaGeneralFormFields />
        
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isEditing ? 'Guardar cambios' : 'Crear tarifa'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TarifaGeneralForm;
