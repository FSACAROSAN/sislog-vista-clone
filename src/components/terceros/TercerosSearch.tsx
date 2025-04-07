
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw, Plus, Loader2 } from 'lucide-react';

interface TercerosSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  onRefresh: () => void;
  openDialog: () => void;
}

const TercerosSearch: React.FC<TercerosSearchProps> = ({
  searchTerm,
  setSearchTerm,
  loading,
  onRefresh,
  openDialog
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre, documento, email o teléfono..."
          className="pl-8 w-full sm:max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2 self-end">
        <Button variant="outline" size="icon" onClick={onRefresh} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
        <Button onClick={openDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Tercero
        </Button>
      </div>
    </div>
  );
};

export default TercerosSearch;
