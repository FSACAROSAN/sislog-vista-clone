
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TerceroArticuloFormValues } from './schema';
import { useUnidadesMedida } from '@/hooks/useUnidadesMedida';

export const TerceroArticuloNombreField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  
  return (
    <FormField
      control={control}
      name="nombre"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre*</FormLabel>
          <FormControl>
            <Input placeholder="Ej: Producto A" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TerceroArticuloReferenciaField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  
  return (
    <FormField
      control={control}
      name="referencia"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Referencia</FormLabel>
          <FormControl>
            <Input placeholder="Ej: REF-001" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TerceroArticuloUnidadMedidaField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  const { allUnidadesMedida, fetchUnidadesMedida, loading } = useUnidadesMedida();
  
  useEffect(() => {
    fetchUnidadesMedida();
  }, [fetchUnidadesMedida]);
  
  return (
    <FormField
      control={control}
      name="unidad_medida_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Unidad de Medida</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value || ""}
            disabled={loading}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una unidad de medida" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {loading ? (
                <SelectItem value="loading" disabled>Cargando...</SelectItem>
              ) : Array.isArray(allUnidadesMedida) && allUnidadesMedida.length > 0 ? (
                allUnidadesMedida.map((unidad) => (
                  <SelectItem 
                    key={unidad.unidad_medida_id} 
                    value={unidad.unidad_medida_id}
                  >
                    {unidad.nombre}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-data" disabled>No hay unidades disponibles</SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TerceroArticuloActivoField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  
  return (
    <FormField
      control={control}
      name="activo"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Activo</FormLabel>
            <FormMessage />
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const TerceroArticuloFormFields: React.FC = () => {
  return (
    <div className="space-y-6">
      <TerceroArticuloNombreField />
      <TerceroArticuloReferenciaField />
      <TerceroArticuloUnidadMedidaField />
      <TerceroArticuloActivoField />
    </div>
  );
};

export default TerceroArticuloFormFields;
