
import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Tag } from 'lucide-react';
import { useTarifasGenerales } from '@/hooks/useTarifasGenerales';
import TarifasGeneralesSearch from '@/components/tarifas-generales/TarifasGeneralesSearch';
import TarifasGeneralesTable from '@/components/tarifas-generales/TarifasGeneralesTable';
import TarifasGeneralesHeader from '@/components/tarifas-generales/TarifasGeneralesHeader';
import { TarifaGeneral } from '@/types/tarifaGeneral';

const TarifasGenerales: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTarifaGeneral, setSelectedTarifaGeneral] = useState<TarifaGeneral | null>(null);
  
  const {
    tarifas,
    loading,
    searchTerm,
    setSearchTerm,
    refreshTarifas,
    deleteTarifa
  } = useTarifasGenerales();

  const handleAddNew = () => {
    setSelectedTarifaGeneral(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (tarifa: TarifaGeneral) => {
    setSelectedTarifaGeneral(tarifa);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Tarifas Generales" 
        subtitle="Gestión de tarifas generales del sistema"
        icon={<Tag size={24} />}
      />
      
      <div className="container py-6">
        <TarifasGeneralesHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedTarifaGeneral={selectedTarifaGeneral}
          setSelectedTarifaGeneral={setSelectedTarifaGeneral}
          onSuccess={refreshTarifas}
        />
        
        <TarifasGeneralesSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddNew={handleAddNew}
        />
        
        <TarifasGeneralesTable 
          tarifas={tarifas}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteTarifa}
        />
      </div>
    </div>
  );
};

export default TarifasGenerales;
