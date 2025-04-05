
import React from 'react';
import { useCentroLogistico } from '@/hooks/useCentroLogistico';
import CentroLogisticoHeader from '@/components/centro-logistico/CentroLogisticoHeader';
import CentroLogisticoSearch from '@/components/centro-logistico/CentroLogisticoSearch';
import CentroLogisticoTable from '@/components/centro-logistico/CentroLogisticoTable';
import PageHeader from '@/components/PageHeader';
import { Warehouse } from 'lucide-react';

const CentroLogisticoPage: React.FC = () => {
  const {
    centrosLogisticos,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCentroLogistico,
    setSelectedCentroLogistico,
    isDialogOpen,
    setIsDialogOpen,
    fetchCentrosLogisticos,
    handleDelete
  } = useCentroLogistico();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Centros Logísticos" 
        subtitle="Administre los centros logísticos disponibles"
        icon={<Warehouse size={24} />}
      />
      
      <div className="container py-6 flex-1 overflow-auto">
        <CentroLogisticoHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedCentroLogistico={selectedCentroLogistico}
          setSelectedCentroLogistico={setSelectedCentroLogistico}
          onSuccess={fetchCentrosLogisticos}
        />

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <CentroLogisticoSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onRefresh={fetchCentrosLogisticos}
            openDialog={() => setIsDialogOpen(true)}
          />

          <CentroLogisticoTable 
            centrosLogisticos={centrosLogisticos}
            loading={loading}
            onEdit={(centroLogistico) => {
              setSelectedCentroLogistico(centroLogistico);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CentroLogisticoPage;
