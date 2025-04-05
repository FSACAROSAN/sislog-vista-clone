
import React, { useEffect, useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [user]);

  // Get initials for avatar
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return profile?.username?.substring(0, 2).toUpperCase() || user?.email?.substring(0, 2).toUpperCase() || 'US';
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-white">
      <div>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-sislog-primary w-64"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="relative">
          <button className="p-1.5 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-sislog-primary rounded-full flex items-center justify-center text-white font-medium">
            {getInitials()}
          </div>
          <div>
            <div className="text-sm font-medium">{profile?.full_name || profile?.username || user?.email?.split('@')[0]}</div>
            <div className="text-xs text-gray-500">SISLOG</div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;
