
import React from 'react';
import { CentroLogistico } from '@/types/centroLogistico';
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react';
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
  const [openAlert, setOpenAlert] = React.useState<string | null>(null);

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
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    centro.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {centro.estado || 'Activo'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => onEdit(centro)} className="cursor-pointer">
                        <Pencil size={16} className="mr-2 text-gray-500" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setOpenAlert(centro.id)} 
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <Trash2 size={16} className="mr-2 text-red-500" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialog open={openAlert === centro.id} onOpenChange={() => setOpenAlert(null)}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el centro logístico {centro.nombre}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => {
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
