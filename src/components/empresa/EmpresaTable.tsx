
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Edit, Trash2, ArrowUpDown, Plus, MoreHorizontal } from 'lucide-react';
import { Empresa } from '@/types/empresa';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from '@/components/common/DeleteDialog';

interface EmpresaTableProps {
  empresas: Empresa[];
  isLoading: boolean;
  onEdit: (empresa: Empresa) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString?: string) => string;
  onRefresh: () => void;
  openNewDialog: () => void;
}

// Memoized TableRow component to prevent unnecessary re-renders
const EmpresaRow = memo(({ 
  empresa, 
  formatDate, 
  onEdit, 
  openAlert, 
  setOpenAlert 
}: { 
  empresa: Empresa; 
  formatDate: (dateString?: string) => string; 
  onEdit: (empresa: Empresa) => void; 
  openAlert: string | null;
  setOpenAlert: (id: string | null) => void;
}) => {
  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(empresa);
  }, [empresa, onEdit]);

  const handleOpenAlert = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenAlert(empresa.id);
  }, [empresa.id, setOpenAlert]);

  return (
    <TableRow key={empresa.id}>
      <TableCell className="font-medium">{empresa.nombre}</TableCell>
      <TableCell>{empresa.correo || '-'}</TableCell>
      <TableCell>{empresa.telefono || '-'}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs ${
          empresa.estado === 'Activo' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {empresa.estado || 'Inactivo'}
        </span>
      </TableCell>
      <TableCell>{formatDate(empresa.fecha_creacion)}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white z-[999]">
            <DropdownMenuItem 
              onClick={handleEdit} 
              className="cursor-pointer"
            >
              <Edit size={16} className="mr-2 text-gray-500" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleOpenAlert} 
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 size={16} className="mr-2 text-red-500" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

EmpresaRow.displayName = 'EmpresaRow';

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
  
  const filteredEmpresas = useMemo(() => {
    return empresas.filter(empresa => 
      empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (empresa.correo && empresa.correo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (empresa.telefono && empresa.telefono.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [empresas, searchTerm]);

  const selectedEmpresa = useMemo(() => {
    return empresas.find(empresa => empresa.id === openAlert) || null;
  }, [openAlert, empresas]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleDelete = useCallback(() => {
    if (openAlert) {
      onDelete(openAlert);
      setOpenAlert(null);
    }
  }, [openAlert, onDelete]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Buscar empresa..."
            className="px-4 py-2 h-8 border rounded-md w-full pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" onClick={onRefresh} disabled={isLoading} className="h-8 text-xs">
            <ArrowUpDown size={14} className="mr-1" />
            Actualizar
          </Button>
          <Button onClick={openNewDialog} className="gap-1 h-8 text-xs">
            <Plus size={14} />
            Nueva Empresa
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : filteredEmpresas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No se encontraron resultados para su búsqueda.' : 'No hay empresas registradas. Haga clic en "Nueva Empresa" para agregar una.'}
        </div>
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
              {filteredEmpresas.map((empresa) => (
                <EmpresaRow 
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
