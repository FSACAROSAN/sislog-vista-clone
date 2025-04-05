
import React from 'react';
import { useBodegas } from '@/hooks/useBodegas';
import BodegasHeader from '@/components/bodegas/BodegasHeader';
import BodegasSearch from '@/components/bodegas/BodegasSearch';
import BodegasTable from '@/components/bodegas/BodegasTable';
import PageHeader from '@/components/PageHeader';
import { Warehouse } from 'lucide-react';

const BodegasPage: React.FC = () => {
  const {
    bodegas,
    loading,
    searchTerm,
    setSearchTerm,
    selectedBodega,
    setSelectedBodega,
    isDialogOpen,
    setIsDialogOpen,
    fetchBodegas,
    handleDelete
  } = useBodegas();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Bodegas" 
        subtitle="Administre las bodegas disponibles"
        icon={<Warehouse size={24} />}
      />
      
      <div className="container py-6 flex-1 overflow-auto">
        <BodegasHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedBodega={selectedBodega}
          setSelectedBodega={setSelectedBodega}
          onSuccess={fetchBodegas}
        />

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <BodegasSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onRefresh={fetchBodegas}
            openDialog={() => setIsDialogOpen(true)}
          />

          <BodegasTable 
            bodegas={bodegas}
            loading={loading}
            onEdit={(bodega) => {
              setSelectedBodega(bodega);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default BodegasPage;
