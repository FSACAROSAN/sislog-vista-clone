
import React, { useState } from 'react';
import { Ciudad } from '@/types/ciudad';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CiudadesTableLoading from './table/CiudadesTableLoading';
import CiudadesTableEmpty from './table/CiudadesTableEmpty';
import CiudadTableRow from './table/CiudadTableRow';
import CiudadDeleteDialog from './table/CiudadDeleteDialog';

interface CiudadesTableProps {
  ciudades: Ciudad[];
  loading: boolean;
  onEdit: (ciudad: Ciudad) => void;
  onDelete: (id: string) => void;
}

const CiudadesTable: React.FC<CiudadesTableProps> = ({ 
  ciudades, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ciudadToDelete, setCiudadToDelete] = useState<Ciudad | null>(null);

  if (loading) {
    return <CiudadesTableLoading />;
  } 

  if (ciudades.length === 0) {
    return <CiudadesTableEmpty />;
  }

  const handleDeleteClick = (ciudad: Ciudad) => {
    setCiudadToDelete(ciudad);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (ciudadToDelete) {
      onDelete(ciudadToDelete.id);
    }
    setDeleteDialogOpen(false);
    setCiudadToDelete(null);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>País</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ciudades.map((ciudad) => (
            <CiudadTableRow 
              key={ciudad.id}
              ciudad={ciudad} 
              onEdit={onEdit} 
              onDelete={handleDeleteClick} 
            />
          ))}
        </TableBody>
      </Table>

      <CiudadDeleteDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        ciudad={ciudadToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CiudadesTable;
