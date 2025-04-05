
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TarifasGeneralesSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddNew: () => void;
}

const TarifasGeneralesSearch: React.FC<TarifasGeneralesSearchProps> = ({
  searchTerm,
  setSearchTerm,
  onAddNew
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Buscar tarifas generales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button onClick={onAddNew}>
        Nueva Tarifa General
      </Button>
    </div>
  );
};

export default TarifasGeneralesSearch;
