
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { LayoutDashboard } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Dashboard principal" 
        subtitle="Resumen general del sistema"
        icon={<LayoutDashboard size={24} />}
      />
      
      <div className="container py-6">
        {/* Contenido del Dashboard */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Dashboard Principal</h2>
          {/* Contenido específico del dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Index;
