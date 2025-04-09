
import React, { useState, useEffect } from 'react';
import { useEquipos } from '@/hooks/useEquipos';
import PageHeader from '@/components/PageHeader';
import { Wrench } from 'lucide-react';
import EquiposHeader from '@/components/equipos/EquiposHeader';
import EquiposSearch from '@/components/equipos/EquiposSearch';
import EquiposTable from '@/components/equipos/EquiposTable';
import { Equipo } from '@/types/equipo';
import { useEquiposClase } from '@/hooks/useEquiposClase';
import { useEquiposTipo } from '@/hooks/useEquiposTipo';

const EquiposPage: React.FC = () => {
  const { equipos, isLoading, error, deleteEquipo } = useEquipos();
  const { equiposClase } = useEquiposClase();
  const { equiposTipo } = useEquiposTipo();
  const [selectedEquipo, setSelectedEquipo] = useState<Equipo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEquipos, setFilteredEquipos] = useState<Equipo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (equipos) {
      const filtered = equipos.filter(
        (equipo) =>
          equipo.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          equipo.referencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
          equipo.clase?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          equipo.tipo?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEquipos(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, equipos]);

  const paginatedEquipos = filteredEquipos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRefresh = () => {
    // The useQuery hook will handle refetching data
    // This is just to have a button for UX purposes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEquipo.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting equipo:", error);
    }
  };

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Equipos" 
        subtitle="Administra los equipos logísticos" 
        icon={<Wrench size={24} />} 
      />

      <div className="container flex-1 overflow-auto py-[6px]">
        <EquiposHeader 
          isDialogOpen={isDialogOpen} 
          setIsDialogOpen={setIsDialogOpen} 
          selectedEquipo={selectedEquipo} 
          setSelectedEquipo={setSelectedEquipo} 
          onSuccess={() => {}} 
        />

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <EquiposSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            loading={isLoading} 
            onRefresh={handleRefresh} 
            openDialog={() => {
              setSelectedEquipo(null);
              setIsDialogOpen(true);
            }} 
          />

          <EquiposTable 
            equipos={paginatedEquipos} 
            loading={isLoading} 
            onEdit={(equipo) => {
              setSelectedEquipo(equipo);
              setIsDialogOpen(true);
            }} 
            onDelete={handleDelete} 
            totalItems={filteredEquipos.length} 
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

export default EquiposPage;
