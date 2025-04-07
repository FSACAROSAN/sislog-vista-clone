
import React from 'react';
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
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash, Loader2, Tag } from 'lucide-react';
import TablePagination from '@/components/ui/table-pagination';
import { Badge } from '@/components/ui/badge';
import { Tercero } from '@/types/tercero';

interface TercerosTableProps {
  terceros: Tercero[];
  loading: boolean;
  onEdit: (tercero: Tercero) => void;
  onDelete: (id: string) => void;
  onManageTarifas: (tercero: Tercero) => void;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const TercerosTable: React.FC<TercerosTableProps> = ({
  terceros,
  loading,
  onEdit,
  onDelete,
  onManageTarifas,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Cargando...
                  </div>
                </TableCell>
              </TableRow>
            ) : terceros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No hay terceros para mostrar.
                </TableCell>
              </TableRow>
            ) : (
              terceros.map((tercero) => (
                <TableRow key={tercero.id}>
                  <TableCell className="font-medium">{tercero.nombre}</TableCell>
                  <TableCell>
                    {tercero.documento}
                    {tercero.dv && `-${tercero.dv}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tercero.cliente && <Badge variant="outline">Cliente</Badge>}
                      {tercero.proveedor && <Badge variant="outline">Proveedor</Badge>}
                      {tercero.transporte && <Badge variant="outline">Transporte</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {tercero.telefono_1_tercero && (
                      <div className="text-sm">{tercero.telefono_1_tercero}</div>
                    )}
                    {tercero.email_tercero && (
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {tercero.email_tercero}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tercero.estado ? "default" : "secondary"}>
                      {tercero.estado ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(tercero)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onManageTarifas(tercero)}>
                          <Tag className="h-4 w-4 mr-2" />
                          Tarifas
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            if (window.confirm('¿Está seguro de eliminar este tercero?')) {
                              onDelete(tercero.id);
                            }
                          }}
                          className="text-red-600"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default TercerosTable;
