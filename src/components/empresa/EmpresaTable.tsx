
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
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
}

const EmpresaTable: React.FC<EmpresaTableProps> = ({
  empresas,
  isLoading,
  onEdit,
  onDelete,
  formatDate,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (empresas.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay empresas registradas. Haga clic en "Nueva Empresa" para agregar una.
      </div>
    );
  }

  return (
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
  );
};

export default EmpresaTable;
