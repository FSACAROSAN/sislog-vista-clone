
import React from 'react';
import { Search, ArrowUpDown, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PaisesSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  onRefresh: () => void;
  openDialog: () => void;
}

const PaisesSearch: React.FC<PaisesSearchProps> = ({
  searchTerm,
  setSearchTerm,
  loading,
  onRefresh,
  openDialog
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Buscar país..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Button variant="outline" onClick={onRefresh} disabled={loading} className="h-9 text-xs sm:text-sm">
          <ArrowUpDown size={16} className="mr-1 hidden sm:inline" />
          Actualizar
        </Button>
        <Button onClick={openDialog} className="gap-1 h-9 text-xs sm:text-sm flex-grow md:flex-grow-0">
          <Plus size={16} className="mr-1 hidden sm:inline" />
          Nuevo País
        </Button>
      </div>
    </div>
  );
};

export default PaisesSearch;
