
import React from 'react';
import { useTerceros } from '@/hooks/useTerceros';
import TercerosHeader from '@/components/terceros/TercerosHeader';
import TercerosSearch from '@/components/terceros/TercerosSearch';
import TercerosTable from '@/components/terceros/TercerosTable';
import PageHeader from '@/components/PageHeader';
import { UserCircle } from 'lucide-react';

const TercerosPage: React.FC = () => {
  const {
    terceros,
    totalItems,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTercero,
    setSelectedTercero,
    isDialogOpen,
    setIsDialogOpen,
    fetchTerceros,
    handleDelete,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = useTerceros();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Terceros" 
        subtitle="Administre los terceros del sistema"
        icon={<UserCircle size={24} />}
      />
      
      <div className="container py-6 flex-1 overflow-auto">
        <TercerosHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedTercero={selectedTercero}
          setSelectedTercero={setSelectedTercero}
          onSuccess={fetchTerceros}
        />

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <TercerosSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onRefresh={fetchTerceros}
            openDialog={() => setIsDialogOpen(true)}
          />

          <TercerosTable 
            terceros={terceros}
            loading={loading}
            onEdit={(tercero) => {
              setSelectedTercero(tercero);
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

export default TercerosPage;
