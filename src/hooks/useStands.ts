
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
      
      // Use the from() method with select() to get stands data
      const { data, error } = await supabase
        .from('stands')
        .select(`
          id, 
          nombre, 
          bodega_id, 
          estado, 
          created_at, 
          updated_at,
          bodegas (nombre)
        `)
        .order('nombre');

      if (error) throw error;
      
      // Transform the data to match the Stand type structure
      const transformedData = data.map(item => ({
        id: item.id,
        nombre: item.nombre,
        bodega_id: item.bodega_id,
        bodega_nombre: item.bodegas?.nombre,
        estado: item.estado,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
      
      setStands(transformedData as Stand[]);
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
      // Use the from() method with delete() to delete a stand
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
