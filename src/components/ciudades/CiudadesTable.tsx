
import React, { useState } from 'react';
import { Ciudad } from '@/types/ciudad';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

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
    return (
      <div className="rounded-md border">
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
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-4 border-t-blue-500 border-b-blue-500 rounded-full"></div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  } 

  if (ciudades.length === 0) {
    return (
      <div className="rounded-md border">
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
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No se encontraron ciudades
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  const handleDeleteClick = (e: React.MouseEvent, ciudad: Ciudad) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleEditClick = (e: React.MouseEvent, ciudad: Ciudad) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(ciudad);
  };

  return (
    <div className="rounded-md border">
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
                        onClick={(e) => handleEditClick(e, ciudad)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => handleDeleteClick(e, ciudad)}
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
          ))}
        </TableBody>
      </Table>

      <AlertDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-white z-[9999]">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la ciudad {ciudadToDelete?.nombre}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleConfirmDelete();
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CiudadesTable;
