
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCiudadForm } from './useCiudadForm';
import { Button } from '@/components/ui/button';
import CiudadFormFields from './CiudadFormFields';
import { Ciudad } from '@/types/ciudad';
import { FormProvider } from 'react-hook-form';

interface CiudadFormProps {
  ciudad: Ciudad | null;
  onSuccess: () => void;
}

const CiudadForm: React.FC<CiudadFormProps> = ({ ciudad, onSuccess }) => {
  const { toast } = useToast();
  const isEditing = Boolean(ciudad?.id);
  
  const {
    form,
    isSubmitting,
    onSubmit
  } = useCiudadForm({
    ciudad,
    onSuccess: () => {
      toast({
        title: `Ciudad ${isEditing ? 'actualizada' : 'creada'} con éxito`,
        description: `La ciudad ha sido ${isEditing ? 'actualizada' : 'creada'} correctamente.`,
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
        <CiudadFormFields />
        
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isEditing ? 'Guardar cambios' : 'Crear ciudad'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CiudadForm;
