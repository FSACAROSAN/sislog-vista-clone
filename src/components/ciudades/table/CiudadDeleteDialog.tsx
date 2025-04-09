
import React from 'react';
import { Ciudad } from '@/types/ciudad';
import DeleteDialog from '@/components/common/DeleteDialog';

interface CiudadDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ciudad: Ciudad | null;
  onConfirm: () => void;
}

const CiudadDeleteDialog: React.FC<CiudadDeleteDialogProps> = ({
  open,
  onOpenChange,
  ciudad,
  onConfirm
}) => {
  return (
    <DeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Está seguro?"
      description={
        <>
          Esta acción no se puede deshacer. Esto eliminará permanentemente la ciudad <strong>{ciudad?.nombre}</strong>.
        </>
      }
      onConfirm={onConfirm}
    />
  );
};

export default CiudadDeleteDialog;
