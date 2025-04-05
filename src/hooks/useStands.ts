
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
      
      // Use raw SQL query to get stands and join with bodegas
      const { data, error } = await supabase.query(`
        SELECT s.id, s.nombre, s.bodega_id, s.estado, s.created_at, s.updated_at, b.nombre as bodega_nombre
        FROM stands s
        LEFT JOIN bodegas b ON s.bodega_id = b.id
        ORDER BY s.nombre
      `);

      if (error) throw error;
      
      setStands(data as Stand[]);
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
      // Use raw SQL query to delete stand
      const { error } = await supabase.rpc('delete_stand', { 
        p_id: id 
      });

      if (error) {
        // Fallback to direct SQL query if RPC fails
        const { error: fallbackError } = await supabase.query(`
          DELETE FROM stands WHERE id = $1
        `, [id]);

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
