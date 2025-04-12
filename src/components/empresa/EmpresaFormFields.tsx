
import React, { memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EmpresaFormValues } from './schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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

interface EmpresaFormFieldsProps {
  form: UseFormReturn<EmpresaFormValues>;
}

const EmpresaFormFields: React.FC<EmpresaFormFieldsProps> = memo(({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="nombre"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-xs">Nombre de la empresa*</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ingrese el nombre de la empresa" 
                {...field} 
                className="h-8 text-sm"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs">Correo electrónico</FormLabel>
              <FormControl>
                <Input 
                  placeholder="correo@empresa.com" 
                  {...field} 
                  value={field.value || ''} 
                  className="h-8 text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs">Teléfono</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+1 (555) 123-4567" 
                  {...field} 
                  value={field.value || ''} 
                  className="h-8 text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="estado"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-xs">Estado</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  );
});

EmpresaFormFields.displayName = 'EmpresaFormFields';
export default EmpresaFormFields;
