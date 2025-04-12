
import React, { memo, useCallback } from 'react';
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

const EmpresaForm: React.FC<EmpresaFormProps> = memo(({ 
  empresa, 
  onSuccess,
  onCancel
}) => {
  const { form, isSubmitting, onSubmit } = useEmpresaForm({ empresa, onSuccess });

  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (onCancel) onCancel();
  }, [onCancel]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmpresaFormFields form={form} />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-8 text-xs"
            >
              Cancelar
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="h-8 text-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
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
});

EmpresaForm.displayName = 'EmpresaForm';
export default EmpresaForm;
