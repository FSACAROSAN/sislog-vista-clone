import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tercero } from '@/types/tercero';

export const useTerceros = () => {
  const [terceros, setTerceros] = useState<Tercero[]>([]);
  const [allTerceros, setAllTerceros] = useState<Tercero[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTercero, setSelectedTercero] = useState<Tercero | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { toast } = useToast();

  const fetchTerceros = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ge_tercero' as any)
        .select(`
          *,
          tipo_documento:ge_tercero_tipo_documento(*)
        `) as any;

      if (error) throw error;
      
      // Store all terceros for filtering
      setAllTerceros(data as Tercero[]);
    } catch (error: any) {
      console.error('Error fetching terceros:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar los terceros',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ge_tercero' as any)
        .delete()
        .eq('id', id) as any;

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Tercero eliminado correctamente',
      });
      fetchTerceros();
    } catch (error: any) {
      console.error('Error deleting tercero:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar el tercero',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchTerceros();
  }, []);

  // Filter terceros based on search term
  useEffect(() => {
    const filteredResults = allTerceros.filter(tercero =>
      tercero.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tercero.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tercero.email_tercero && tercero.email_tercero.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tercero.telefono_1_tercero && tercero.telefono_1_tercero.includes(searchTerm))
    );
    
    setTerceros(filteredResults);
    // Reset to first page when search term changes
    setCurrentPage(1);
  }, [searchTerm, allTerceros]);

  // Calculate paginated data
  const paginatedTerceros = terceros.slice(
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
    terceros: paginatedTerceros,
    allTerceros: terceros,
    totalItems: terceros.length,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTercero,
    setSelectedTercero,
    isDialogOpen,
    setIsDialogOpen,
    fetchTerceros,
    handleDelete,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  };
};
