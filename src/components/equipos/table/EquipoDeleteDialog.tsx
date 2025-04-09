
import React from 'react';
import { Equipo } from '@/types/equipo';
import DeleteDialog from '@/components/common/DeleteDialog';

interface EquipoDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipo: Equipo | null;
  onConfirm: () => void;
}

const EquipoDeleteDialog: React.FC<EquipoDeleteDialogProps> = ({
  open,
  onOpenChange,
  equipo,
  onConfirm
}) => {
  return (
    <DeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      title="¿Está seguro?"
      description={
        <>
          Esta acción no se puede deshacer. Esto eliminará permanentemente el equipo <strong>{equipo?.referencia}</strong>.
        </>
      }
      onConfirm={onConfirm}
    />
  );
};

export default EquipoDeleteDialog;
