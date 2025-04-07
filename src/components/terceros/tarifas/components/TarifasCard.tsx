
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TarifasList from './TarifasList';
import { TerceroTarifa } from '@/types/terceroTarifa';

interface TarifasCardProps {
  tarifas: TerceroTarifa[];
  loading: boolean;
  onEdit: (tarifa: TerceroTarifa) => void;
  onDelete: (id: string) => void;
}

const TarifasCard: React.FC<TarifasCardProps> = ({
  tarifas,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarifas</CardTitle>
        <CardDescription>
          Listado de tarifas asignadas a este tercero
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TarifasList 
          tarifas={tarifas} 
          loading={loading} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      </CardContent>
    </Card>
  );
};

export default TarifasCard;
