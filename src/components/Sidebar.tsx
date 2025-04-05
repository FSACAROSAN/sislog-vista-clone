
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, Building2, Users, Package2, Warehouse, Map, MapPin, 
  LogOut, Truck, ClipboardList, PackageOpen, ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  path?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, path = "#" }) => {
  return (
    <Link to={path} className={`sidebar-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const SidebarSubItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, path = "#" }) => {
  return (
    <Link to={path} className={`flex items-center gap-2 px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 ${active ? 'bg-gray-100 font-medium' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  
  const isConfigActive = ['/empresa', '/paises', '/ciudades', '/centro-logistico', '/bodegas', '/stands'].includes(location.pathname);

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="h-8 w-8 bg-sislog-primary rounded-md flex items-center justify-center mr-2">
          <Package2 size={20} className="text-white" />
        </div>
        <span className="font-bold text-xl">SISLOG</span>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard principal" 
          active={location.pathname === '/'} 
          path="/"
        />
        
        <Collapsible
          defaultOpen={isConfigActive}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full">
            <div className={`sidebar-item ${isConfigActive ? 'active' : ''} justify-between`}>
              <div className="flex items-center">
                <Settings size={18} />
                <span>Configuración</span>
              </div>
              <ChevronDown size={16} className="transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pl-12 pr-4 mt-1">
              <div className="flex flex-col space-y-1">
                <SidebarSubItem 
                  icon={<Building2 size={16} />} 
                  label="Empresa" 
                  active={location.pathname === '/empresa'} 
                  path="/empresa"
                />
                <SidebarSubItem 
                  icon={<Map size={16} />} 
                  label="Países" 
                  active={location.pathname === '/paises'} 
                  path="/paises"
                />
                <SidebarSubItem 
                  icon={<MapPin size={16} />} 
                  label="Ciudades" 
                  active={location.pathname === '/ciudades'} 
                  path="/ciudades"
                />
                <SidebarSubItem 
                  icon={<Warehouse size={16} />} 
                  label="Centro Logístico" 
                  active={location.pathname === '/centro-logistico'} 
                  path="/centro-logistico"
                />
                <SidebarSubItem 
                  icon={<Warehouse size={16} />} 
                  label="Bodegas" 
                  active={location.pathname === '/bodegas'} 
                  path="/bodegas"
                />
                <SidebarSubItem 
                  icon={<PackageOpen size={16} />} 
                  label="Stands" 
                  active={location.pathname === '/stands'} 
                  path="/stands"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <SidebarItem 
          icon={<Truck size={18} />} 
          label="Logística" 
        />
        
        <SidebarItem 
          icon={<Package2 size={18} />} 
          label="Contenedores" 
        />
        
        <SidebarItem 
          icon={<ClipboardList size={18} />} 
          label="Reportes" 
        />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          className="sidebar-item w-full text-red-500"
          onClick={signOut}
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
