
import React from 'react';
import { Ciudad } from '@/types/ciudad';
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
    <AlertDialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="bg-white z-[9999]">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente la ciudad <strong>{ciudad?.nombre}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={(e) => {
              e.preventDefault();
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

export default CiudadDeleteDialog;
