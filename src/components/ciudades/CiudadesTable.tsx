
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
  const [openAlert, setOpenAlert] = useState<string | null>(null);

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
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-4 border-sislog-primary border-t-transparent rounded-full"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : ciudades.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No se encontraron ciudades
              </TableCell>
            </TableRow>
          ) : (
            ciudades.map((ciudad) => (
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
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 focus:ring-0 focus:ring-offset-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 bg-white shadow-md">
                        <DropdownMenuItem 
                          onClick={() => onEdit(ciudad)} 
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4 text-gray-500" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setOpenAlert(ciudad.id)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <AlertDialog 
                    open={openAlert === ciudad.id} 
                    onOpenChange={(open) => {
                      if (!open) setOpenAlert(null);
                    }}
                  >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente la ciudad {ciudad.nombre}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => {
                            onDelete(ciudad.id);
                            setOpenAlert(null);
                          }}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CiudadesTable;
