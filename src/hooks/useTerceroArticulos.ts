
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TerceroArticulo } from '@/types/terceroArticulo';

export const useTerceroArticulos = (terceroId: string) => {
  // Initialize with empty arrays to avoid undefined
  const [articulos, setArticulos] = useState<TerceroArticulo[]>([]);
  const [allArticulos, setAllArticulos] = useState<TerceroArticulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticulo, setSelectedArticulo] = useState<TerceroArticulo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { toast } = useToast();

  const fetchArticulos = useCallback(async () => {
    if (!terceroId) {
      setArticulos([]);
      setAllArticulos([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Use "as any" to bypass the TypeScript error
      const { data, error } = await supabase
        .from('ge_tercero_articulos' as any)
        .select(`
          *,
          unidad_medida:inv_unidades_medida(*)
        `)
        .eq('tercero_id', terceroId)
        .order('nombre', { ascending: true });

      if (error) throw error;
      
      // Ensure we always set arrays, even if data is undefined
      const articulosArray = Array.isArray(data) ? data : [];
      setAllArticulos(articulosArray as unknown as TerceroArticulo[]);
      setArticulos(articulosArray as unknown as TerceroArticulo[]);
    } catch (error: any) {
      console.error('Error fetching articulos:', error);
      // Initialize with empty arrays in case of error
      setAllArticulos([]);
      setArticulos([]);
      
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
      // Use "as any" to bypass the TypeScript error
      const { error } = await supabase
        .from('ge_tercero_articulos' as any)
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

  // Calculate paginated data - ensure articulos is an array
  const paginatedArticulos = Array.isArray(articulos) ? articulos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) : [];

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
    allArticulos: Array.isArray(articulos) ? articulos : [],
    totalItems: Array.isArray(articulos) ? articulos.length : 0,
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
