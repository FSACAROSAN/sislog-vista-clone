
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, Building2, Users, Package2, Warehouse, Map, PackageOpen, 
  ChevronDown, LogOut, Truck, ClipboardList
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
    <Link to={path} className={`sidebar-subitem ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [generalOpen, setGeneralOpen] = React.useState(true);
  const [operacionalesOpen, setOperacionalesOpen] = React.useState(true);
  const [regionalesOpen, setRegionalesOpen] = React.useState(true);
  const { signOut } = useAuth();
  const location = useLocation();

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
        
        <div className="relative">
          <button 
            className="sidebar-item w-full flex justify-between"
            onClick={() => setGeneralOpen(!generalOpen)}
          >
            <div className="flex items-center gap-3">
              <Settings size={18} />
              <span>Configuración</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${generalOpen ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {generalOpen && (
            <div className="mt-1">
              <div className="sidebar-category">General</div>
              <SidebarSubItem 
                icon={<Building2 size={16} />} 
                label="Empresa" 
                active={location.pathname === '/empresa'} 
                path="/empresa"
              />
              <SidebarSubItem icon={<Users size={16} />} label="Terceros" />
              <SidebarSubItem icon={<Package2 size={16} />} label="Productos" />
              
              <div className="sidebar-category">Operacionales</div>
              <SidebarSubItem icon={<Warehouse size={16} />} label="Centro Logístico" />
              <SidebarSubItem icon={<Warehouse size={16} />} label="Bodegas" />
              <SidebarSubItem icon={<PackageOpen size={16} />} label="Stand" />
              
              <div className="sidebar-category">Regionales</div>
              <SidebarSubItem icon={<Map size={16} />} label="Países" />
              <SidebarSubItem icon={<Map size={16} />} label="Ciudades" />
            </div>
          )}
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
