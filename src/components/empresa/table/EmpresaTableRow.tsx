
import React, { memo } from 'react';
import { Empresa } from '@/types/empresa';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface EmpresaTableRowProps {
  empresa: Empresa;
  formatDate: (dateString?: string) => string;
  onEdit: (empresa: Empresa) => void;
  openAlert: string | null;
  setOpenAlert: (id: string | null) => void;
}

const EmpresaTableRow = memo(({
  empresa,
  formatDate,
  onEdit,
  openAlert,
  setOpenAlert
}: EmpresaTableRowProps) => {
  return (
    <TableRow key={empresa.id}>
      <TableCell className="font-medium">{empresa.nombre}</TableCell>
      <TableCell>{empresa.correo || '-'}</TableCell>
      <TableCell>{empresa.telefono || '-'}</TableCell>
      <TableCell>
        <div className={`inline-block px-2 py-1 rounded-full text-xs ${
          empresa.estado === 'Activo' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {empresa.estado || 'Inactivo'}
        </div>
      </TableCell>
      <TableCell>{formatDate(empresa.fecha_creacion)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(empresa)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => setOpenAlert(empresa.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

EmpresaTableRow.displayName = 'EmpresaTableRow';

export default EmpresaTableRow;
