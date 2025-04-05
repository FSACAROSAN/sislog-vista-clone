
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/empresa';
import { useToast } from '@/hooks/use-toast';
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

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  correo: z.string().email({ message: 'Correo electrónico inválido' }).optional().or(z.literal('')),
  telefono: z.string().optional().or(z.literal('')),
  estado: z.string().default('Activo'),
});

type FormValues = z.infer<typeof formSchema>;

interface EmpresaFormProps {
  empresa?: Empresa | null;
  onSuccess?: () => void;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({ empresa, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const defaultValues: FormValues = {
    nombre: empresa?.nombre || '',
    correo: empresa?.correo || '',
    telefono: empresa?.telefono || '',
    estado: empresa?.estado || 'Activo',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      if (empresa?.id) {
        // Update existing empresa
        const { error } = await supabase
          .from('empresas')
          .update({
            nombre: values.nombre,
            correo: values.correo || null,
            telefono: values.telefono || null,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          })
          .eq('id', empresa.id);

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Empresa actualizada correctamente',
        });
      } else {
        // Create new empresa
        const { error } = await supabase
          .from('empresas')
          .insert({
            nombre: values.nombre,
            correo: values.correo || null,
            telefono: values.telefono || null,
            estado: values.estado,
          });

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Empresa creada correctamente',
        });
      }

      form.reset();
      onSuccess?.();

    } catch (error: any) {
      console.error('Error saving empresa:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al guardar la empresa',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la empresa*</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el nombre de la empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="correo@empresa.com" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              empresa?.id ? 'Actualizar empresa' : 'Crear empresa'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmpresaForm;
