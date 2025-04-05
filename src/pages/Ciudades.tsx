
import React from 'react';
import { useCiudades } from '@/hooks/useCiudades';
import CiudadesHeader from '@/components/ciudades/CiudadesHeader';
import CiudadesSearch from '@/components/ciudades/CiudadesSearch';
import CiudadesTable from '@/components/ciudades/CiudadesTable';
import PageHeader from '@/components/PageHeader';
import { MapPin } from 'lucide-react';

const CiudadesPage: React.FC = () => {
  const {
    ciudades,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCiudad,
    setSelectedCiudad,
    isDialogOpen,
    setIsDialogOpen,
    fetchCiudades,
    handleDelete
  } = useCiudades();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Ciudades" 
        subtitle="Administre las ciudades disponibles"
        icon={<MapPin size={24} />}
      />
      
      <div className="container py-6 flex-1 overflow-auto">
        <CiudadesHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedCiudad={selectedCiudad}
          setSelectedCiudad={setSelectedCiudad}
          onSuccess={fetchCiudades}
        />

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <CiudadesSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            onRefresh={fetchCiudades}
            openDialog={() => setIsDialogOpen(true)}
          />

          <CiudadesTable 
            ciudades={ciudades}
            loading={loading}
            onEdit={(ciudad) => {
              setSelectedCiudad(ciudad);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CiudadesPage;
