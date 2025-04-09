
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TerceroArticulo } from '@/types/terceroArticulo';

export const useTerceroArticulos = (terceroId: string) => {
  const [articulos, setArticulos] = useState<TerceroArticulo[]>([]);
  const [allArticulos, setAllArticulos] = useState<TerceroArticulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticulo, setSelectedArticulo] = useState<TerceroArticulo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { toast } = useToast();

  const fetchArticulos = useCallback(async () => {
    if (!terceroId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ge_tercero_articulos')
        .select(`
          *,
          unidad_medida:inv_unidades_medida(*)
        `)
        .eq('tercero_id', terceroId)
        .order('nombre', { ascending: true });

      if (error) throw error;
      
      // Store all articulos for filtering
      setAllArticulos(data as unknown as TerceroArticulo[]);
      setArticulos(data as unknown as TerceroArticulo[]);
    } catch (error: any) {
      console.error('Error fetching articulos:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar los productos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [terceroId, toast]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ge_tercero_articulos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Producto eliminado correctamente',
      });
      fetchArticulos();
    } catch (error: any) {
      console.error('Error deleting articulo:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar el producto',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchArticulos();
  }, [fetchArticulos]);

  // Calculate paginated data
  const paginatedArticulos = articulos.slice(
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
    articulos: paginatedArticulos,
    allArticulos: articulos,
    totalItems: articulos.length,
    loading,
    selectedArticulo,
    setSelectedArticulo,
    isDialogOpen,
    setIsDialogOpen,
    fetchArticulos,
    handleDelete,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  };
};
