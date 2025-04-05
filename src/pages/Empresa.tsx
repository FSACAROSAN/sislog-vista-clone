import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Building2 } from 'lucide-react';

const Empresa = () => {
  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Empresa" 
        subtitle="Gestión de información de la empresa"
        icon={<Building2 size={24} />}
      />
      
      <div className="container py-6">
        {/* Contenido de la página Empresa */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Información de la Empresa</h2>
          {/* Contenido específico de la página de Empresa */}
        </div>
      </div>
    </div>
  );
};

export default Empresa;
