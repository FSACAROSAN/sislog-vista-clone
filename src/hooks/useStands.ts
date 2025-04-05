
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
      
      // Use raw SQL query to get stands and join with bodegas to get bodega names
      const { data, error } = await supabase
        .rpc('get_stands_with_bodegas');

      if (error) {
        // Fallback to direct query and manual join if RPC is not available
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
      } else {
        setStands(data as Stand[]);
      }
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
      // Use parameterized query to delete stand
      const { error } = await supabase
        .rpc('delete_stand', { p_id: id })
        .single();

      if (error) {
        // Fallback to direct table delete if RPC is not available
        const { error: fallbackError } = await supabase
          .from('stands')
          .delete()
          .eq('id', id);

        if (fallbackError) throw fallbackError;
      }

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
