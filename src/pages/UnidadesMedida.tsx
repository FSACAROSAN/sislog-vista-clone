
import React from 'react';
import { useUnidadesMedida } from '@/hooks/useUnidadesMedida';
import UnidadesMedidaHeader from '@/components/unidades-medida/UnidadesMedidaHeader';
import UnidadesMedidaSearch from '@/components/unidades-medida/UnidadesMedidaSearch';
import UnidadesMedidaTable from '@/components/unidades-medida/UnidadesMedidaTable';
import PageHeader from '@/components/PageHeader';
import { Ruler } from 'lucide-react';

const UnidadesMedidaPage: React.FC = () => {
  const {
    unidadesMedida,
    totalItems,
    loading,
    searchTerm,
    setSearchTerm,
    selectedUnidadMedida,
    setSelectedUnidadMedida,
    isDialogOpen,
    setIsDialogOpen,
    fetchUnidadesMedida,
    handleDelete,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = useUnidadesMedida();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Unidades de Medida" 
        subtitle="Administre las unidades de medida disponibles" 
        icon={<Ruler size={24} />} 
      />
      
      <div className="container flex-1 overflow-auto py-[6px]">
        <UnidadesMedidaHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedUnidadMedida={selectedUnidadMedida}
          setSelectedUnidadMedida={setSelectedUnidadMedida}
          onSuccess={fetchUnidadesMedida}
        />

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <UnidadesMedidaSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onRefresh={fetchUnidadesMedida}
            openDialog={() => setIsDialogOpen(true)}
          />

          <UnidadesMedidaTable 
            unidadesMedida={unidadesMedida}
            loading={loading}
            onEdit={unidadMedida => {
              setSelectedUnidadMedida(unidadMedida);
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

export default UnidadesMedidaPage;
