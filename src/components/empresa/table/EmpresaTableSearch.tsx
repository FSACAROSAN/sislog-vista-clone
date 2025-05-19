
import React, { memo, ChangeEvent } from 'react';
import { ArrowUpDown, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmpresaTableSearchProps {
  searchTerm: string;
  isLoading: boolean;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  openNewDialog: () => void;
}

const EmpresaTableSearch = memo(({
  searchTerm, 
  isLoading, 
  onSearchChange, 
  onRefresh, 
  openNewDialog
}: EmpresaTableSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Buscar empresa..."
          className="pl-10"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Button variant="outline" onClick={onRefresh} disabled={isLoading} className="h-9 text-xs sm:text-sm">
          <ArrowUpDown size={16} className="mr-1 hidden sm:inline" />
          Actualizar
        </Button>
        <Button onClick={openNewDialog} className="gap-1 h-9 text-xs sm:text-sm flex-grow md:flex-grow-0">
          <Plus size={16} className="mr-1 hidden sm:inline" />
          Nueva Empresa
        </Button>
      </div>
    </div>
  );
});

EmpresaTableSearch.displayName = 'EmpresaTableSearch';

export default EmpresaTableSearch;
