
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
    totalItems,
    loading,
    searchTerm,
    setSearchTerm,
    selectedPais,
    setSelectedPais,
    isDialogOpen,
    setIsDialogOpen,
    fetchPaises,
    handleDelete,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = usePaises();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Países" 
        subtitle="Administre los países disponibles" 
        icon={<Map size={24} />} 
      />
      
      <div className="container flex-1 overflow-auto py-[6px] px-2 md:px-4">
        <PaisesHeader 
          isDialogOpen={isDialogOpen} 
          setIsDialogOpen={setIsDialogOpen} 
          selectedPais={selectedPais} 
          setSelectedPais={setSelectedPais} 
          onSuccess={fetchPaises} 
        />

        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow mb-4 md:mb-6">
          <PaisesSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            loading={loading} 
            onRefresh={fetchPaises} 
            openDialog={() => setIsDialogOpen(true)} 
          />

          <PaisesTable 
            paises={paises} 
            loading={loading} 
            onEdit={pais => {
              setSelectedPais(pais);
              setIsDialogOpen(true);
            }} 
            onDelete={handleDelete} 
            totalItems={totalItems} 
            currentPage={currentPage} 
            pageSize={pageSize} 
            onPageChange={handlePageChange} 
            onPageSizeChange={handlePageSizeChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default PaisesPage;
