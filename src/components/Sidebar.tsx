
import React from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, Package2, LogOut, ClipboardList } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarItem from './sidebar/SidebarItem';
import ConfigSection from './sidebar/ConfigSection';
import FacturacionSection from './sidebar/FacturacionSection';
import InventarioSection from './sidebar/InventarioSection';
import LogisticaSection from './sidebar/LogisticaSection';

const Sidebar: React.FC = () => {
  const { signOut } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isConfigActive = ['/empresa', '/paises', '/ciudades', '/centro-logistico', '/bodegas', '/stands', '/terceros'].includes(location.pathname);
  const isFacturacionActive = ['/tarifas-generales'].includes(location.pathname);
  const isInventarioActive = ['/productos', '/movimientos', '/valoracion', '/unidades-medida'].includes(location.pathname);
  const isLogisticaActive = ['/anuncio-arribo', '/entradas', '/salida', '/equipos'].includes(location.pathname);

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="h-[61px] px-4 border-b border-gray-200 flex items-center">
        <div className="h-8 w-8 bg-sislog-primary rounded-md flex items-center justify-center mr-2">
          <Package2 size={20} className="text-white" />
        </div>
        <span className="font-bold text-xl">SISLOG</span>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label={t('dashboard')} 
          active={location.pathname === '/'} 
          path="/" 
        />
        
        <ConfigSection 
          isActive={isConfigActive} 
          activePath={location.pathname} 
        />

        <FacturacionSection 
          isActive={isFacturacionActive} 
          activePath={location.pathname} 
        />

        <InventarioSection 
          isActive={isInventarioActive} 
          activePath={location.pathname} 
        />

        <LogisticaSection 
          isActive={isLogisticaActive} 
          activePath={location.pathname} 
        />
        
        <SidebarItem 
          icon={<Package2 size={18} />} 
          label={t('containers')} 
        />
        
        <SidebarItem 
          icon={<ClipboardList size={18} />} 
          label={t('reports')} 
        />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="sidebar-item w-full text-red-500" onClick={signOut}>
          <LogOut size={18} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
