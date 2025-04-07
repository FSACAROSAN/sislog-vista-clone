
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

/**
 * Props for the TerceroTarifasDialog component
 */
interface TerceroTarifasDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tercero: Tercero | null;
}

/**
 * Dialog component for managing tercero tarifas
 * Displays a list of tarifas and allows adding/editing/deleting
 */
const TerceroTarifasDialog: React.FC<TerceroTarifasDialogProps> = ({
  isOpen,
  onClose,
  tercero,
}) => {
  // State for controlling the form visibility and selected tarifa
  const [showForm, setShowForm] = useState(false);
  const [selectedTarifa, setSelectedTarifa] = useState<TerceroTarifa | null>(null);
  
  // Fetch tarifas for the selected tercero
  const { tarifas, loading, createTarifa, updateTarifa, deleteTarifa } = useTerceroTarifas(
    tercero?.id || null
  );
  
  // Fetch available tarifa generales
  const { tarifas: tarifasGenerales, loading: loadingTarifasGenerales } = useTarifasGenerales();

  // Handle showing the form for a new tarifa
  const handleAddNew = () => {
    setSelectedTarifa(null);
    setShowForm(true);
  };

  // Handle showing the form for editing an existing tarifa
  const handleEdit = (tarifa: TerceroTarifa) => {
    setSelectedTarifa(tarifa);
    setShowForm(true);
  };

  // Handle deleting a tarifa
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta tarifa?')) {
      await deleteTarifa(id);
    }
  };

  // Handle canceling the form
  const handleCancel = () => {
    setShowForm(false);
    setSelectedTarifa(null);
  };

  // Handle form submission
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

  // Determine the dialog title based on the current state
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
