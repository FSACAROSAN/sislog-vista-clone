
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarSubItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  path?: string;
  onClick?: () => void;
}

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({
  icon,
  label,
  active = false,
  path = "#",
  onClick
}) => {
  return (
    <Link 
      to={path} 
      className={`flex items-center gap-2 px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 ${active ? 'bg-gray-100 font-medium' : ''}`} 
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default SidebarSubItem;
