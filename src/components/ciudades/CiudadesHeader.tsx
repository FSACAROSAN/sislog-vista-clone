
import React from 'react';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CiudadForm from './CiudadForm';
import { Ciudad } from '@/types/ciudad';
import { Button } from '@/components/ui/button';

interface CiudadesHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedCiudad: Ciudad | null;
  setSelectedCiudad: (ciudad: Ciudad | null) => void;
  onSuccess: () => void;
}

const CiudadesHeader: React.FC<CiudadesHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedCiudad,
  setSelectedCiudad,
  onSuccess
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <MapPin className="mr-2 h-5 w-5 text-gray-500" />
        <h2 className="text-xl font-semibold">Gestión de Ciudades</h2>
      </div>
      <Button onClick={() => setIsDialogOpen(true)}>
        Agregar Ciudad
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCiudad ? 'Editar Ciudad' : 'Agregar Nueva Ciudad'}
            </DialogTitle>
          </DialogHeader>
          <CiudadForm ciudad={selectedCiudad} onSuccess={() => {
            setIsDialogOpen(false);
            setSelectedCiudad(null);
            onSuccess();
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CiudadesHeader;
