
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Ciudad } from '@/types/ciudad';

export const useCiudades = () => {
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCiudad, setSelectedCiudad] = useState<Ciudad | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchCiudades = async () => {
    try {
      setLoading(true);
      // Using raw query instead of join
      const { data, error } = await supabase
        .from('ciudades')
        .select('*');

      if (error) throw error;
      
      // Fetch paises to get nombres
      const { data: paisesData, error: paisesError } = await supabase
        .from('paises')
        .select('id, nombre_es');
        
      if (paisesError) throw paisesError;
      
      // Create a map of pais_id to nombre_es
      const paisesMap = new Map(
        paisesData.map((pais: any) => [pais.id, pais.nombre_es])
      );
      
      // Transform the data to include the pais_nombre
      const formattedCiudades = data.map((ciudad: any) => ({
        ...ciudad,
        pais_nombre: paisesMap.get(ciudad.pais_id)
      }));
      
      setCiudades(formattedCiudades as Ciudad[]);
    } catch (error: any) {
      console.error('Error fetching ciudades:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar las ciudades',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ciudades')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Ciudad eliminada correctamente',
      });
      fetchCiudades();
    } catch (error: any) {
      console.error('Error deleting ciudad:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar la ciudad',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchCiudades();
  }, []);

  const filteredCiudades = ciudades.filter(ciudad =>
    ciudad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ciudad.pais_nombre && ciudad.pais_nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    ciudades: filteredCiudades,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCiudad,
    setSelectedCiudad,
    isDialogOpen,
    setIsDialogOpen,
    fetchCiudades,
    handleDelete
  };
};
