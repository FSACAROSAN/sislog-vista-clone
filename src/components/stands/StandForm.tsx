
import React from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Stand } from '@/types/stand';
import { useStandForm } from './useStandForm';
import StandFormFields from './StandFormFields';

interface StandFormProps {
  stand: Stand | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const StandForm: React.FC<StandFormProps> = ({ stand, onSuccess, onCancel }) => {
  const { form, isSubmitting, onSubmit, bodegas } = useStandForm({
    stand,
    onSuccess,
    onError: (error) => {
      console.error('Error en formulario:', error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <StandFormFields bodegas={bodegas} />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : stand ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StandForm;
