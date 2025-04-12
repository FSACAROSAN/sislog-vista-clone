
import React from 'react';

interface EmpresaTableEmptyProps {
  searchTerm: string;
}

const EmpresaTableEmpty: React.FC<EmpresaTableEmptyProps> = ({ searchTerm }) => {
  return (
    <div className="text-center py-8 text-gray-500">
      {searchTerm ? 
        'No se encontraron resultados para su búsqueda.' : 
        'No hay empresas registradas. Haga clic en "Nueva Empresa" para agregar una.'
      }
    </div>
  );
};

export default EmpresaTableEmpty;
