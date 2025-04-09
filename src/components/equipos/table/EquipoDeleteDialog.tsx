
import React from 'react';
import { Equipo } from '@/types/equipo';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    <AlertDialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="bg-white z-[9999]">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el equipo <strong>{equipo?.referencia}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EquipoDeleteDialog;
