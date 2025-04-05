
import React from 'react';
import EmpresaForm from '@/components/empresa/EmpresaForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface EmpresaNewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const EmpresaNewDialog: React.FC<EmpresaNewDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Empresa</DialogTitle>
          <DialogDescription>
            Ingrese la información de la nueva empresa a continuación.
          </DialogDescription>
        </DialogHeader>
        <EmpresaForm onSuccess={onSuccess} />
        <DialogClose className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default EmpresaNewDialog;
