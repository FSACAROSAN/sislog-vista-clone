
import React, { memo, useCallback, useMemo } from 'react';
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
    e.stopPropagation();
    if (onCancel) onCancel();
  }, [onCancel]);

  const buttonText = useMemo(() => 
    empresa?.id ? 'Actualizar empresa' : 'Crear empresa', 
  [empresa?.id]);

  const submitButtonContent = useMemo(() => {
    if (isSubmitting) {
      return (
        <>
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          Guardando...
        </>
      );
    }
    return buttonText;
  }, [isSubmitting, buttonText]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <EmpresaFormFields form={form} />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-7 text-xs"
            >
              Cancelar
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="h-7 text-xs"
          >
            {submitButtonContent}
          </Button>
        </div>
      </form>
    </Form>
  );
});

EmpresaForm.displayName = 'EmpresaForm';
export default EmpresaForm;
