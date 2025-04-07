
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
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
import { Loader2 } from 'lucide-react';
import { tarifaFormSchema, TarifaFormValues } from './schema';
import { TerceroTarifa } from '@/types/terceroTarifa';
import { TarifaGeneral } from '@/types/tarifaGeneral';
import { UUID } from '@/types/common';

interface TerceroTarifaFormProps {
  terceroId: UUID;
  tarifasGenerales: TarifaGeneral[];
  onSubmit: (data: TarifaFormValues) => Promise<void>;
  initialData?: TerceroTarifa | null;
  loading: boolean;
  onCancel: () => void;
}

const TerceroTarifaForm: React.FC<TerceroTarifaFormProps> = ({
  terceroId,
  tarifasGenerales,
  onSubmit,
  initialData,
  loading,
  onCancel
}) => {
  const form = useForm<TarifaFormValues>({
    resolver: zodResolver(tarifaFormSchema),
    defaultValues: initialData
      ? {
          nombre: initialData.nombre,
          valor_tarifa: initialData.valor_tarifa,
          tarifa_general_id: initialData.tarifa_general_id,
        }
      : {
          nombre: '',
          valor_tarifa: 0,
          tarifa_general_id: undefined,
        },
  });

  const handleSubmit = async (data: TarifaFormValues) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                  <SelectItem value="">Ninguna</SelectItem>
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
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TerceroTarifaForm;
