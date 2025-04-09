
import React from 'react';
import { Search, ArrowUpDown, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EquiposSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  onRefresh: () => void;
  openDialog: () => void;
}

const EquiposSearch: React.FC<EquiposSearchProps> = ({
  searchTerm,
  setSearchTerm,
  loading,
  onRefresh,
  openDialog
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Buscar equipo..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <ArrowUpDown size={16} className="mr-2" />
          Actualizar
        </Button>
        <Button onClick={openDialog} className="gap-2">
          <Plus size={16} />
          Nuevo Equipo
        </Button>
      </div>
    </div>
  );
};

export default EquiposSearch;
