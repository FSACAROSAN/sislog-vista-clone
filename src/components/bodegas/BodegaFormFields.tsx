
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
import { BodegaFormValues } from './schema';

interface BodegaFormFieldsProps {
  centrosLogisticos: { id: string; nombre: string }[];
}

const BodegaFormFields: React.FC<BodegaFormFieldsProps> = ({ centrosLogisticos }) => {
  const { control } = useFormContext<BodegaFormValues>();
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="nombre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre de la Bodega*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: Bodega Principal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="centro_logistico_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Centro Logístico*</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un centro logístico" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {centrosLogisticos.map((centro) => (
                  <SelectItem key={centro.id} value={centro.id}>
                    {centro.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

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

export default BodegaFormFields;
