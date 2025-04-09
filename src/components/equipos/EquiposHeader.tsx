
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/contexts/LanguageContext';

interface EquiposHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EquiposHeader: React.FC<EquiposHeaderProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader 
        title="Configuración de Equipos" 
        icon={<Settings className="h-5 w-5" />}
      />
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clases">Clases de Equipos</TabsTrigger>
            <TabsTrigger value="tipos">Tipos de Equipos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default EquiposHeader;
