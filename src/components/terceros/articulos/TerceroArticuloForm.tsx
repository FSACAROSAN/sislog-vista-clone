
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useTerceroArticuloForm } from './useTerceroArticuloForm';
import { TerceroArticulo } from '@/types/terceroArticulo';
import TerceroArticuloFormFields from './TerceroArticuloFormFields';
import { Loader2 } from 'lucide-react';

interface TerceroArticuloFormProps {
  initialData: TerceroArticulo | null;
  onSuccess: () => void;
  terceroId: string;
}

const TerceroArticuloForm: React.FC<TerceroArticuloFormProps> = ({ 
  initialData,
  onSuccess,
  terceroId
}) => {
  const { form, isSubmitting, onSubmit } = useTerceroArticuloForm({
    articulo: initialData,
    terceroId,
    onSuccess,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TerceroArticuloFormFields />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => form.reset()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TerceroArticuloForm;
