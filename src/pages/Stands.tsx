
import React from 'react';
import { useStands } from '@/hooks/useStands';
import StandsHeader from '@/components/stands/StandsHeader';
import StandsSearch from '@/components/stands/StandsSearch';
import StandsTable from '@/components/stands/StandsTable';
import PageHeader from '@/components/PageHeader';
import { PackageOpen } from 'lucide-react';

const StandsPage: React.FC = () => {
  const {
    stands,
    loading,
    searchTerm,
    setSearchTerm,
    selectedStand,
    setSelectedStand,
    isDialogOpen,
    setIsDialogOpen,
    fetchStands,
    handleDelete
  } = useStands();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Stands" 
        subtitle="Administre los stands disponibles"
        icon={<PackageOpen size={24} />}
      />
      
      <div className="container py-6 flex-1 overflow-auto">
        <StandsHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedStand={selectedStand}
          setSelectedStand={setSelectedStand}
          onSuccess={fetchStands}
        />

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <StandsSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onRefresh={fetchStands}
            openDialog={() => setIsDialogOpen(true)}
          />

          <StandsTable 
            stands={stands}
            loading={loading}
            onEdit={(stand) => {
              setSelectedStand(stand);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default StandsPage;
