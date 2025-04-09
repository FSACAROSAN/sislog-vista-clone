
import React, { useEffect, useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TerceroArticuloFormValues } from './schema';
import { useUnidadesMedida } from '@/hooks/useUnidadesMedida';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TerceroArticuloNombreField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  
  return (
    <FormField
      control={control}
      name="nombre"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre*</FormLabel>
          <FormControl>
            <Input placeholder="Ej: Producto A" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TerceroArticuloReferenciaField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  
  return (
    <FormField
      control={control}
      name="referencia"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Referencia</FormLabel>
          <FormControl>
            <Input placeholder="Ej: REF-001" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TerceroArticuloUnidadMedidaField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  const { allUnidadesMedida, fetchUnidadesMedida, loading } = useUnidadesMedida();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    fetchUnidadesMedida();
  }, [fetchUnidadesMedida]);
  
  // Ensure we have an array to work with
  const unidadesMedidaArray = Array.isArray(allUnidadesMedida) ? allUnidadesMedida : [];
  
  // Filtrar unidades de medida según el texto de búsqueda
  const filteredUnidades = searchValue === '' 
    ? unidadesMedidaArray 
    : unidadesMedidaArray.filter((unidad) => 
        unidad.nombre.toLowerCase().includes(searchValue.toLowerCase())
      );
  
  return (
    <FormField
      control={control}
      name="unidad_medida_id"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Unidad de Medida</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  {field.value ? (
                    unidadesMedidaArray.find(unidad => unidad.unidad_medida_id === field.value)?.nombre || "Seleccione una unidad"
                  ) : (
                    "Seleccione una unidad de medida"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </div>
              </FormControl>
            </PopoverTrigger>
            {!loading && (
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Buscar unidad de medida..." 
                    onValueChange={setSearchValue}
                    className="h-9"
                  />
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-y-auto">
                    {filteredUnidades.map((unidad) => (
                      <CommandItem
                        key={unidad.unidad_medida_id}
                        value={unidad.nombre}
                        onSelect={() => {
                          field.onChange(unidad.unidad_medida_id);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === unidad.unidad_medida_id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {unidad.nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            )}
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TerceroArticuloActivoField: React.FC = () => {
  const { control } = useFormContext<TerceroArticuloFormValues>();
  
  return (
    <FormField
      control={control}
      name="activo"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Activo</FormLabel>
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

const TerceroArticuloFormFields: React.FC = () => {
  return (
    <div className="space-y-6">
      <TerceroArticuloNombreField />
      <TerceroArticuloReferenciaField />
      <TerceroArticuloUnidadMedidaField />
      <TerceroArticuloActivoField />
    </div>
  );
};

export default TerceroArticuloFormFields;
