
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  loading: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, loading }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
      >
        Cancelar
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          'Guardar'
        )}
      </Button>
    </div>
  );
};

export default FormActions;
