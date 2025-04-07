
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { TarifaFormValues } from '../schema';

interface TarifaValorInputProps {
  form: UseFormReturn<TarifaFormValues>;
  loading: boolean;
  formatCurrency: (value: number) => string;
}

const TarifaValorInput: React.FC<TarifaValorInputProps> = ({
  form,
  loading,
  formatCurrency,
}) => {
  return (
    <FormField
      control={form.control}
      name="valor_tarifa"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Valor</FormLabel>
          <FormControl>
            <Input
              type="number"
              step="0.001"
              placeholder="Valor de la tarifa"
              {...field}
              onChange={(e) => {
                field.onChange(parseFloat(e.target.value) || 0);
              }}
              onBlur={(e) => {
                // Mantener el valor numérico pero mostrar formateado
                if (e.target.value) {
                  const numericValue = parseFloat(e.target.value);
                  e.target.value = numericValue.toString();
                  
                  // Mostrar el valor formateado brevemente y luego restaurar
                  const formattedValue = formatCurrency(numericValue);
                  e.target.placeholder = formattedValue;
                  setTimeout(() => {
                    if (document.activeElement !== e.target) {
                      e.target.placeholder = "Valor de la tarifa";
                    }
                  }, 2000);
                }
              }}
              disabled={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TarifaValorInput;
