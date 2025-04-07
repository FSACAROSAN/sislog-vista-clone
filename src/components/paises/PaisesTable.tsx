
import React from 'react';
import { Pais } from '@/types/pais';
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
import TablePagination from '@/components/ui/table-pagination';

interface PaisesTableProps {
  paises: Pais[];
  loading: boolean;
  onEdit: (pais: Pais) => void;
  onDelete: (id: string) => void;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PaisesTable: React.FC<PaisesTableProps> = ({ 
  paises, 
  loading, 
  onEdit, 
  onDelete,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  const [openAlert, setOpenAlert] = React.useState<string | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre (ES)</TableHead>
            <TableHead>Nombre (EN)</TableHead>
            <TableHead>ISO2</TableHead>
            <TableHead>ISO3</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-4 border-sislog-primary border-t-transparent rounded-full"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : paises.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No se encontraron países
              </TableCell>
            </TableRow>
          ) : (
            paises.map((pais) => (
              <TableRow key={pais.id}>
                <TableCell className="font-medium">{pais.nombre_es}</TableCell>
                <TableCell>{pais.nombre_en}</TableCell>
                <TableCell>{pais.iso2}</TableCell>
                <TableCell>{pais.iso3}</TableCell>
                <TableCell>{pais.codigo}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pais.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {pais.estado || 'Activo'}
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
                      <DropdownMenuItem onClick={() => onEdit(pais)} className="cursor-pointer">
                        <Pencil size={16} className="mr-2 text-gray-500" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setOpenAlert(pais.id)} 
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <Trash2 size={16} className="mr-2 text-red-500" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialog open={openAlert === pais.id} onOpenChange={() => setOpenAlert(null)}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el país {pais.nombre_es}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => {
                            onDelete(pais.id);
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
      
      <TablePagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
};

export default PaisesTable;
