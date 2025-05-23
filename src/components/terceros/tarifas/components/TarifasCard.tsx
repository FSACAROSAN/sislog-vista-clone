
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  onDelete
}) => {
  return <TarifasList tarifas={tarifas} loading={loading} onEdit={onEdit} onDelete={onDelete} />;
};

export default TarifasCard;
