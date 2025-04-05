
import React from 'react';
import { Search, FileDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PaisesSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  onRefresh: () => void;
}

const PaisesSearch: React.FC<PaisesSearchProps> = ({
  searchTerm,
  setSearchTerm,
  loading,
  onRefresh
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
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
      <div>
        <Button variant="outline" onClick={onRefresh} disabled={loading} className="gap-2">
          <FileDown size={16} />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default PaisesSearch;
