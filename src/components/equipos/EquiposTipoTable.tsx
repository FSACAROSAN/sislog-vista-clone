
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
import { Edit, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EquipoTipo } from '@/types/equipoTipo';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EquipoTipoForm from './EquipoTipoForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useEquiposTipo } from '@/hooks/useEquiposTipo';

const EquiposTipoTable: React.FC = () => {
  const { equiposTipo, isLoading, createEquipoTipo, updateEquipoTipo, deleteEquipoTipo } = useEquiposTipo();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState<EquipoTipo | null>(null);

  const handleAdd = () => {
    setSelectedEquipo(null);
    setOpenDialog(true);
  };

  const handleEdit = (equipo: EquipoTipo) => {
    setSelectedEquipo(equipo);
    setOpenDialog(true);
  };

  const handleDelete = (equipo: EquipoTipo) => {
    setSelectedEquipo(equipo);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedEquipo) {
      deleteEquipoTipo.mutate(selectedEquipo.id);
      setOpenDeleteDialog(false);
    }
  };

  const handleSubmit = (values: any) => {
    if (selectedEquipo) {
      updateEquipoTipo.mutate({ ...selectedEquipo, ...values });
    } else {
      createEquipoTipo.mutate(values);
    }
    setOpenDialog(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tipos de Equipos</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Tipo
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : equiposTipo && equiposTipo.length > 0 ? (
              equiposTipo.map((equipo) => (
                <TableRow key={equipo.id}>
                  <TableCell>{equipo.nombre}</TableCell>
                  <TableCell>
                    <Badge variant={equipo.estado ? "default" : "secondary"}>
                      {equipo.estado ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(equipo)}
                      className="mx-1"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(equipo)}
                      className="mx-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No hay tipos de equipos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEquipo ? "Editar Tipo de Equipo" : "Nuevo Tipo de Equipo"}
            </DialogTitle>
          </DialogHeader>
          <EquipoTipoForm
            defaultValues={selectedEquipo || undefined}
            onSubmit={handleSubmit}
            isSubmitting={createEquipoTipo.isPending || updateEquipoTipo.isPending}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el tipo de equipo
              {selectedEquipo ? ` "${selectedEquipo.nombre}"` : ""}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EquiposTipoTable;
