
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus } from 'lucide-react';

interface StandsSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  loading: boolean;
  onRefresh: () => void;
  openDialog: () => void;
}

const StandsSearch: React.FC<StandsSearchProps> = ({
  searchTerm,
  setSearchTerm,
  loading,
  onRefresh,
  openDialog
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Buscar por nombre o bodega..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onRefresh}
          disabled={loading}
          className="w-full md:w-auto"
        >
          <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
        <Button
          onClick={openDialog}
          className="w-full md:w-auto"
        >
          <Plus size={16} className="mr-2" />
          Nuevo Stand
        </Button>
      </div>
    </div>
  );
};

export default StandsSearch;
