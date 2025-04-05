
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { CentroLogistico } from '@/types/centroLogistico';
import { CentroLogisticoFormValues, centroLogisticoFormSchema } from './schema';

interface UseCentroLogisticoFormProps {
  centroLogistico: CentroLogistico | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCentroLogisticoForm = ({ centroLogistico, onSuccess, onError }: UseCentroLogisticoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paises, setPaises] = useState<{ id: string; nombre: string }[]>([]);
  const [ciudades, setCiudades] = useState<{ id: string; nombre: string }[]>([]);
  const [selectedPaisId, setSelectedPaisId] = useState<string>(centroLogistico?.pais_id || '');
  
  const form = useForm<CentroLogisticoFormValues>({
    resolver: zodResolver(centroLogisticoFormSchema),
    defaultValues: centroLogistico ? {
      nombre: centroLogistico.nombre,
      pais_id: centroLogistico.pais_id,
      ciudad_id: centroLogistico.ciudad_id,
      estado: centroLogistico.estado || 'Activo',
    } : {
      nombre: '',
      pais_id: '',
      ciudad_id: '',
      estado: 'Activo',
    }
  });

  // Load paises data
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const { data, error } = await supabase
          .from('paises')
          .select('id, nombre_es')
          .order('nombre_es', { ascending: true });

        if (error) throw error;
        setPaises(data.map(pais => ({ id: pais.id, nombre: pais.nombre_es })));
      } catch (error) {
        console.error('Error fetching países:', error);
      }
    };

    fetchPaises();
  }, []);

  // Load ciudades data based on selected pais_id
  useEffect(() => {
    const fetchCiudades = async () => {
      if (!selectedPaisId) {
        setCiudades([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('ciudades')
          .select('id, nombre')
          .eq('pais_id', selectedPaisId)
          .order('nombre', { ascending: true });

        if (error) throw error;
        setCiudades(data);
      } catch (error) {
        console.error('Error fetching ciudades:', error);
      }
    };

    fetchCiudades();
  }, [selectedPaisId]);

  // Watch for changes in pais_id
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'pais_id') {
        const newPaisId = value.pais_id as string;
        if (newPaisId !== selectedPaisId) {
          setSelectedPaisId(newPaisId);
          form.setValue('ciudad_id', ''); // Reset ciudad when país changes
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, selectedPaisId]);

  const onSubmit = async (values: CentroLogisticoFormValues) => {
    try {
      setIsSubmitting(true);

      if (centroLogistico?.id) {
        // Update existing centro logístico
        const { error } = await supabase
          .from('centro_logistico')
          .update({
            nombre: values.nombre,
            pais_id: values.pais_id,
            ciudad_id: values.ciudad_id,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          })
          .eq('id', centroLogistico.id);

        if (error) throw error;
      } else {
        // Create new centro logístico
        const { error } = await supabase
          .from('centro_logistico')
          .insert({
            nombre: values.nombre,
            pais_id: values.pais_id,
            ciudad_id: values.ciudad_id,
            estado: values.estado,
          });

        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving centro logístico:', error);
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
    paises,
    ciudades
  };
};
