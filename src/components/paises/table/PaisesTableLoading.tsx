
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

interface PaisesTableLoadingProps {
  colSpan: number;
}

const PaisesTableLoading: React.FC<PaisesTableLoadingProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-4">
        <div className="flex justify-center">
          <div className="animate-spin h-6 w-6 border-4 border-sislog-primary border-t-transparent rounded-full"></div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PaisesTableLoading;
