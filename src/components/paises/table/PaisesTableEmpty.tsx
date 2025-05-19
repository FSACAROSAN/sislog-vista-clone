
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

interface PaisesTableEmptyProps {
  colSpan: number;
}

const PaisesTableEmpty: React.FC<PaisesTableEmptyProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-4">
        No se encontraron países
      </TableCell>
    </TableRow>
  );
};

export default PaisesTableEmpty;
