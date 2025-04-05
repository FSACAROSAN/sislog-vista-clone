
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
import { PaisFormValues } from './schema';

export const PaisNameFields: React.FC = () => {
  const { control } = useFormContext<PaisFormValues>();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="nombre_es"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre en Español*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: Colombia" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="nombre_en"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre en Inglés*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: Colombia" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const PaisCodeFields: React.FC = () => {
  const { control } = useFormContext<PaisFormValues>();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={control}
        name="iso2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Código ISO2*</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ej: CO" 
                {...field} 
                maxLength={2}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="iso3"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Código ISO3*</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ej: COL" 
                {...field} 
                maxLength={3}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="codigo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Código telefónico*</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Ej: 57" 
                {...field} 
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const PaisStatusField: React.FC = () => {
  const { control } = useFormContext<PaisFormValues>();
  
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
const PaisFormFields: React.FC = () => {
  return (
    <div className="space-y-6">
      <PaisNameFields />
      <PaisCodeFields />
      <PaisStatusField />
    </div>
  );
};

export default PaisFormFields;
