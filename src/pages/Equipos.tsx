
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import EquiposHeader from '@/components/equipos/EquiposHeader';
import EquiposClaseTable from '@/components/equipos/EquiposClaseTable';
import EquiposTipoTable from '@/components/equipos/EquiposTipoTable';

const Equipos: React.FC = () => {
  const [activeTab, setActiveTab] = useState("clases");

  return (
    <div className="h-full bg-gray-50">
      <EquiposHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container mx-auto">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="clases" className="mt-0">
            <EquiposClaseTable />
          </TabsContent>
          <TabsContent value="tipos" className="mt-0">
            <EquiposTipoTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Equipos;
