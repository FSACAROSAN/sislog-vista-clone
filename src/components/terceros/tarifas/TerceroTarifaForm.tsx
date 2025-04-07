
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
  tarifasGenerales,
  onSubmit,
  initialData,
  loading,
  onCancel,
  existingTarifas
}) => {
  const { form, submitError, formatCurrency, handleSubmit } = useTerceroTarifaForm({
    initialData,
    tarifasGenerales,
    existingTarifas,
    onSubmit,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormErrorMessage message={submitError} />

        <TarifaGeneralSelect 
          form={form} 
          tarifasGenerales={tarifasGenerales} 
          loading={loading} 
        />

        <TarifaNombreInput form={form} loading={loading} />

        <TarifaValorInput 
          form={form} 
          loading={loading} 
          formatCurrency={formatCurrency} 
        />

        <FormActions onCancel={onCancel} loading={loading} />
      </form>
    </Form>
  );
};

export default TerceroTarifaForm;
