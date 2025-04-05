
import React from 'react';
import { usePaises } from '@/hooks/usePaises';
import PaisesHeader from '@/components/paises/PaisesHeader';
import PaisesSearch from '@/components/paises/PaisesSearch';
import PaisesTable from '@/components/paises/PaisesTable';
import PageHeader from '@/components/PageHeader';
import { Map, Export } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaisesPage: React.FC = () => {
  const {
    paises,
    loading,
    searchTerm,
    setSearchTerm,
    selectedPais,
    setSelectedPais,
    isDialogOpen,
    setIsDialogOpen,
    fetchPaises,
    handleDelete
  } = usePaises();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Países" 
        subtitle="Administre los países disponibles"
        icon={<Map size={24} />}
      />
      
      <div className="container py-6 flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <PaisesHeader 
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            selectedPais={selectedPais}
            setSelectedPais={setSelectedPais}
            onSuccess={fetchPaises}
          />
          <Button variant="outline">
            <Export size={16} className="mr-2" />
            Exportar
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <PaisesSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onRefresh={fetchPaises}
          />

          <PaisesTable 
            paises={paises}
            loading={loading}
            onEdit={(pais) => {
              setSelectedPais(pais);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default PaisesPage;
