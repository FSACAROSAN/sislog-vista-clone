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
  const [inputValue, setInputValue] = React.useState('');
  
  // Format currency for display with support for large numbers
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0).replace('€', '').trim();
  };

  // Initialize the input value when component mounts or precio changes
  React.useEffect(() => {
    if (precio) {
      setInputValue(formatCurrency(precio));
    }
  }, [precio]);

  // Handle input change - store raw input while typing
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Just store the raw value while typing (only allowing numbers, dots and commas)
    const rawValue = e.target.value.replace(/[^\d.,]/g, '');
    setInputValue(rawValue);
  };
  
  // Format and set the value on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Handle cases with multiple commas/dots (keep only the last one)
    const parts = inputValue.split(/[,.]/);
    let processedValue = inputValue;
    
    if (parts.length > 2) {
      // If there are multiple separators, keep only the last one
      const integerPart = parts.slice(0, -1).join('');
      const decimalPart = parts[parts.length - 1];
      processedValue = `${integerPart},${decimalPart}`;
    }
    
    // Convert comma to dot for calculation
    const normalizedValue = processedValue.replace(',', '.');
    // Parse to float
    const numericValue = parseFloat(normalizedValue);
    
    if (!isNaN(numericValue)) {
      setValue('precio', numericValue);
      setInputValue(formatCurrency(numericValue));
    } else if (inputValue === '' || inputValue === '.' || inputValue === ',') {
      setValue('precio', 0);
      setInputValue(formatCurrency(0));
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
              placeholder="Ej: 1.000.000,00"
              value={inputValue}
              onChange={handlePriceChange}
              onBlur={handleBlur}
              name={field.name}
              className="text-right"
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
