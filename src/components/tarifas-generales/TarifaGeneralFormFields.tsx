
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
  const { control, setValue, watch } = useFormContext<TarifaGeneralFormValues>();
  const precio = watch('precio');
  
  // Format currency for display
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value || 0).replace('€', '').trim();
  };

  // Handle input change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters for processing
    const rawValue = e.target.value.replace(/[^\d.,]/g, '');
    // Convert comma to dot for calculation
    const normalizedValue = rawValue.replace(',', '.');
    // Parse to float
    const numericValue = parseFloat(normalizedValue);
    
    if (!isNaN(numericValue)) {
      setValue('precio', numericValue);
    } else if (rawValue === '' || rawValue === '.' || rawValue === ',') {
      setValue('precio', 0);
    }
  };
  
  return (
    <FormField
      control={control}
      name="precio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Precio*</FormLabel>
          <FormControl>
            <Input 
              placeholder="Ej: 100,00"
              value={formatCurrency(field.value)}
              onChange={handlePriceChange}
              onBlur={field.onBlur}
              name={field.name}
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
