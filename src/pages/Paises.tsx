
import React from 'react';
import { usePaises } from '@/hooks/usePaises';
import PaisesHeader from '@/components/paises/PaisesHeader';
import PaisesSearch from '@/components/paises/PaisesSearch';
import PaisesTable from '@/components/paises/PaisesTable';

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
    <div className="container py-6">
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
  );
};

export default PaisesPage;
