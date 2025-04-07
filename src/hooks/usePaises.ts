
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pais } from '@/types/pais';

export const usePaises = () => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [allPaises, setAllPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPais, setSelectedPais] = useState<Pais | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Changed from 10 to 5
  const { toast } = useToast();

  const fetchPaises = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('paises')
        .select('*')
        .order('nombre_es', { ascending: true }) as any;

      if (error) throw error;
      
      // Store all paises for filtering
      setAllPaises(data as unknown as Pais[]);
    } catch (error: any) {
      console.error('Error fetching paises:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar los países',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('paises')
        .delete()
        .eq('id', id) as any;

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'País eliminado correctamente',
      });
      fetchPaises();
    } catch (error: any) {
      console.error('Error deleting país:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar el país',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchPaises();
  }, []);

  // Filter paises based on search term
  useEffect(() => {
    const filteredResults = allPaises.filter(pais =>
      pais.nombre_es.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pais.nombre_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pais.iso2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pais.iso3.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pais.codigo.toString().includes(searchTerm)
    );
    
    setPaises(filteredResults);
    // Reset to first page when search term changes
    setCurrentPage(1);
  }, [searchTerm, allPaises]);

  // Calculate paginated data
  const paginatedPaises = paises.slice(
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
    paises: paginatedPaises,
    allPaises: paises,
    totalItems: paises.length,
    loading,
    searchTerm,
    setSearchTerm,
    selectedPais,
    setSelectedPais,
    isDialogOpen,
    setIsDialogOpen,
    fetchPaises,
    handleDelete,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  };
};
