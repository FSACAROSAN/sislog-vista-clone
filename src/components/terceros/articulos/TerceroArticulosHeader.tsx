
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TerceroArticulo } from '@/types/terceroArticulo';
import TerceroArticuloForm from './TerceroArticuloForm';

interface TerceroArticulosHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedArticulo: TerceroArticulo | null;
  setSelectedArticulo: (articulo: TerceroArticulo | null) => void;
  onSuccess: () => void;
  terceroId: string;
}

const TerceroArticulosHeader: React.FC<TerceroArticulosHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedArticulo,
  setSelectedArticulo,
  onSuccess,
  terceroId
}) => {
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedArticulo(null);
  };

  const handleSuccess = () => {
    handleDialogClose();
    onSuccess();
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <Button 
          onClick={() => setIsDialogOpen(true)} 
          className="bg-sislog-primary hover:bg-sislog-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedArticulo ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
            <DialogDescription>
              {selectedArticulo
                ? 'Actualice los datos del producto.'
                : 'Complete el formulario para crear un nuevo producto.'}
            </DialogDescription>
          </DialogHeader>
          <TerceroArticuloForm
            onSuccess={handleSuccess}
            initialData={selectedArticulo}
            terceroId={terceroId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TerceroArticulosHeader;
