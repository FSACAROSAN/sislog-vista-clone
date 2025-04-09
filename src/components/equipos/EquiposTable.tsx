
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Equipo } from '@/types/equipo';
import TablePagination from '@/components/ui/table-pagination';
import EquiposTableLoading from './table/EquiposTableLoading';
import EquiposTableEmpty from './table/EquiposTableEmpty';
import EquipoTableRow from './table/EquipoTableRow';
import EquipoDeleteDialog from './table/EquipoDeleteDialog';

interface EquiposTableProps {
  equipos: Equipo[];
  loading: boolean;
  onEdit: (equipo: Equipo) => void;
  onDelete: (id: string) => void;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const EquiposTable: React.FC<EquiposTableProps> = ({
  equipos,
  loading,
  onEdit,
  onDelete,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [equipoToDelete, setEquipoToDelete] = useState<Equipo | null>(null);

  if (loading) {
    return <EquiposTableLoading />;
  }

  if (equipos?.length === 0) {
    return <EquiposTableEmpty />;
  }

  const handleDeleteClick = (equipo: Equipo) => {
    setEquipoToDelete(equipo);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (equipoToDelete) {
      onDelete(equipoToDelete.id);
    }
    setDeleteDialogOpen(false);
    setEquipoToDelete(null);
  };

  return (
    <div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Referencia</TableHead>
              <TableHead>Clase</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[100px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipos?.map((equipo) => (
              <EquipoTableRow 
                key={equipo.id}
                equipo={equipo} 
                onEdit={onEdit} 
                onDelete={handleDeleteClick} 
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <TablePagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>

      <EquipoDeleteDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        equipo={equipoToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EquiposTable;
