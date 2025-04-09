
import React from 'react';
import { Empresa } from '@/types/empresa';
import EmpresaForm from '@/components/empresa/EmpresaForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface EmpresaEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empresa: Empresa | null;
  onSuccess: () => void;
}

export const EmpresaEditDialog: React.FC<EmpresaEditDialogProps> = ({
  open,
  onOpenChange,
  empresa,
  onSuccess,
}) => {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
          <DialogDescription>
            Actualice la información de la empresa a continuación.
          </DialogDescription>
        </DialogHeader>
        {empresa && (
          <EmpresaForm 
            empresa={empresa} 
            onSuccess={onSuccess} 
            onCancel={handleCancel}
          />
        )}
        <DialogClose className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default EmpresaEditDialog;
