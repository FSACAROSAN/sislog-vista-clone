
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TarifaGeneralForm from './TarifaGeneralForm';
import { TarifaGeneral } from '@/types/tarifaGeneral';

interface TarifasGeneralesHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedTarifaGeneral: TarifaGeneral | null;
  setSelectedTarifaGeneral: (tarifaGeneral: TarifaGeneral | null) => void;
  onSuccess: () => void;
}

const TarifasGeneralesHeader: React.FC<TarifasGeneralesHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedTarifaGeneral,
  setSelectedTarifaGeneral,
  onSuccess
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedTarifaGeneral ? 'Editar Tarifa General' : 'Agregar Nueva Tarifa General'}
            </DialogTitle>
          </DialogHeader>
          <TarifaGeneralForm tarifaGeneral={selectedTarifaGeneral} onSuccess={() => {
            setIsDialogOpen(false);
            setSelectedTarifaGeneral(null);
            onSuccess();
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TarifasGeneralesHeader;
