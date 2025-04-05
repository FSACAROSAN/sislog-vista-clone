
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
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Warehouse className="mr-2 h-5 w-5 text-gray-500" />
        <h2 className="text-xl font-semibold">Gestión de Centros Logísticos</h2>
      </div>
      <Button onClick={() => setIsDialogOpen(true)}>
        Agregar Centro Logístico
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCentroLogistico ? 'Editar Centro Logístico' : 'Agregar Nuevo Centro Logístico'}
            </DialogTitle>
          </DialogHeader>
          <CentroLogisticoForm centroLogistico={selectedCentroLogistico} onSuccess={() => {
            setIsDialogOpen(false);
            setSelectedCentroLogistico(null);
            onSuccess();
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CentroLogisticoHeader;
