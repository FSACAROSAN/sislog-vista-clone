
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  es: {
    'dashboard': 'Dashboard principal',
    'configuration': 'Configuración',
    'company': 'Empresa',
    'countries': 'Países',
    'cities': 'Ciudades',
    'logistic.center': 'Centro Logístico',
    'warehouses': 'Bodegas',
    'stands': 'Stands',
    'billing': 'Facturación',
    'general.rates': 'Tarifas Generales',
    'logistics': 'Logística',
    'containers': 'Contenedores',
    'reports': 'Reportes',
    'logout': 'Cerrar sesión',
    'search': 'Buscar...',
    'language': 'Idioma',
  },
  en: {
    'dashboard': 'Main Dashboard',
    'configuration': 'Configuration',
    'company': 'Company',
    'countries': 'Countries',
    'cities': 'Cities',
    'logistic.center': 'Logistic Center',
    'warehouses': 'Warehouses',
    'stands': 'Stands',
    'billing': 'Billing',
    'general.rates': 'General Rates',
    'logistics': 'Logistics',
    'containers': 'Containers',
    'reports': 'Reports',
    'logout': 'Log out',
    'search': 'Search...',
    'language': 'Language',
  },
  fr: {
    'dashboard': 'Tableau de Bord Principal',
    'configuration': 'Configuration',
    'company': 'Entreprise',
    'countries': 'Pays',
    'cities': 'Villes',
    'logistic.center': 'Centre Logistique',
    'warehouses': 'Entrepôts',
    'stands': 'Stands',
    'billing': 'Facturation',
    'general.rates': 'Tarifs Généraux',
    'logistics': 'Logistique',
    'containers': 'Conteneurs',
    'reports': 'Rapports',
    'logout': 'Déconnexion',
    'search': 'Rechercher...',
    'language': 'Langue',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'es';
  });

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
