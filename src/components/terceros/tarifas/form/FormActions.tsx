
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  loading: boolean;
  submitText?: string;
  cancelText?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  loading, 
  submitText = 'Guardar',
  cancelText = 'Cancelar'
}) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
      >
        {cancelText}
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          submitText
        )}
      </Button>
    </div>
  );
};

export default FormActions;
