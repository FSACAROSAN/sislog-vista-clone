
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tercero } from '@/types/tercero';
import { useTerceroTarifas } from '@/hooks/useTerceroTarifas';
import { useTarifasGenerales } from '@/hooks/useTarifasGenerales';
import TerceroTarifaForm from './TerceroTarifaForm';
import { TarifaFormValues } from './schema';
import { TerceroTarifa } from '@/types/terceroTarifa';
import { TarifasCard, TarifasHeader } from './components';

interface TerceroTarifasDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tercero: Tercero | null;
}

const TerceroTarifasDialog: React.FC<TerceroTarifasDialogProps> = ({
  isOpen,
  onClose,
  tercero,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTarifa, setSelectedTarifa] = useState<TerceroTarifa | null>(null);
  
  const { tarifas, loading, createTarifa, updateTarifa, deleteTarifa } = useTerceroTarifas(
    tercero?.id || null
  );
  
  const { tarifas: tarifasGenerales, loading: loadingTarifasGenerales } = useTarifasGenerales();

  const handleAddNew = () => {
    setSelectedTarifa(null);
    setShowForm(true);
  };

  const handleEdit = (tarifa: TerceroTarifa) => {
    setSelectedTarifa(tarifa);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta tarifa?')) {
      await deleteTarifa(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedTarifa(null);
  };

  const handleSubmit = async (data: TarifaFormValues) => {
    if (selectedTarifa) {
      await updateTarifa(selectedTarifa.id, {
        ...data,
        tarifa_general_id: data.tarifa_general_id === "ninguna" ? null : data.tarifa_general_id
      });
    } else if (tercero) {
      await createTarifa({
        tercero_id: tercero.id,
        nombre: data.nombre,
        valor_tarifa: data.valor_tarifa,
        tarifa_general_id: data.tarifa_general_id === "ninguna" ? null : data.tarifa_general_id,
      });
    }
    setShowForm(false);
    setSelectedTarifa(null);
  };

  const title = selectedTarifa 
    ? "Editar Tarifa" 
    : showForm 
      ? "Agregar Nueva Tarifa" 
      : `Tarifas de ${tercero?.nombre || ''}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {showForm 
              ? "Complete el formulario para agregar o editar una tarifa" 
              : "Administre las tarifas asociadas a este tercero"}
          </DialogDescription>
        </DialogHeader>

        {showForm ? (
          <TerceroTarifaForm
            terceroId={tercero?.id || ''}
            tarifasGenerales={tarifasGenerales}
            onSubmit={handleSubmit}
            initialData={selectedTarifa}
            loading={loading}
            onCancel={handleCancel}
            existingTarifas={tarifas}
          />
        ) : (
          <>
            <TarifasHeader 
              terceroNombre={tercero?.nombre || ''} 
              onAddNew={handleAddNew} 
              loading={loading || loadingTarifasGenerales}
            />
            
            <TarifasCard 
              tarifas={tarifas}
              loading={loading || loadingTarifasGenerales}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TerceroTarifasDialog;
