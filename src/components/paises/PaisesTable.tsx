import React, { useState } from 'react';
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
  const [visibleColumns, setVisibleColumns] = useState({
    nombre_es: true,
    nombre_en: true,
    iso2: true,
    iso3: true,
    codigo: true,
    estado: true
  });

  // Ajusta las columnas visibles según el ancho de la pantalla
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) { // Móvil
        setVisibleColumns({
          nombre_es: true,
          nombre_en: false,
          iso2: true,
          iso3: false,
          codigo: false,
          estado: true
        });
      } else if (width < 768) { // Tablet pequeña
        setVisibleColumns({
          nombre_es: true,
          nombre_en: true,
          iso2: true,
          iso3: false,
          codigo: false,
          estado: true
        });
      } else if (width < 1024) { // Tablet grande
        setVisibleColumns({
          nombre_es: true,
          nombre_en: true,
          iso2: true,
          iso3: true,
          codigo: false,
          estado: true
        });
      } else { // Desktop
        setVisibleColumns({
          nombre_es: true,
          nombre_en: true,
          iso2: true,
          iso3: true,
          codigo: true,
          estado: true
        });
      }
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div onClick={(e) => e.stopPropagation()} className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.nombre_es && <TableHead>Nombre (ES)</TableHead>}
              {visibleColumns.nombre_en && <TableHead>Nombre (EN)</TableHead>}
              {visibleColumns.iso2 && <TableHead>ISO2</TableHead>}
              {visibleColumns.iso3 && <TableHead>ISO3</TableHead>}
              {visibleColumns.codigo && <TableHead>Código</TableHead>}
              {visibleColumns.estado && <TableHead>Estado</TableHead>}
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
    </div>
  );
};

export default PaisesTable;
