
import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import LanguageSelector from './LanguageSelector';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-2 px-4 md:px-6 border-b border-gray-200 bg-white min-h-[61px]">
      <div className="flex items-center gap-3 mb-2 md:mb-0 mt-2 md:mt-0 ml-8 md:ml-0 px-0 md:px-[35px]">
        {icon && <div className="text-sislog-primary">{icon}</div>}
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
            {title}
          </h1>
          {subtitle && <p className="text-xs md:text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto ml-8 md:ml-0">
        <LanguageSelector />
        
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
          <div className="hidden md:block">
            <div className="text-sm font-medium">Regular User</div>
            <div className="text-xs text-gray-500">SISLOG</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
