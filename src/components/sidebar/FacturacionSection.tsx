
import React from 'react';
import { Receipt, Tag } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SidebarSubItem from './SidebarSubItem';
import { useLanguage } from '@/contexts/LanguageContext';

interface FacturacionSectionProps {
  isActive: boolean;
  activePath: string;
}

const FacturacionSection: React.FC<FacturacionSectionProps> = ({ isActive, activePath }) => {
  const { t } = useLanguage();

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full">
        <div className={`sidebar-item ${isActive ? 'active' : ''} justify-between`}>
          <div className="flex items-center">
            <Receipt size={18} />
            <span className="px-[10px]">{t('billing')}</span>
          </div>
          <ChevronDown size={16} className="transition-transform duration-200" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-12 pr-4 mt-1">
          <div className="flex flex-col space-y-1">
            <SidebarSubItem 
              icon={<Tag size={16} />} 
              label={t('general.rates')} 
              active={activePath === '/tarifas-generales'} 
              path="/tarifas-generales" 
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FacturacionSection;
