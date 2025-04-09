
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
import FormActions from '@/components/terceros/tarifas/form/FormActions';

interface EquipoFormProps {
  equipo?: Equipo | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const EquipoForm: React.FC<EquipoFormProps> = ({ equipo, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const { createEquipo, updateEquipo } = useEquipos();
  const { equiposClase } = useEquiposClase();
  const { equiposTipo } = useEquiposTipo();
  const isEditing = Boolean(equipo?.id);
  const loading = createEquipo.isPending || updateEquipo.isPending;

  const form = useForm<EquipoFormValues>({
    resolver: zodResolver(equipoFormSchema),
    defaultValues: isEditing && equipo
      ? {
          codigo: equipo.codigo || '',
          referencia: equipo.referencia || '',
          estado: equipo.estado !== undefined ? equipo.estado : true,
          clase_id: equipo.clase_id || null,
          tipo_id: equipo.tipo_id || null,
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
        const equipoUpdate: Equipo = {
          id: equipo.id,
          codigo: values.codigo,
          referencia: values.referencia,
          estado: values.estado,
          clase_id: values.clase_id,
          tipo_id: values.tipo_id,
          created_at: equipo.created_at,
          updated_at: equipo.updated_at
        };
        
        await updateEquipo.mutateAsync(equipoUpdate);
      } else {
        await createEquipo.mutateAsync({
          codigo: values.codigo,
          referencia: values.referencia,
          estado: values.estado,
          clase_id: values.clase_id,
          tipo_id: values.tipo_id
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving equipo:', error);
      toast({
        title: "Error",
        description: `Error al ${isEditing ? 'actualizar' : 'crear'} el equipo`,
        variant: "destructive",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" onClick={(e) => e.stopPropagation()}>
        <EquipoFormFields 
          equiposClase={equiposClase || []} 
          equiposTipo={equiposTipo || []} 
        />
        
        <FormActions
          onCancel={onCancel}
          loading={loading}
          submitText={isEditing ? 'Guardar cambios' : 'Crear equipo'}
        />
      </form>
    </FormProvider>
  );
};

export default EquipoForm;
