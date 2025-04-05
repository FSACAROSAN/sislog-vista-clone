
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import { Building2, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/empresa';
import EmpresaForm from '@/components/empresa/EmpresaForm';
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const EmpresaPage = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const { toast } = useToast();

  // Fetch empresas from the database
  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching empresas...');
      const { data, error } = await supabase
        .from('empresas')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Empresas fetched:', data);
      setEmpresas(data || []);
    } catch (error: any) {
      console.error('Error fetching empresas:', error);
      setError('Error al cargar las empresas. Por favor, intente de nuevo.');
      toast({
        title: 'Error',
        description: 'Error al cargar las empresas',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete empresa
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta empresa?')) {
      try {
        const { error } = await supabase
          .from('empresas')
          .delete()
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Empresa eliminada correctamente',
        });

        // Refresh the list
        fetchEmpresas();
      } catch (error: any) {
        console.error('Error deleting empresa:', error);
        toast({
          title: 'Error',
          description: error.message || 'Error al eliminar la empresa',
          variant: 'destructive',
        });
      }
    }
  };

  // Handle success after form submission
  const handleFormSuccess = () => {
    fetchEmpresas();
    setOpenEditDialog(false);
    setOpenNewDialog(false);
  };

  // Edit empresa
  const handleEdit = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setOpenEditDialog(true);
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Load data on component mount
  useEffect(() => {
    fetchEmpresas();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Empresa" 
        subtitle="Gestión de información de la empresa"
        icon={<Building2 size={24} />}
      />
      
      <div className="container py-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Empresas Registradas</CardTitle>
              <CardDescription>
                Lista de empresas en el sistema
              </CardDescription>
            </div>
            <Dialog open={openNewDialog} onOpenChange={setOpenNewDialog}>
              <DialogTrigger asChild>
                <Button className="ml-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Empresa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Crear Empresa</DialogTitle>
                  <DialogDescription>
                    Ingrese la información de la nueva empresa a continuación.
                  </DialogDescription>
                </DialogHeader>
                <EmpresaForm onSuccess={handleFormSuccess} />
                <DialogClose className="hidden" />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : empresas.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay empresas registradas. Haga clic en "Nueva Empresa" para agregar una.
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
                    {empresas.map((empresa) => (
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
                          <div className="flex justify-end items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(empresa)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDelete(empresa.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
            <DialogDescription>
              Actualice la información de la empresa a continuación.
            </DialogDescription>
          </DialogHeader>
          {selectedEmpresa && (
            <EmpresaForm empresa={selectedEmpresa} onSuccess={handleFormSuccess} />
          )}
          <DialogClose className="hidden" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpresaPage;
