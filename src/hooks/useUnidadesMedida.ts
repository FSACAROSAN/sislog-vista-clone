
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UnidadMedida } from '@/types/unidadMedida';
import { useToast } from '@/hooks/use-toast';

export const useUnidadesMedida = () => {
  const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);
  const [allUnidadesMedida, setAllUnidadesMedida] = useState<UnidadMedida[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnidadMedida, setSelectedUnidadMedida] = useState<UnidadMedida | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { toast } = useToast();

  const fetchUnidadesMedida = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inv_unidades_medida')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) throw error;
      
      // Initialize with empty arrays first to avoid undefined
      setAllUnidadesMedida(Array.isArray(data) ? data : []);
      setUnidadesMedida(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Error fetching unidades de medida:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar las unidades de medida',
        variant: 'destructive',
      });
      // Set empty arrays on error to avoid undefined
      setAllUnidadesMedida([]);
      setUnidadesMedida([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Search filter effect
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setUnidadesMedida(allUnidadesMedida);
    } else {
      const filtered = allUnidadesMedida.filter(unidad => 
        unidad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUnidadesMedida(filtered);
      setCurrentPage(1); // Reset to first page when searching
    }
  }, [searchTerm, allUnidadesMedida]);

  // Load data on mount
  useEffect(() => {
    fetchUnidadesMedida();
  }, [fetchUnidadesMedida]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('inv_unidades_medida')
        .delete()
        .eq('unidad_medida_id', id);

      if (error) throw error;
      
      toast({
        title: 'Éxito',
        description: 'Unidad de medida eliminada correctamente',
      });
      
      fetchUnidadesMedida();
    } catch (error: any) {
      console.error('Error deleting unidad de medida:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar la unidad de medida',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Calculate total items and paginated data
  const totalItems = unidadesMedida.length;
  const paginatedData = unidadesMedida.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    unidadesMedida: paginatedData,
    allUnidadesMedida,
    totalItems,
    loading,
    searchTerm,
    setSearchTerm,
    selectedUnidadMedida,
    setSelectedUnidadMedida,
    isDialogOpen,
    setIsDialogOpen,
    fetchUnidadesMedida,
    handleDelete,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  };
};
