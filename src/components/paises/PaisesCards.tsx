
import React from 'react';
import { Pais } from '@/types/pais';
import PaisesCardItem from './cards/PaisesCardItem';
import PaisesCardsLoading from './cards/PaisesCardsLoading';
import PaisesCardsEmpty from './cards/PaisesCardsEmpty';

interface PaisesCardsProps {
  paises: Pais[];
  loading: boolean;
  onEdit: (pais: Pais) => void;
  onDelete: (id: string) => void;
}

const PaisesCards: React.FC<PaisesCardsProps> = ({ 
  paises, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  if (loading) {
    return <PaisesCardsLoading />;
  }

  if (paises.length === 0) {
    return <PaisesCardsEmpty />;
  }

  return (
    <div className="space-y-4 py-2">
      {paises.map((pais) => (
        <PaisesCardItem
          key={pais.id}
          pais={pais}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PaisesCards;
