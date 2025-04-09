
import React from 'react';
import { Equipo } from '@/types/equipo';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';

interface EquipoTableRowProps {
  equipo: Equipo;
  onEdit: (equipo: Equipo) => void;
  onDelete: (equipo: Equipo) => void;
}

const EquipoTableRow: React.FC<EquipoTableRowProps> = ({ equipo, onEdit, onDelete }) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(equipo);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(equipo);
  };

  return (
    <TableRow key={equipo.id}>
      <TableCell className="font-medium">{equipo.codigo}</TableCell>
      <TableCell>{equipo.referencia}</TableCell>
      <TableCell>{equipo.clase?.nombre || '-'}</TableCell>
      <TableCell>{equipo.tipo?.nombre || '-'}</TableCell>
      <TableCell>
        {equipo.estado ? (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
            Activo
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">
            Inactivo
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-36 bg-white shadow-lg z-[999]"
            >
              <DropdownMenuItem 
                onClick={handleEditClick}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-gray-500" />
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDeleteClick}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EquipoTableRow;
