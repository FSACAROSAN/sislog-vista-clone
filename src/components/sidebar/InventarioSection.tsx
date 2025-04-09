
import React from 'react';
import { Box, PackagePlus, Clipboard, CircleDollarSign, Ruler } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SidebarSubItem from './SidebarSubItem';
import { useLanguage } from '@/contexts/LanguageContext';

interface InventarioSectionProps {
  isActive: boolean;
  activePath: string;
}

const InventarioSection: React.FC<InventarioSectionProps> = ({ isActive, activePath }) => {
  const { t } = useLanguage();

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full">
        <div className={`sidebar-item ${isActive ? 'active' : ''} justify-between`}>
          <div className="flex items-center">
            <Box size={18} />
            <span className="px-[10px]">Inventario</span>
          </div>
          <ChevronDown size={16} className="transition-transform duration-200" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-12 pr-4 mt-1">
          <div className="flex flex-col space-y-1">
            <SidebarSubItem 
              icon={<PackagePlus size={16} />} 
              label="Productos" 
              active={activePath === '/productos'} 
              path="/productos" 
            />
            <SidebarSubItem 
              icon={<Clipboard size={16} />} 
              label="Movimientos" 
              active={activePath === '/movimientos'} 
              path="/movimientos" 
            />
            <SidebarSubItem 
              icon={<CircleDollarSign size={16} />} 
              label="Valoración" 
              active={activePath === '/valoracion'} 
              path="/valoracion" 
            />
            <SidebarSubItem 
              icon={<Ruler size={16} />} 
              label="Unidades de medida" 
              active={activePath === '/unidades-medida'} 
              path="/unidades-medida" 
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default InventarioSection;
