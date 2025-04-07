
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TarifaGeneral } from '@/types/tarifaGeneral';
import { UseFormReturn } from 'react-hook-form';
import { TarifaFormValues } from '../schema';

interface TarifaGeneralSelectProps {
  form: UseFormReturn<TarifaFormValues>;
  tarifasGenerales: TarifaGeneral[];
  loading: boolean;
}

const TarifaGeneralSelect: React.FC<TarifaGeneralSelectProps> = ({
  form,
  tarifasGenerales,
  loading,
}) => {
  return (
    <FormField
      control={form.control}
      name="tarifa_general_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tarifa General (Opcional)</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={loading}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una tarifa general" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="ninguna">Ninguna</SelectItem>
              {tarifasGenerales.map((tarifa) => (
                <SelectItem key={tarifa.id} value={tarifa.id}>
                  {tarifa.nombre} (${tarifa.precio})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TarifaGeneralSelect;
