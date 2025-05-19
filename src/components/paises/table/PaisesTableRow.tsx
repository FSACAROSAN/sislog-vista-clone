
import React from 'react';
import { Pais } from '@/types/pais';
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
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

interface PaisesTableRowProps {
  pais: Pais;
  onEdit: (pais: Pais) => void;
  onDelete: (id: string) => void;
  visibleColumns: {
    nombre_es: boolean;
    nombre_en: boolean;
    iso2: boolean;
    iso3: boolean;
    codigo: boolean;
    estado: boolean;
  };
}

const PaisesTableRow: React.FC<PaisesTableRowProps> = ({ 
  pais, 
  onEdit, 
  onDelete,
  visibleColumns 
}) => {
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  return (
    <TableRow key={pais.id}>
      {visibleColumns.nombre_es && <TableCell className="font-medium">{pais.nombre_es}</TableCell>}
      {visibleColumns.nombre_en && <TableCell>{pais.nombre_en}</TableCell>}
      {visibleColumns.iso2 && <TableCell>{pais.iso2}</TableCell>}
      {visibleColumns.iso3 && <TableCell>{pais.iso3}</TableCell>}
      {visibleColumns.codigo && <TableCell>{pais.codigo}</TableCell>}
      {visibleColumns.estado && (
        <TableCell>
          <span className={`px-2 py-1 rounded-full text-xs ${
            pais.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {pais.estado || 'Activo'}
          </span>
        </TableCell>
      )}
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
              onClick={() => setOpenAlert(true)} 
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 size={16} className="mr-2 text-red-500" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
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
                  setOpenAlert(false);
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default PaisesTableRow;
