
import React, { memo, useCallback } from 'react';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Empresa } from '@/types/empresa';
import { TableRow, TableCell } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface EmpresaRowProps { 
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
  setOpenAlert 
}: EmpresaRowProps) => {
  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(empresa);
  }, [empresa, onEdit]);

  const handleOpenAlert = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenAlert(empresa.id);
  }, [empresa.id, setOpenAlert]);

  return (
    <TableRow key={empresa.id}>
      <TableCell className="font-medium">{empresa.nombre}</TableCell>
      <TableCell>{empresa.correo || '-'}</TableCell>
      <TableCell>{empresa.telefono || '-'}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs ${
          empresa.estado === 'Activo' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {empresa.estado || 'Inactivo'}
        </span>
      </TableCell>
      <TableCell>{formatDate(empresa.fecha_creacion)}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white z-[999]">
            <DropdownMenuItem 
              onClick={handleEdit} 
              className="cursor-pointer"
            >
              <Edit size={16} className="mr-2 text-gray-500" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleOpenAlert} 
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 size={16} className="mr-2 text-red-500" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

EmpresaTableRow.displayName = 'EmpresaTableRow';

export default EmpresaTableRow;
