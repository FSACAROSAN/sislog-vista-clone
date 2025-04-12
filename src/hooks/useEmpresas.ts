
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/empresa';
import { useToast } from '@/hooks/use-toast';
import { debounce } from 'lodash';

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const isMounted = useRef(true);
  const { toast } = useToast();

  // Format date for display
  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Fetch empresas from the database with debouncing
  const fetchEmpresas = useCallback(async () => {
    if (!isMounted.current) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('empresas')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) {
        throw error;
      }
      
      if (isMounted.current) {
        setEmpresas(data || []);
      }
    } catch (error: any) {
      console.error('Error fetching empresas:', error);
      if (isMounted.current) {
        setError('Error al cargar las empresas. Por favor, intente de nuevo.');
        toast({
          title: 'Error',
          description: 'Error al cargar las empresas',
          variant: 'destructive',
        });
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [toast]);

  // Delete empresa with optimistic update
  const handleDelete = useCallback(async (id: string) => {
    try {
      // Optimistic update - remove from UI immediately
      setEmpresas(prevEmpresas => prevEmpresas.filter(empresa => empresa.id !== id));
      
      const { error } = await supabase
        .from('empresas')
        .delete()
        .eq('id', id);

      if (error) {
        // Revert on error by refetching
        fetchEmpresas();
        throw error;
      }

      toast({
        title: 'Éxito',
        description: 'Empresa eliminada correctamente',
      });
    } catch (error: any) {
      console.error('Error deleting empresa:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar la empresa',
        variant: 'destructive',
      });
    }
  }, [fetchEmpresas, toast]);

  // Handle success after form submission with debouncing
  const handleFormSuccess = useCallback(debounce(() => {
    if (isMounted.current) {
      fetchEmpresas();
      setOpenEditDialog(false);
      setOpenNewDialog(false);
    }
  }, 300), [fetchEmpresas]);

  // Edit empresa - with debouncing to prevent double clicks
  const handleEdit = useCallback(debounce((empresa: Empresa) => {
    if (isMounted.current) {
      setSelectedEmpresa(empresa);
      setOpenEditDialog(true);
    }
  }, 300), []);

  // Load data on component mount and cleanup on unmount
  useEffect(() => {
    isMounted.current = true;
    fetchEmpresas();
    
    return () => {
      isMounted.current = false;
    };
  }, [fetchEmpresas]);

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
