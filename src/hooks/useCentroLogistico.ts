
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CentroLogistico } from '@/types/centroLogistico';

export const useCentroLogistico = () => {
  const [centrosLogisticos, setCentrosLogisticos] = useState<CentroLogistico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCentroLogistico, setSelectedCentroLogistico] = useState<CentroLogistico | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchCentrosLogisticos = async () => {
    try {
      setLoading(true);
      // Fetch the centro logístico data
      const { data, error } = await supabase
        .from('centro_logistico')
        .select('*');

      if (error) throw error;
      
      // Fetch paises data to get country names
      const { data: paisesData, error: paisesError } = await supabase
        .from('paises')
        .select('id, nombre_es');
        
      if (paisesError) throw paisesError;
      
      // Fetch ciudades data to get city names
      const { data: ciudadesData, error: ciudadesError } = await supabase
        .from('ciudades')
        .select('id, nombre');
        
      if (ciudadesError) throw ciudadesError;
      
      // Create maps for quick lookups
      const paisesMap = new Map(
        paisesData.map((pais: any) => [pais.id, pais.nombre_es])
      );
      
      const ciudadesMap = new Map(
        ciudadesData.map((ciudad: any) => [ciudad.id, ciudad.nombre])
      );
      
      // Transform the data to include the pais_nombre and ciudad_nombre
      const formattedCentros = data.map((centro: any) => ({
        ...centro,
        pais_nombre: paisesMap.get(centro.pais_id),
        ciudad_nombre: ciudadesMap.get(centro.ciudad_id)
      }));
      
      setCentrosLogisticos(formattedCentros as CentroLogistico[]);
    } catch (error: any) {
      console.error('Error fetching centros logísticos:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar los centros logísticos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('centro_logistico')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Centro logístico eliminado correctamente',
      });
      fetchCentrosLogisticos();
    } catch (error: any) {
      console.error('Error deleting centro logístico:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar el centro logístico',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchCentrosLogisticos();
  }, []);

  const filteredCentros = centrosLogisticos.filter(centro =>
    centro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (centro.pais_nombre && centro.pais_nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (centro.ciudad_nombre && centro.ciudad_nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    centrosLogisticos: filteredCentros,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCentroLogistico,
    setSelectedCentroLogistico,
    isDialogOpen,
    setIsDialogOpen,
    fetchCentrosLogisticos,
    handleDelete
  };
};
