
import React from 'react';
import { Settings, Building2, Map, MapPin, Warehouse, UserCircle, PackageOpen } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SidebarSubItem from './SidebarSubItem';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConfigSectionProps {
  isActive: boolean;
  activePath: string;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({ isActive, activePath }) => {
  const { t } = useLanguage();

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full">
        <div className={`sidebar-item ${isActive ? 'active' : ''} justify-between`}>
          <div className="flex items-center">
            <Settings size={18} />
            <span className="px-[10px]">{t('configuration')}</span>
          </div>
          <ChevronDown size={16} className="transition-transform duration-200" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-12 pr-4 mt-1">
          <div className="flex flex-col space-y-1">
            <SidebarSubItem 
              icon={<Building2 size={16} />} 
              label={t('company')} 
              active={activePath === '/empresa'} 
              path="/empresa" 
            />
            <SidebarSubItem 
              icon={<Map size={16} />} 
              label={t('countries')} 
              active={activePath === '/paises'} 
              path="/paises" 
            />
            <SidebarSubItem 
              icon={<MapPin size={16} />} 
              label={t('cities')} 
              active={activePath === '/ciudades'} 
              path="/ciudades" 
            />
            <SidebarSubItem 
              icon={<Warehouse size={16} />} 
              label={'Centros Logísticos'} 
              active={activePath === '/centro-logistico'} 
              path="/centro-logistico" 
            />
            <SidebarSubItem 
              icon={<Warehouse size={16} />} 
              label={t('warehouses')} 
              active={activePath === '/bodegas'} 
              path="/bodegas" 
            />
            <SidebarSubItem 
              icon={<PackageOpen size={16} />} 
              label={t('stands')} 
              active={activePath === '/stands'} 
              path="/stands" 
            />
            <SidebarSubItem 
              icon={<UserCircle size={16} />} 
              label={'Terceros'} 
              active={activePath === '/terceros'} 
              path="/terceros" 
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ConfigSection;
