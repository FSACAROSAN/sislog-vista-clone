
import React from 'react';
import { Form } from '@/components/ui/form';
import { TarifaFormValues } from './schema';
import { TerceroTarifa } from '@/types/terceroTarifa';
import { TarifaGeneral } from '@/types/tarifaGeneral';
import { UUID } from '@/types/common';

import {
  TarifaGeneralSelect,
  TarifaNombreInput,
  TarifaValorInput,
  FormErrorMessage,
  FormActions,
  useTerceroTarifaForm
} from './form';

/**
 * Props for the TerceroTarifaForm component
 */
interface TerceroTarifaFormProps {
  terceroId: UUID;
  tarifasGenerales: TarifaGeneral[];
  onSubmit: (data: TarifaFormValues) => Promise<void>;
  initialData?: TerceroTarifa | null;
  loading: boolean;
  onCancel: () => void;
  existingTarifas: TerceroTarifa[];
}

/**
 * Form component for creating or editing a tercero tarifa
 * Manages the form state and submission for tarifa data
 */
const TerceroTarifaForm: React.FC<TerceroTarifaFormProps> = ({
  tarifasGenerales,
  onSubmit,
  initialData,
  loading,
  onCancel,
  existingTarifas
}) => {
  // Use the custom hook to manage form state and logic
  const { form, submitError, formatCurrency, handleSubmit } = useTerceroTarifaForm({
    initialData,
    tarifasGenerales,
    existingTarifas,
    onSubmit,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Display form-level error messages */}
        <FormErrorMessage message={submitError} />

        {/* Select for tarifa general */}
        <TarifaGeneralSelect 
          form={form} 
          tarifasGenerales={tarifasGenerales} 
          loading={loading} 
        />

        {/* Input for tarifa name */}
        <TarifaNombreInput form={form} loading={loading} />

        {/* Input for tarifa value */}
        <TarifaValorInput 
          form={form} 
          loading={loading} 
          formatCurrency={formatCurrency} 
        />

        {/* Form action buttons */}
        <FormActions onCancel={onCancel} loading={loading} />
      </form>
    </Form>
  );
};

export default TerceroTarifaForm;
