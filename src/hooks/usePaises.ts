
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pais } from '@/types/pais';

export const usePaises = () => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPais, setSelectedPais] = useState<Pais | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchPaises = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('paises')
        .select('*')
        .order('nombre_es', { ascending: true }) as any;

      if (error) throw error;
      
      // Cast the data to our Pais type
      setPaises(data as unknown as Pais[]);
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

  const filteredPaises = paises.filter(pais =>
    pais.nombre_es.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.nombre_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.iso2.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.iso3.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.codigo.toString().includes(searchTerm)
  );

  return {
    paises: filteredPaises,
    loading,
    searchTerm,
    setSearchTerm,
    selectedPais,
    setSelectedPais,
    isDialogOpen,
    setIsDialogOpen,
    fetchPaises,
    handleDelete
  };
};
