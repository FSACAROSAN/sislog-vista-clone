
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const EquiposTableLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin h-8 w-8 border-4 border-t-blue-500 border-b-blue-500 rounded-full"></div>
    </div>
  );
};

export default EquiposTableLoading;
