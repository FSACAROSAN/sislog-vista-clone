
import React from 'react';
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
import { CentroLogisticoFormValues } from './schema';

interface CentroLogisticoFormFieldsProps {
  paises: { id: string; nombre: string }[];
  ciudades: { id: string; nombre: string }[];
}

const CentroLogisticoFormFields: React.FC<CentroLogisticoFormFieldsProps> = ({ paises, ciudades }) => {
  const { control, watch } = useFormContext<CentroLogisticoFormValues>();
  const selectedPaisId = watch('pais_id');
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="nombre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: Centro Logístico Principal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {paises.map(pais => (
                    <SelectItem key={pais.id} value={pais.id}>{pais.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="ciudad_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad*</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={!selectedPaisId}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedPaisId ? "Seleccione una ciudad" : "Primero seleccione un país"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ciudades.map(ciudad => (
                    <SelectItem key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
    </div>
  );
};

export default CentroLogisticoFormFields;
