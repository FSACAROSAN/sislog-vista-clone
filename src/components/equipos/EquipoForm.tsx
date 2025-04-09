
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { equipoFormSchema, EquipoFormValues } from './schema';
import EquipoFormFields from './EquipoFormFields';
import { Equipo } from '@/types/equipo';
import { useEquipos } from '@/hooks/useEquipos';
import { useEquiposClase } from '@/hooks/useEquiposClase';
import { useEquiposTipo } from '@/hooks/useEquiposTipo';

interface EquipoFormProps {
  equipo?: Equipo | null;
  onSuccess: () => void;
}

const EquipoForm: React.FC<EquipoFormProps> = ({ equipo, onSuccess }) => {
  const { toast } = useToast();
  const { createEquipo, updateEquipo } = useEquipos();
  const { equiposClase } = useEquiposClase();
  const { equiposTipo } = useEquiposTipo();
  const isEditing = Boolean(equipo?.id);

  const form = useForm<EquipoFormValues>({
    resolver: zodResolver(equipoFormSchema),
    defaultValues: isEditing
      ? {
          codigo: equipo?.codigo || '',
          referencia: equipo?.referencia || '',
          estado: equipo?.estado !== undefined ? equipo.estado : true,
          clase_id: equipo?.clase_id || null,
          tipo_id: equipo?.tipo_id || null,
        }
      : {
          codigo: '',
          referencia: '',
          estado: true,
          clase_id: null,
          tipo_id: null,
        },
  });

  const onSubmit = async (values: EquipoFormValues) => {
    try {
      if (isEditing && equipo) {
        // Fix for type error - explicitly define the update object with required fields
        // Ensure all required fields from EquipoFormValues are assigned non-optional values
        await updateEquipo.mutateAsync({
          id: equipo.id,
          codigo: values.codigo, // This is required by EquipoFormValues
          referencia: values.referencia, // This is required by EquipoFormValues
          estado: values.estado, 
          clase_id: values.clase_id,
          tipo_id: values.tipo_id,
          // Preserve other fields from the original equipo if needed
          created_at: equipo.created_at,
          updated_at: equipo.updated_at
        });
      } else {
        await createEquipo.mutateAsync(values);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving equipo:', error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EquipoFormFields 
          equiposClase={equiposClase || []} 
          equiposTipo={equiposTipo || []} 
        />
        
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={createEquipo.isPending || updateEquipo.isPending}
          >
            {isEditing ? 'Guardar cambios' : 'Crear equipo'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EquipoForm;
