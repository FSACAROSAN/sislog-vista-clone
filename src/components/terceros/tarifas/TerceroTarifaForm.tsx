
import React, { useEffect, useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';

interface TerceroTarifaFormProps {
  terceroId: UUID;
  tarifasGenerales: TarifaGeneral[];
  onSubmit: (data: TarifaFormValues) => Promise<void>;
  initialData?: TerceroTarifa | null;
  loading: boolean;
  onCancel: () => void;
  existingTarifas: TerceroTarifa[];
}

const TerceroTarifaForm: React.FC<TerceroTarifaFormProps> = ({
  terceroId,
  tarifasGenerales,
  onSubmit,
  initialData,
  loading,
  onCancel,
  existingTarifas
}) => {
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  // Efecto para actualizar el nombre cuando se selecciona una tarifa general
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'tarifa_general_id' && value.tarifa_general_id && value.tarifa_general_id !== 'ninguna') {
        const tarifaSeleccionada = tarifasGenerales.find(t => t.id === value.tarifa_general_id);
        if (tarifaSeleccionada) {
          form.setValue('nombre', tarifaSeleccionada.nombre);
        }
        
        // Clear any previous submit errors when tarifa changes
        setSubmitError(null);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, tarifasGenerales]);

  // Función para formatear el valor como moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = async (data: TarifaFormValues) => {
    // Check if this is a duplicate tarifa_general_id
    if (data.tarifa_general_id && data.tarifa_general_id !== 'ninguna') {
      const isDuplicate = existingTarifas.some(
        tarifa => 
          tarifa.tarifa_general_id === data.tarifa_general_id && 
          (!initialData || tarifa.id !== initialData.id)
      );

      if (isDuplicate) {
        setSubmitError('Este tercero ya tiene asignada esta tarifa general.');
        toast({
          title: 'Error',
          description: 'Este tercero ya tiene asignada esta tarifa general.',
          variant: 'destructive',
        });
        return;
      }
    }

    setSubmitError(null);
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {submitError && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {submitError}
          </div>
        )}

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
