
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PaisesCardsLoadingProps {
  count?: number;
}

const PaisesCardsLoading: React.FC<PaisesCardsLoadingProps> = ({ count = 3 }) => {
  return (
    <div className="py-4 space-y-4">
      {[...Array(count)].map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaisesCardsLoading;
