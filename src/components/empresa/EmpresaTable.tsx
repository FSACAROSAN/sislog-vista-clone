
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Empresa } from '@/types/empresa';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TablePagination from '@/components/ui/table-pagination';
import DeleteDialog from '@/components/common/DeleteDialog';
import { 
  EmpresaTableRow, 
  EmpresaTableSearch,
  EmpresaTableEmpty,
  EmpresaTableLoading
} from './table';

interface EmpresaTableProps {
  empresas: Empresa[];
  isLoading: boolean;
  onEdit: (empresa: Empresa) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString?: string) => string;
  onRefresh: () => void;
  openNewDialog: () => void;
}

const EmpresaTable: React.FC<EmpresaTableProps> = memo(({
  empresas,
  isLoading,
  onEdit,
  onDelete,
  formatDate,
  onRefresh,
  openNewDialog
}) => {
  const [openAlert, setOpenAlert] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const filteredEmpresas = useMemo(() => {
    return empresas.filter(empresa => 
      empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (empresa.correo && empresa.correo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (empresa.telefono && empresa.telefono.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [empresas, searchTerm]);

  const paginatedEmpresas = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEmpresas.slice(startIndex, startIndex + pageSize);
  }, [filteredEmpresas, currentPage, pageSize]);

  const selectedEmpresa = useMemo(() => {
    return empresas.find(empresa => empresa.id === openAlert) || null;
  }, [openAlert, empresas]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  }, []);

  const handleDelete = useCallback(() => {
    if (openAlert) {
      onDelete(openAlert);
      setOpenAlert(null);
    }
  }, [openAlert, onDelete]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <EmpresaTableSearch 
        searchTerm={searchTerm}
        isLoading={isLoading}
        onSearchChange={handleSearchChange}
        onRefresh={onRefresh}
        openNewDialog={openNewDialog}
      />

      {isLoading ? (
        <EmpresaTableLoading />
      ) : filteredEmpresas.length === 0 ? (
        <EmpresaTableEmpty searchTerm={searchTerm} />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Lista de empresas registradas</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmpresas.map((empresa) => (
                <EmpresaTableRow 
                  key={empresa.id}
                  empresa={empresa}
                  formatDate={formatDate}
                  onEdit={onEdit}
                  openAlert={openAlert}
                  setOpenAlert={setOpenAlert}
                />
              ))}
            </TableBody>
          </Table>
          
          <TablePagination
            currentPage={currentPage}
            totalItems={filteredEmpresas.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </div>
      )}

      {selectedEmpresa && (
        <DeleteDialog
          open={openAlert === selectedEmpresa.id}
          onOpenChange={(open) => {
            if (!open) setOpenAlert(null);
          }}
          title="¿Está seguro?"
          description={
            <>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la empresa <strong>{selectedEmpresa.nombre}</strong>.
            </>
          }
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
});

EmpresaTable.displayName = 'EmpresaTable';

export default EmpresaTable;
