
import React, { useState } from 'react';
import { CentroLogistico } from '@/types/centroLogistico';
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

interface CentroLogisticoTableProps {
  centrosLogisticos: CentroLogistico[];
  loading: boolean;
  onEdit: (centroLogistico: CentroLogistico) => void;
  onDelete: (id: string) => void;
}

const CentroLogisticoTable: React.FC<CentroLogisticoTableProps> = ({ 
  centrosLogisticos, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  const [openAlert, setOpenAlert] = useState<string | null>(null);

  const handleEditClick = (centro: CentroLogistico) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(centro);
  };

  const handleDeleteClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenAlert(id);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>País</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-4 border-sislog-primary border-t-transparent rounded-full"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : centrosLogisticos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No se encontraron centros logísticos
              </TableCell>
            </TableRow>
          ) : (
            centrosLogisticos.map((centro) => (
              <TableRow key={centro.id}>
                <TableCell className="font-medium">{centro.nombre}</TableCell>
                <TableCell>{centro.pais_nombre}</TableCell>
                <TableCell>{centro.ciudad_nombre}</TableCell>
                <TableCell>
                  <Badge className={`${
                    centro.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  } border-0`}>
                    {centro.estado || 'Activo'}
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
                      <DropdownMenuContent align="end" className="w-36 bg-white shadow-lg z-50">
                        <DropdownMenuItem 
                          onClick={handleEditClick(centro)} 
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4 text-gray-500" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={handleDeleteClick(centro.id)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <AlertDialog 
                    open={openAlert === centro.id} 
                    onOpenChange={(open) => {
                      if (!open) setOpenAlert(null);
                    }}
                  >
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el centro logístico {centro.nombre}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(centro.id);
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

export default CentroLogisticoTable;
