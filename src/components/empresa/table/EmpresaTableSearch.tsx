
import React, { memo, ChangeEvent } from 'react';
import { ArrowUpDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <input
          type="text"
          placeholder="Buscar empresa..."
          className="px-4 py-2 h-8 border rounded-md w-full pl-10"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Button variant="outline" onClick={onRefresh} disabled={isLoading} className="h-8 text-xs">
          <ArrowUpDown size={14} className="mr-1" />
          Actualizar
        </Button>
        <Button onClick={openNewDialog} className="gap-1 h-8 text-xs">
          <Plus size={14} />
          Nueva Empresa
        </Button>
      </div>
    </div>
  );
});

EmpresaTableSearch.displayName = 'EmpresaTableSearch';

export default EmpresaTableSearch;
