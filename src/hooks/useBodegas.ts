
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Bodega } from '@/types/bodega';

export const useBodegas = () => {
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodega, setSelectedBodega] = useState<Bodega | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchBodegas = async () => {
    try {
      setLoading(true);
      // Fetch bodegas with centro_logistico information
      const { data: bodegasData, error: bodegasError } = await supabase
        .from('bodegas')
        .select('*');

      if (bodegasError) throw bodegasError;
      
      // Fetch centro_logistico data to get names
      const { data: centrosLogisticosData, error: centrosLogisticosError } = await supabase
        .from('centro_logistico')
        .select('id, nombre');
        
      if (centrosLogisticosError) throw centrosLogisticosError;
      
      // Create map for quick lookups
      const centrosLogisticosMap = new Map(
        centrosLogisticosData.map((centro: any) => [centro.id, centro.nombre])
      );
      
      // Transform the data to include the centro_logistico_nombre
      const formattedBodegas = bodegasData.map((bodega: any) => ({
        ...bodega,
        centro_logistico_nombre: centrosLogisticosMap.get(bodega.centro_logistico_id)
      }));
      
      setBodegas(formattedBodegas as Bodega[]);
    } catch (error: any) {
      console.error('Error fetching bodegas:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar las bodegas',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bodegas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Bodega eliminada correctamente',
      });
      fetchBodegas();
    } catch (error: any) {
      console.error('Error deleting bodega:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar la bodega',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchBodegas();
  }, []);

  const filteredBodegas = bodegas.filter(bodega =>
    bodega.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (bodega.centro_logistico_nombre && bodega.centro_logistico_nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    bodegas: filteredBodegas,
    loading,
    searchTerm,
    setSearchTerm,
    selectedBodega,
    setSelectedBodega,
    isDialogOpen,
    setIsDialogOpen,
    fetchBodegas,
    handleDelete
  };
};
