
import React, { useState, useEffect } from 'react';
import { Pais } from '@/types/pais';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TablePagination from '@/components/ui/table-pagination';
import PaisesTableRow from './table/PaisesTableRow';
import PaisesTableLoading from './table/PaisesTableLoading';
import PaisesTableEmpty from './table/PaisesTableEmpty';

interface PaisesTableProps {
  paises: Pais[];
  loading: boolean;
  onEdit: (pais: Pais) => void;
  onDelete: (id: string) => void;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PaisesTable: React.FC<PaisesTableProps> = ({ 
  paises, 
  loading, 
  onEdit, 
  onDelete,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  const [visibleColumns, setVisibleColumns] = useState({
    nombre_es: true,
    nombre_en: true,
    iso2: true,
    iso3: true,
    codigo: true,
    estado: true
  });

  // Ajusta las columnas visibles según el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) { // Móvil
        setVisibleColumns({
          nombre_es: true,
          nombre_en: false,
          iso2: true,
          iso3: false,
          codigo: false,
          estado: true
        });
      } else if (width < 768) { // Tablet pequeña
        setVisibleColumns({
          nombre_es: true,
          nombre_en: true,
          iso2: true,
          iso3: false,
          codigo: false,
          estado: true
        });
      } else if (width < 1024) { // Tablet grande
        setVisibleColumns({
          nombre_es: true,
          nombre_en: true,
          iso2: true,
          iso3: true,
          codigo: false,
          estado: true
        });
      } else { // Desktop
        setVisibleColumns({
          nombre_es: true,
          nombre_en: true,
          iso2: true,
          iso3: true,
          codigo: true,
          estado: true
        });
      }
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate visible columns count (for colspan)
  const visibleColumnsCount = Object.values(visibleColumns).filter(Boolean).length + 1; // +1 for actions column

  return (
    <div className="hidden md:block">
      <div onClick={(e) => e.stopPropagation()} className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.nombre_es && <TableHead>Nombre (ES)</TableHead>}
              {visibleColumns.nombre_en && <TableHead>Nombre (EN)</TableHead>}
              {visibleColumns.iso2 && <TableHead>ISO2</TableHead>}
              {visibleColumns.iso3 && <TableHead>ISO3</TableHead>}
              {visibleColumns.codigo && <TableHead>Código</TableHead>}
              {visibleColumns.estado && <TableHead>Estado</TableHead>}
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <PaisesTableLoading colSpan={visibleColumnsCount} />
            ) : paises.length === 0 ? (
              <PaisesTableEmpty colSpan={visibleColumnsCount} />
            ) : (
              paises.map((pais) => (
                <PaisesTableRow
                  key={pais.id}
                  pais={pais}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  visibleColumns={visibleColumns}
                />
              ))
            )}
          </TableBody>
        </Table>
        
        <TablePagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </div>
    </div>
  );
};

export default PaisesTable;
