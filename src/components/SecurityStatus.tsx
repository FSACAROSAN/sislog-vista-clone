
import React from 'react';
import { Shield, CheckCircle, Clock } from 'lucide-react';

const SecurityStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Shield size={20} className="text-sislog-primary" />
        <h3 className="text-lg font-semibold">Estado de Seguridad</h3>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle size={24} className="text-green-500" />
          <div>
            <h4 className="text-green-500 font-semibold text-lg">Óptimo</h4>
            <p className="text-sm text-gray-600">Todos los sistemas funcionando correctamente</p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              <span className="text-gray-700">Encriptación</span>
            </div>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Activa (AES-256)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              <span className="text-gray-700">Última auditoría</span>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Hace 3 días</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityStatus;
