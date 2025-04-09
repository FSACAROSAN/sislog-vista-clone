
import React from 'react';
import { Empresa } from '@/types/empresa';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useEmpresaForm } from './useEmpresaForm';
import EmpresaFormFields from './EmpresaFormFields';

interface EmpresaFormProps {
  empresa?: Empresa | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({ 
  empresa, 
  onSuccess,
  onCancel
}) => {
  const { form, isSubmitting, onSubmit } = useEmpresaForm({ empresa, onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmpresaFormFields form={form} />

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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              empresa?.id ? 'Actualizar empresa' : 'Crear empresa'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmpresaForm;
