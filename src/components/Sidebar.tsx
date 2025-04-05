
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, Building2, Users, Package2, Warehouse, Map, PackageOpen, 
  ChevronDown, LogOut, Truck, ClipboardList, Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    <Link to={path} className={`flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-md text-sm transition-colors w-full`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const SubMenuCategory: React.FC<{ title: string, children: React.ReactNode, isOpen: boolean, onToggle: () => void }> = ({ 
  title, 
  children, 
  isOpen, 
  onToggle 
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-500 hover:bg-blue-50 rounded-md">
        <span>{title}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-blue-50/50 rounded-md mb-1 mt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const Sidebar: React.FC = () => {
  const [configOpen, setConfigOpen] = useState(true);
  const [generalOpen, setGeneralOpen] = useState(true);
  const [operacionalesOpen, setOperacionalesOpen] = useState(false);
  const [regionalesOpen, setRegionalesOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="h-8 w-8 bg-sislog-primary rounded-md flex items-center justify-center mr-2">
          <Package2 size={20} className="text-white" />
        </div>
        <span className="font-bold text-xl">SISLOG</span>
      </div>
      
      <div className="flex-1 overflow-auto py-4 px-2">
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard principal" 
          active={true} 
          path="/"
        />
        
        <div className="my-2">
          <Collapsible open={configOpen} onOpenChange={() => setConfigOpen(!configOpen)} className="w-full">
            <CollapsibleTrigger className="sidebar-item w-full flex justify-between">
              <div className="flex items-center gap-3">
                <Settings size={18} />
                <span>Configuración</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${configOpen ? 'rotate-180' : ''}`} 
              />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-1 space-y-1">
              <SubMenuCategory 
                title="General" 
                isOpen={generalOpen} 
                onToggle={() => setGeneralOpen(!generalOpen)}
              >
                <SidebarSubItem icon={<Building2 size={16} />} label="Empresa" />
                <SidebarSubItem icon={<Users size={16} />} label="Terceros" />
                <SidebarSubItem icon={<Package2 size={16} />} label="Productos" />
              </SubMenuCategory>
              
              <SubMenuCategory 
                title="Operacionales" 
                isOpen={operacionalesOpen} 
                onToggle={() => setOperacionalesOpen(!operacionalesOpen)}
              >
                <SidebarSubItem icon={<Warehouse size={16} />} label="Centro Logístico" />
                <SidebarSubItem icon={<Warehouse size={16} />} label="Bodegas" />
                <SidebarSubItem icon={<Clock size={16} />} label="Stand" />
              </SubMenuCategory>
              
              <SubMenuCategory 
                title="Regionales" 
                isOpen={regionalesOpen} 
                onToggle={() => setRegionalesOpen(!regionalesOpen)}
              >
                <SidebarSubItem icon={<Map size={16} />} label="Países" />
                <SidebarSubItem icon={<Map size={16} />} label="Ciudades" />
              </SubMenuCategory>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <SidebarItem icon={<Truck size={18} />} label="Logística" />
        <SidebarItem icon={<Package2 size={18} />} label="Contenedores" />
        <SidebarItem icon={<ClipboardList size={18} />} label="Reportes" />
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
