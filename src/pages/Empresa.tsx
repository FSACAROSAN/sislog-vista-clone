
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import EmpresaForm from "@/components/empresa/EmpresaForm";

// Define the company type based on the database schema
interface Empresa {
  id: string;
  nombre: string;
  correo: string | null;
  telefono: string | null;
  estado: string | null;
  fecha_creacion: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const EmpresaPage = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const { toast } = useToast();

  // Fetch companies on component mount
  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('empresas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setEmpresas(data || []);
    } catch (error) {
      console.error('Error fetching empresas:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las empresas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta empresa?')) {
      try {
        const { error } = await supabase
          .from('empresas')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast({
          title: "Empresa eliminada",
          description: "La empresa ha sido eliminada correctamente",
        });
        
        // Refresh the company list
        fetchEmpresas();
      } catch (error) {
        console.error('Error deleting empresa:', error);
        toast({
          title: "Error",
          description: "No se pudo eliminar la empresa",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setIsFormOpen(true);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setSelectedEmpresa(null);
    fetchEmpresas();
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Empresas</h1>
        <Button
          onClick={() => {
            setSelectedEmpresa(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2" size={16} />
          Nueva Empresa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2" />
            Lista de Empresas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <Table>
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
                {empresas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No hay empresas registradas
                    </TableCell>
                  </TableRow>
                ) : (
                  empresas.map((empresa) => (
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
                      <TableCell>
                        {empresa.fecha_creacion 
                          ? new Date(empresa.fecha_creacion).toLocaleDateString() 
                          : '-'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(empresa)}
                          className="mr-1"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(empresa.id)}
                          className="text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {selectedEmpresa ? 'Editar Empresa' : 'Nueva Empresa'}
            </SheetTitle>
          </SheetHeader>
          <EmpresaForm 
            empresa={selectedEmpresa} 
            onSubmitSuccess={handleFormSubmit} 
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EmpresaPage;
