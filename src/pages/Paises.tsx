
import React from 'react';
import { usePaises } from '@/hooks/usePaises';
import PaisesHeader from '@/components/paises/PaisesHeader';
import PaisesSearch from '@/components/paises/PaisesSearch';
import PaisesTable from '@/components/paises/PaisesTable';
import PageHeader from '@/components/PageHeader';
import { Map } from 'lucide-react';

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
        <PaisesHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedPais={selectedPais}
          setSelectedPais={setSelectedPais}
          onSuccess={fetchPaises}
        />

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
