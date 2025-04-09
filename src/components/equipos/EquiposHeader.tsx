
import React from 'react';
import { Wrench } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EquipoForm from './EquipoForm';
import { Equipo } from '@/types/equipo';

interface EquiposHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedEquipo: Equipo | null;
  setSelectedEquipo: (equipo: Equipo | null) => void;
  onSuccess: () => void;
}

const EquiposHeader: React.FC<EquiposHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedEquipo,
  setSelectedEquipo,
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
              {selectedEquipo ? 'Editar Equipo' : 'Agregar Nuevo Equipo'}
            </DialogTitle>
          </DialogHeader>
          <EquipoForm equipo={selectedEquipo} onSuccess={() => {
            setIsDialogOpen(false);
            setSelectedEquipo(null);
            onSuccess();
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EquiposHeader;
