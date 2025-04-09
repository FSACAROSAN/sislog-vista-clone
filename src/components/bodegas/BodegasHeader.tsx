
import React from 'react';
import { Warehouse } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BodegaForm from './BodegaForm';
import { Bodega } from '@/types/bodega';

interface BodegasHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedBodega: Bodega | null;
  setSelectedBodega: (bodega: Bodega | null) => void;
  onSuccess: () => void;
}

const BodegasHeader: React.FC<BodegasHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedBodega,
  setSelectedBodega,
  onSuccess
}) => {
  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedBodega(null);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedBodega ? 'Editar Bodega' : 'Agregar Nueva Bodega'}
            </DialogTitle>
          </DialogHeader>
          <BodegaForm 
            bodega={selectedBodega} 
            onSuccess={() => {
              setIsDialogOpen(false);
              setSelectedBodega(null);
              onSuccess();
            }} 
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BodegasHeader;
