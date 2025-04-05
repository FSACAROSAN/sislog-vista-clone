
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, Building2, Users, Package2, Warehouse, Map, MapPin, 
  ChevronDown, LogOut, Truck, ClipboardList, PackageOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

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
        
        <div className="px-4 py-2">
          <Accordion type="multiple" defaultValue={["configuracion"]} className="space-y-1">
            <AccordionItem value="configuracion" className="border-none">
              <div className="relative">
                <AccordionTrigger className="py-2 flex items-center gap-3 hover:bg-gray-100 rounded-md px-2">
                  <div className="flex items-center gap-3">
                    <Settings size={18} />
                    <span className="text-sm">Configuración</span>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pt-2 pb-0">
                  <Accordion type="multiple" defaultValue={["general", "operacionales", "regionales"]} className="pl-2">
                    {/* General Submenu */}
                    <AccordionItem value="general" className="border-none">
                      <AccordionTrigger className="py-1 flex items-center gap-3 hover:bg-gray-100 rounded-md px-2">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600">General</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-2 pt-1 pb-0">
                        <div className="flex flex-col space-y-1">
                          <SidebarSubItem 
                            icon={<Building2 size={16} />} 
                            label="Empresa" 
                            active={location.pathname === '/empresa'} 
                            path="/empresa"
                          />
                          <SidebarSubItem icon={<Users size={16} />} label="Terceros" />
                          <SidebarSubItem icon={<Package2 size={16} />} label="Productos" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Operacionales Submenu */}
                    <AccordionItem value="operacionales" className="border-none">
                      <AccordionTrigger className="py-1 flex items-center gap-3 hover:bg-gray-100 rounded-md px-2">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600">Operacionales</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-2 pt-1 pb-0">
                        <div className="flex flex-col space-y-1">
                          <SidebarSubItem 
                            icon={<Warehouse size={16} />} 
                            label="Centro Logístico" 
                            active={location.pathname === '/centro-logistico'} 
                            path="/centro-logistico"
                          />
                          <SidebarSubItem icon={<Warehouse size={16} />} label="Bodegas" />
                          <SidebarSubItem icon={<PackageOpen size={16} />} label="Stand" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Regionales Submenu */}
                    <AccordionItem value="regionales" className="border-none">
                      <AccordionTrigger className="py-1 flex items-center gap-3 hover:bg-gray-100 rounded-md px-2">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600">Regionales</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-2 pt-1 pb-0">
                        <div className="flex flex-col space-y-1">
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
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
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
