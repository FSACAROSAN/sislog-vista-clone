
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Equipo } from '@/types/equipo';
import TablePagination from '@/components/ui/table-pagination';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [openAlert, setOpenAlert] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-8 w-8 border-4 border-t-blue-500 border-b-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (equipos?.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No se encontraron equipos. Intente con otros términos de búsqueda o cree uno nuevo.
      </div>
    );
  }

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
                          onClick={() => onEdit(equipo)} 
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4 text-gray-500" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setOpenAlert(equipo.id)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <AlertDialog 
                    open={openAlert === equipo.id} 
                    onOpenChange={(open) => {
                      if (!open) setOpenAlert(null);
                    }}
                  >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el equipo <strong>{equipo.referencia}</strong>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => {
                            onDelete(equipo.id);
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
    </div>
  );
};

export default EquiposTable;
