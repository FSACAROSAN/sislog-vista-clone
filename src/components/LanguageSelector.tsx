
import React, { useState } from 'react';
import { Globe, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from '@/hooks/use-mobile';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
  ];

  const handleSelectLanguage = (lang: 'es' | 'en' | 'fr') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-100 border border-gray-200 shadow-sm">
          <Globe size={16} className="text-sislog-primary" />
          <span className={isMobile ? "inline" : "hidden md:inline"}>
            {isMobile 
              ? languages.find(l => l.code === language)?.name.substring(0, 2) 
              : t('language')}
          </span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code as 'es' | 'en' | 'fr')}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {lang.name}
                {language === lang.code && (
                  <Check size={16} className="text-sislog-primary" />
                )}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default LanguageSelector;
