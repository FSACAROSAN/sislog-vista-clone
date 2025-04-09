
import React from 'react';
import { Warehouse } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CentroLogisticoForm from './CentroLogisticoForm';
import { CentroLogistico } from '@/types/centroLogistico';
import { Button } from '@/components/ui/button';

interface CentroLogisticoHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedCentroLogistico: CentroLogistico | null;
  setSelectedCentroLogistico: (centroLogistico: CentroLogistico | null) => void;
  onSuccess: () => void;
}

const CentroLogisticoHeader: React.FC<CentroLogisticoHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedCentroLogistico,
  setSelectedCentroLogistico,
  onSuccess
}) => {
  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedCentroLogistico(null);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCentroLogistico ? 'Editar Centro Logístico' : 'Agregar Nuevo Centro Logístico'}
            </DialogTitle>
          </DialogHeader>
          <CentroLogisticoForm 
            centroLogistico={selectedCentroLogistico} 
            onSuccess={() => {
              setIsDialogOpen(false);
              setSelectedCentroLogistico(null);
              onSuccess();
            }}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CentroLogisticoHeader;
