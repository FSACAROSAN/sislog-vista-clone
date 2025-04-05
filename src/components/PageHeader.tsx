
import React from 'react';
import { ChevronLeft, Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        {icon && <div className="text-sislog-primary">{icon}</div>}
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 h-9"
          />
        </div>
        
        <div className="relative">
          <button className="p-1.5 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            {getInitials()}
          </div>
          <div>
            <div className="text-sm font-medium">Regular User</div>
            <div className="text-xs text-gray-500">SISLOG</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
