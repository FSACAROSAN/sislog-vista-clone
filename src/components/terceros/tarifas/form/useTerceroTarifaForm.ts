
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { TarifaFormValues, tarifaFormSchema } from '../schema';
import { TerceroTarifa } from '@/types/terceroTarifa';
import { TarifaGeneral } from '@/types/tarifaGeneral';

export interface UseTerceroTarifaFormProps {
  initialData?: TerceroTarifa | null;
  tarifasGenerales: TarifaGeneral[];
  existingTarifas: TerceroTarifa[];
  onSubmit: (data: TarifaFormValues) => Promise<void>;
}

const useTerceroTarifaForm = ({
  initialData,
  tarifasGenerales,
  existingTarifas,
  onSubmit,
}: UseTerceroTarifaFormProps) => {
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

  // Función para formatear el valor como moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

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

  return {
    form,
    submitError,
    formatCurrency,
    handleSubmit,
  };
};

export default useTerceroTarifaForm;
