
import React from 'react';
import { Loader2, Edit, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TerceroTarifa } from '@/types/terceroTarifa';

interface TarifasListProps {
  tarifas: TerceroTarifa[];
  loading: boolean;
  onEdit: (tarifa: TerceroTarifa) => void;
  onDelete: (id: string) => void;
}

const TarifasList: React.FC<TarifasListProps> = ({
  tarifas,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando tarifas...</span>
      </div>
    );
  }

  if (tarifas.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay tarifas asignadas a este tercero.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tarifas.map((tarifa) => (
            <TableRow key={tarifa.id}>
              <TableCell className="font-medium">{tarifa.nombre}</TableCell>
              <TableCell>
                {tarifa.tarifa_general ? (
                  <Badge variant="outline">
                    {tarifa.tarifa_general.nombre}
                  </Badge>
                ) : (
                  <Badge variant="secondary">Personalizada</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                ${Number(tarifa.valor_tarifa).toFixed(2)}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(tarifa)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(tarifa.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
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

export default TarifasList;
