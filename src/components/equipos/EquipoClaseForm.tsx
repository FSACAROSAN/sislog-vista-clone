
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EquipoClase, EquipoClaseFormValues } from '@/types/equipoClase';
import { equipoClaseSchema } from './schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

interface EquipoClaseFormProps {
  defaultValues?: EquipoClase;
  onSubmit: (values: EquipoClaseFormValues) => void;
  isSubmitting: boolean;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
}

const EquipoClaseForm: React.FC<EquipoClaseFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
  onCancel,
}) => {
  const form = useForm<EquipoClaseFormValues>({
    resolver: zodResolver(equipoClaseSchema),
    defaultValues: defaultValues ? 
      {
        nombre: defaultValues.nombre,
        estado: defaultValues.estado
      } : 
      {
        nombre: '',
        estado: true
      }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nombre de la clase" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Activo
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel} type="button">
              {cancelText}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EquipoClaseForm;
