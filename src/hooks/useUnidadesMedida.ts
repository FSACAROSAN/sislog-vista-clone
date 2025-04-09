
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UnidadMedida } from '@/types/unidadMedida';

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

  const fetchUnidadesMedida = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inv_unidades_medida')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) throw error;
      
      // Store all unidades de medida for filtering
      setAllUnidadesMedida(data as unknown as UnidadMedida[]);
    } catch (error: any) {
      console.error('Error fetching unidades de medida:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar las unidades de medida',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
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
    }
  };

  useEffect(() => {
    fetchUnidadesMedida();
  }, []);

  // Filter unidades de medida based on search term
  useEffect(() => {
    const filteredResults = allUnidadesMedida.filter(unidad =>
      unidad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setUnidadesMedida(filteredResults);
    // Reset to first page when search term changes
    setCurrentPage(1);
  }, [searchTerm, allUnidadesMedida]);

  // Calculate paginated data
  const paginatedUnidadesMedida = unidadesMedida.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return {
    unidadesMedida: paginatedUnidadesMedida,
    allUnidadesMedida: unidadesMedida,
    totalItems: unidadesMedida.length,
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
