
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
import { TarifaGeneralFormValues } from './schema';

export const TarifaGeneralNameField: React.FC = () => {
  const { control } = useFormContext<TarifaGeneralFormValues>();
  
  return (
    <FormField
      control={control}
      name="nombre"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre*</FormLabel>
          <FormControl>
            <Input placeholder="Ej: Tarifa Básica" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TarifaGeneralPrecioField: React.FC = () => {
  const { control } = useFormContext<TarifaGeneralFormValues>();
  
  return (
    <FormField
      control={control}
      name="precio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Precio*</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              placeholder="Ej: 100.00" 
              {...field} 
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              step="0.01"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TarifaGeneralStatusField: React.FC = () => {
  const { control } = useFormContext<TarifaGeneralFormValues>();
  
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
const TarifaGeneralFormFields: React.FC = () => {
  return (
    <div className="space-y-6">
      <TarifaGeneralNameField />
      <TarifaGeneralPrecioField />
      <TarifaGeneralStatusField />
    </div>
  );
};

export default TarifaGeneralFormFields;
