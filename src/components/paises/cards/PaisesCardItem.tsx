
import React from 'react';
import { Pais } from '@/types/pais';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
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

interface PaisesCardItemProps {
  pais: Pais;
  onEdit: (pais: Pais) => void;
  onDelete: (id: string) => void;
}

const PaisesCardItem: React.FC<PaisesCardItemProps> = ({ 
  pais, 
  onEdit, 
  onDelete 
}) => {
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  return (
    <Card key={pais.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{pais.nombre_es}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500">Nombre (EN):</div>
          <div>{pais.nombre_en}</div>
          
          <div className="text-gray-500">ISO2:</div>
          <div>{pais.iso2}</div>
          
          <div className="text-gray-500">ISO3:</div>
          <div>{pais.iso3}</div>
          
          <div className="text-gray-500">Código:</div>
          <div>{pais.codigo}</div>
          
          <div className="text-gray-500">Estado:</div>
          <div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              pais.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {pais.estado || 'Activo'}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end space-x-2 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={() => onEdit(pais)}
        >
          <Pencil size={16} className="mr-1" />
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 text-red-600 hover:bg-red-50"
          onClick={() => setOpenAlert(true)}
        >
          <Trash2 size={16} className="mr-1" />
          Eliminar
        </Button>
      </CardFooter>
      
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
    </Card>
  );
};

export default PaisesCardItem;
