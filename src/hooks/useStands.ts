
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Stand } from '@/types/stand';

export const useStands = () => {
  const [stands, setStands] = useState<Stand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchStands = async () => {
    try {
      setLoading(true);
      // Fetch stands using raw query approach
      const { data: standsData, error: standsError } = await supabase
        .from('stands')
        .select('*');

      if (standsError) throw standsError;
      
      // Fetch bodegas data to get names
      const { data: bodegasData, error: bodegasError } = await supabase
        .from('bodegas')
        .select('id, nombre');
        
      if (bodegasError) throw bodegasError;
      
      // Create map for quick lookups
      const bodegasMap = new Map(
        bodegasData.map((bodega: any) => [bodega.id, bodega.nombre])
      );
      
      // Transform the data to include the bodega_nombre
      const formattedStands = standsData.map((stand: any) => ({
        ...stand,
        bodega_nombre: bodegasMap.get(stand.bodega_id)
      }));
      
      setStands(formattedStands as Stand[]);
    } catch (error: any) {
      console.error('Error fetching stands:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar los stands',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stands')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Stand eliminado correctamente',
      });
      fetchStands();
    } catch (error: any) {
      console.error('Error deleting stand:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar el stand',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchStands();
  }, []);

  const filteredStands = stands.filter(stand =>
    stand.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (stand.bodega_nombre && stand.bodega_nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    stands: filteredStands,
    loading,
    searchTerm,
    setSearchTerm,
    selectedStand,
    setSelectedStand,
    isDialogOpen,
    setIsDialogOpen,
    fetchStands,
    handleDelete
  };
};
