
import React from 'react';
import { Ruler } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UnidadMedidaForm from './UnidadMedidaForm';
import { UnidadMedida } from '@/types/unidadMedida';

interface UnidadesMedidaHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedUnidadMedida: UnidadMedida | null;
  setSelectedUnidadMedida: (unidadMedida: UnidadMedida | null) => void;
  onSuccess: () => void;
}

const UnidadesMedidaHeader: React.FC<UnidadesMedidaHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedUnidadMedida,
  setSelectedUnidadMedida,
  onSuccess
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedUnidadMedida ? 'Editar Unidad de Medida' : 'Agregar Nueva Unidad de Medida'}
            </DialogTitle>
          </DialogHeader>
          <UnidadMedidaForm unidadMedida={selectedUnidadMedida} onSuccess={() => {
            setIsDialogOpen(false);
            setSelectedUnidadMedida(null);
            onSuccess();
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnidadesMedidaHeader;
