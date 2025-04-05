
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { loading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-sislog-background">
        <div className="animate-spin h-10 w-10 border-4 border-sislog-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-sislog-background">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="fixed z-50 top-4 left-4 p-2 bg-white rounded-md shadow-md text-gray-600"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      
      {/* Sidebar with conditional classes for mobile */}
      <div 
        className={`${
          isMobile 
            ? `fixed z-40 h-full transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'relative'
        }`}
      >
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isMobile && sidebarOpen ? 'opacity-50 md:opacity-100' : ''}`}>
        {/* Overlay to close sidebar on mobile when clicked */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
