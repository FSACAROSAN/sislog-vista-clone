
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
import { Switch } from '@/components/ui/switch';
import { UnidadMedidaFormValues } from './schema';

export const UnidadMedidaNombreField: React.FC = () => {
  const { control } = useFormContext<UnidadMedidaFormValues>();
  
  return (
    <FormField
      control={control}
      name="nombre"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre*</FormLabel>
          <FormControl>
            <Input placeholder="Ej: Kilogramo" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const UnidadMedidaEstadoField: React.FC = () => {
  const { control } = useFormContext<UnidadMedidaFormValues>();
  
  return (
    <FormField
      control={control}
      name="estado"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Estado</FormLabel>
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

const UnidadMedidaFormFields: React.FC = () => {
  return (
    <div className="space-y-6">
      <UnidadMedidaNombreField />
      <UnidadMedidaEstadoField />
    </div>
  );
};

export default UnidadMedidaFormFields;
