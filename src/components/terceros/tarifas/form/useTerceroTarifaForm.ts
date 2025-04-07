
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { 
  TarifaFormValues, 
  createTarifaFormSchemaWithValidation 
} from '../schema';
import { TerceroTarifa } from '@/types/terceroTarifa';
import { TarifaGeneral } from '@/types/tarifaGeneral';

/**
 * Props for the useTerceroTarifaForm hook
 */
export interface UseTerceroTarifaFormProps {
  initialData?: TerceroTarifa | null;
  tarifasGenerales: TarifaGeneral[];
  existingTarifas: TerceroTarifa[];
  onSubmit: (data: TarifaFormValues) => Promise<void>;
}

/**
 * Custom hook for managing the tercero tarifa form
 * Handles form state, validation, and submission
 */
const useTerceroTarifaForm = ({
  initialData,
  tarifasGenerales,
  existingTarifas,
  onSubmit,
}: UseTerceroTarifaFormProps) => {
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Create a schema with validation against existing tarifas
  const schema = createTarifaFormSchemaWithValidation(
    existingTarifas,
    initialData?.id
  );

  // Initialize the form with react-hook-form
  const form = useForm<TarifaFormValues>({
    resolver: zodResolver(schema),
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

  /**
   * Format a number as Colombian currency
   */
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Effect to update the nombre when a tarifa_general_id is selected
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

  /**
   * Handle form submission
   */
  const handleSubmit = async (data: TarifaFormValues) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
    } catch (error: any) {
      setSubmitError(error.message || 'Error al guardar la tarifa');
      toast({
        title: 'Error',
        description: error.message || 'Error al guardar la tarifa',
        variant: 'destructive',
      });
    }
  };

  return {
    form,
    submitError,
    formatCurrency,
    handleSubmit,
  };
};

export default useTerceroTarifaForm;
