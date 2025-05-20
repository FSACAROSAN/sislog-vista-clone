
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PaisesCardsEmpty: React.FC = () => {
  return (
    <Card className="text-center py-8">
      <CardContent>
        <p className="text-gray-500">No se encontraron países</p>
      </CardContent>
    </Card>
  );
};

export default PaisesCardsEmpty;
