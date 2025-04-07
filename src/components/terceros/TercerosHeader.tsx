
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TerceroForm from './TerceroForm';
import { Tercero } from '@/types/tercero';

interface TercerosHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedTercero: Tercero | null;
  setSelectedTercero: (tercero: Tercero | null) => void;
  onSuccess: () => void;
}

const TercerosHeader: React.FC<TercerosHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedTercero,
  setSelectedTercero,
  onSuccess
}) => {
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedTercero(null);
  };

  const handleSuccess = () => {
    handleDialogClose();
    onSuccess();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedTercero ? 'Editar Tercero' : 'Nuevo Tercero'}
          </DialogTitle>
          <DialogDescription>
            {selectedTercero
              ? 'Actualice los datos del tercero.'
              : 'Complete el formulario para crear un nuevo tercero.'}
          </DialogDescription>
        </DialogHeader>
        <TerceroForm
          onSuccess={handleSuccess}
          initialData={selectedTercero}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TercerosHeader;
