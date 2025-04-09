
import React from 'react';
import { Truck, Ship, ArrowDownToLine, ArrowUpFromLine, Settings, Wrench, Ruler } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SidebarSubItem from './SidebarSubItem';
import { useLanguage } from '@/contexts/LanguageContext';

interface LogisticaSectionProps {
  isActive: boolean;
  activePath: string;
}

const LogisticaSection: React.FC<LogisticaSectionProps> = ({ isActive, activePath }) => {
  const { t } = useLanguage();

  const isConfigActive = ['/equipos', '/unidades-medida'].includes(activePath);

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full">
        <div className={`sidebar-item ${isActive ? 'active' : ''} justify-between`}>
          <div className="flex items-center">
            <Truck size={18} />
            <span className="px-[10px]">{t('logistics')}</span>
          </div>
          <ChevronDown size={16} className="transition-transform duration-200" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-12 pr-4 mt-1">
          <div className="flex flex-col space-y-1">
            <SidebarSubItem 
              icon={<Ship size={16} />} 
              label="Anuncio de arribo" 
              active={activePath === '/anuncio-arribo'} 
              path="/anuncio-arribo" 
            />
            <SidebarSubItem 
              icon={<ArrowDownToLine size={16} />} 
              label="Entradas" 
              active={activePath === '/entradas'} 
              path="/entradas" 
            />
            <SidebarSubItem 
              icon={<ArrowUpFromLine size={16} />} 
              label="Salida" 
              active={activePath === '/salida'} 
              path="/salida" 
            />
            
            {/* Configuración Submenu */}
            <Collapsible className="w-full">
              <CollapsibleTrigger className="w-full">
                <div className={`flex items-center gap-2 px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 ${isConfigActive ? 'bg-gray-100 font-medium' : ''} justify-between`}>
                  <div className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Configuración</span>
                  </div>
                  <ChevronDown size={14} className="transition-transform duration-200" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-8">
                  <SidebarSubItem 
                    icon={<Wrench size={16} />} 
                    label="Equipos" 
                    active={activePath === '/equipos'} 
                    path="/equipos" 
                  />
                  <SidebarSubItem 
                    icon={<Ruler size={16} />} 
                    label="Unidades de medida" 
                    active={activePath === '/unidades-medida'} 
                    path="/unidades-medida" 
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default LogisticaSection;
