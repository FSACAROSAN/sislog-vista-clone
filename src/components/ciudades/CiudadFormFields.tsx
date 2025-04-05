
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CiudadFormValues } from './schema';
import { supabase } from '@/integrations/supabase/client';
import { Pais } from '@/types/pais';

const CiudadNameField: React.FC = () => {
  const { control } = useFormContext<CiudadFormValues>();
  
  return (
    <FormField
      control={control}
      name="nombre"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre*</FormLabel>
          <FormControl>
            <Input placeholder="Ej: Bogotá" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CiudadPaisField: React.FC = () => {
  const { control } = useFormContext<CiudadFormValues>();
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const { data, error } = await supabase
          .from('paises')
          .select('*')
          .eq('estado', 'Activo')
          .order('nombre_es', { ascending: true });

        if (error) throw error;
        setPaises(data as unknown as Pais[]);
      } catch (error) {
        console.error('Error fetching países:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaises();
  }, []);
  
  return (
    <FormField
      control={control}
      name="pais_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>País*</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un país" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {loading ? (
                <SelectItem value="loading" disabled>Cargando países...</SelectItem>
              ) : paises.length === 0 ? (
                <SelectItem value="empty" disabled>No hay países disponibles</SelectItem>
              ) : (
                paises.map((pais) => (
                  <SelectItem key={pais.id} value={pais.id}>
                    {pais.nombre_es}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CiudadStatusField: React.FC = () => {
  const { control } = useFormContext<CiudadFormValues>();
  
  return (
    <FormField
      control={control}
      name="estado"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Estado</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Create a composite component that includes all form fields
const CiudadFormFields: React.FC = () => {
  return (
    <div className="space-y-6">
      <CiudadNameField />
      <CiudadPaisField />
      <CiudadStatusField />
    </div>
  );
};

export default CiudadFormFields;
