
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tercero } from '@/types/tercero';
import { useTerceroTarifas } from '@/hooks/useTerceroTarifas';
import { useTarifasGenerales } from '@/hooks/useTarifasGenerales';
import TerceroTarifaForm from './TerceroTarifaForm';
import { TarifaFormValues } from './schema';
import { TerceroTarifa } from '@/types/terceroTarifa';
import { Badge } from '@/components/ui/badge';

interface TerceroTarifasDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tercero: Tercero | null;
}

const TerceroTarifasDialog: React.FC<TerceroTarifasDialogProps> = ({
  isOpen,
  onClose,
  tercero,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTarifa, setSelectedTarifa] = useState<TerceroTarifa | null>(null);
  
  const { tarifas, loading, createTarifa, updateTarifa, deleteTarifa } = useTerceroTarifas(
    tercero?.id || null
  );
  
  const { tarifas: tarifasGenerales, loading: loadingTarifasGenerales } = useTarifasGenerales();

  const handleAddNew = () => {
    setSelectedTarifa(null);
    setShowForm(true);
  };

  const handleEdit = (tarifa: TerceroTarifa) => {
    setSelectedTarifa(tarifa);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta tarifa?')) {
      await deleteTarifa(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedTarifa(null);
  };

  const handleSubmit = async (data: TarifaFormValues) => {
    if (selectedTarifa) {
      await updateTarifa(selectedTarifa.id, data);
    } else if (tercero) {
      await createTarifa({
        tercero_id: tercero.id,
        ...data,
      });
    }
    setShowForm(false);
    setSelectedTarifa(null);
  };

  const title = selectedTarifa 
    ? "Editar Tarifa" 
    : showForm 
      ? "Agregar Nueva Tarifa" 
      : `Tarifas de ${tercero?.nombre || ''}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {showForm 
              ? "Complete el formulario para agregar o editar una tarifa" 
              : "Administre las tarifas asociadas a este tercero"}
          </DialogDescription>
        </DialogHeader>

        {showForm ? (
          <TerceroTarifaForm
            terceroId={tercero?.id || ''}
            tarifasGenerales={tarifasGenerales}
            onSubmit={handleSubmit}
            initialData={selectedTarifa}
            loading={loading}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{tercero?.nombre}</h3>
              <Button onClick={handleAddNew} disabled={loading}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Tarifa
              </Button>
            </div>
            
            <Separator className="my-4" />

            <Card>
              <CardHeader>
                <CardTitle>Tarifas</CardTitle>
                <CardDescription>
                  Listado de tarifas asignadas a este tercero
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading || loadingTarifasGenerales ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Cargando tarifas...</span>
                  </div>
                ) : tarifas.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay tarifas asignadas a este tercero.
                  </div>
                ) : (
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
                                  onClick={() => handleEdit(tarifa)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Editar</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(tarifa.id)}
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
                )}
              </CardContent>
            </Card>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TerceroTarifasDialog;
