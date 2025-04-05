
import React from 'react';
import { Edit, Trash2, ArrowUpDown, Plus } from 'lucide-react';
import { Empresa } from '@/types/empresa';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface EmpresaTableProps {
  empresas: Empresa[];
  isLoading: boolean;
  onEdit: (empresa: Empresa) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString?: string) => string;
  onRefresh: () => void;
  openNewDialog: () => void;
}

const EmpresaTable: React.FC<EmpresaTableProps> = ({
  empresas,
  isLoading,
  onEdit,
  onDelete,
  formatDate,
  onRefresh,
  openNewDialog
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Buscar empresa..."
            className="px-4 py-2 border rounded-md w-full pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
            <ArrowUpDown size={16} className="mr-2" />
            Actualizar
          </Button>
          <Button onClick={openNewDialog} className="gap-2">
            <Plus size={16} />
            Nueva Empresa
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : empresas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay empresas registradas. Haga clic en "Nueva Empresa" para agregar una.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Lista de empresas registradas</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empresas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell className="font-medium">{empresa.nombre}</TableCell>
                  <TableCell>{empresa.correo || '-'}</TableCell>
                  <TableCell>{empresa.telefono || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      empresa.estado === 'Activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {empresa.estado || 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(empresa.fecha_creacion)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(empresa)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(empresa.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EmpresaTable;
