
import React from 'react';
import { Ciudad } from '@/types/ciudad';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CiudadTableRowProps {
  ciudad: Ciudad;
  onEdit: (ciudad: Ciudad) => void;
  onDelete: (ciudad: Ciudad) => void;
}

const CiudadTableRow: React.FC<CiudadTableRowProps> = ({ 
  ciudad, 
  onEdit, 
  onDelete 
}) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(ciudad);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(ciudad);
  };

  return (
    <TableRow key={ciudad.id}>
      <TableCell className="font-medium">{ciudad.nombre}</TableCell>
      <TableCell>{ciudad.pais_nombre}</TableCell>
      <TableCell>
        <Badge className={`${
          ciudad.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        } border-0`}>
          {ciudad.estado || 'Activo'}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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

export default CiudadTableRow;
