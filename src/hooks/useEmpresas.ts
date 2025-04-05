
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/empresa';
import { useToast } from '@/hooks/use-toast';

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const { toast } = useToast();

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  // Load data on component mount
  useEffect(() => {
    fetchEmpresas();
  }, []);

  return {
    empresas,
    loading,
    error,
    selectedEmpresa,
    openEditDialog,
    openNewDialog,
    setOpenEditDialog,
    setOpenNewDialog,
    handleDelete,
    handleEdit,
    handleFormSuccess,
    formatDate,
    fetchEmpresas,
  };
};
