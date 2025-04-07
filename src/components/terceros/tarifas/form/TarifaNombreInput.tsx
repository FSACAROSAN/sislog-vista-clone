
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

interface TarifaNombreInputProps {
  form: UseFormReturn<TarifaFormValues>;
  loading: boolean;
}

const TarifaNombreInput: React.FC<TarifaNombreInputProps> = ({
  form,
  loading,
}) => {
  return (
    <FormField
      control={form.control}
      name="nombre"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre de la Tarifa</FormLabel>
          <FormControl>
            <Input placeholder="Nombre de la tarifa" {...field} disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TarifaNombreInput;
