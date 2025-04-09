
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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EquipoFormValues } from './schema';
import { EquipoClase } from '@/types/equipoClase';
import { EquipoTipo } from '@/types/equipoTipo';

interface EquipoFormFieldsProps {
  equiposClase: EquipoClase[];
  equiposTipo: EquipoTipo[];
}

const EquipoFormFields: React.FC<EquipoFormFieldsProps> = ({
  equiposClase,
  equiposTipo,
}) => {
  const { control } = useFormContext<EquipoFormValues>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código*</FormLabel>
              <FormControl>
                <Input placeholder="Ej: EQ001" {...field} maxLength={15} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="referencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencia*</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Equipo de carga" {...field} maxLength={120} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="clase_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clase</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una clase" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">Ninguna</SelectItem>
                  {equiposClase?.map((clase) => (
                    <SelectItem key={clase.id} value={clase.id}>
                      {clase.nombre}
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
          name="tipo_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">Ninguno</SelectItem>
                  {equiposTipo?.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="estado"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Estado</FormLabel>
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
    </div>
  );
};

export default EquipoFormFields;
