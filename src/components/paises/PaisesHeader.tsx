
import React from 'react';
import { Map, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PaisForm from './PaisForm';
import { Pais } from '@/types/pais';

interface PaisesHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedPais: Pais | null;
  setSelectedPais: (pais: Pais | null) => void;
  onSuccess: () => void;
}

const PaisesHeader: React.FC<PaisesHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedPais,
  setSelectedPais,
  onSuccess
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Map className="h-6 w-6" />
          Gestión de Países
        </h1>
        <p className="text-gray-500">Administra la información de países</p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus size={16} />
            Nuevo País
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPais ? 'Editar País' : 'Agregar Nuevo País'}
            </DialogTitle>
          </DialogHeader>
          <PaisForm 
            pais={selectedPais} 
            onSuccess={() => {
              setIsDialogOpen(false);
              setSelectedPais(null);
              onSuccess();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaisesHeader;
