
import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ActivityChart from '../components/ActivityChart';
import GeographicDistribution from '../components/GeographicDistribution';
import SecurityStatus from '../components/SecurityStatus';
import { Package2, FileBarChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 h-screen overflow-auto">
      <Header 
        title="Dashboard principal" 
        subtitle="Vista general del sistema" 
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatCard 
            icon={<Package2 size={24} className="text-sislog-primary" />}
            title="Contenedores"
            value="32"
            subtitle="Contenedores activos en el sistema"
            color="text-sislog-primary"
          />
          
          <StatCard 
            icon={<FileBarChart size={24} className="text-red-500" />}
            title="Reportes"
            value="15"
            subtitle="Reportes generados este mes"
            color="text-red-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          <div>
            <SecurityStatus />
          </div>
        </div>
        
        <div className="mt-6">
          <GeographicDistribution />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
