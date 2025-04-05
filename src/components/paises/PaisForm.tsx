
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Pais } from '@/types/pais';
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
  nombre_es: z.string().min(2, { message: 'El nombre en español debe tener al menos 2 caracteres' }),
  nombre_en: z.string().min(2, { message: 'El nombre en inglés debe tener al menos 2 caracteres' }),
  iso2: z.string().length(2, { message: 'El código ISO2 debe tener exactamente 2 caracteres' }),
  iso3: z.string().length(3, { message: 'El código ISO3 debe tener exactamente 3 caracteres' }),
  codigo: z.coerce.number().int().positive({ message: 'El código debe ser un número positivo' }),
  estado: z.string().default('Activo'),
});

type FormValues = z.infer<typeof formSchema>;

interface PaisFormProps {
  pais?: Pais | null;
  onSuccess?: () => void;
}

const PaisForm: React.FC<PaisFormProps> = ({ pais, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const defaultValues: FormValues = {
    nombre_es: pais?.nombre_es || '',
    nombre_en: pais?.nombre_en || '',
    iso2: pais?.iso2 || '',
    iso3: pais?.iso3 || '',
    codigo: pais?.codigo || 0,
    estado: pais?.estado || 'Activo',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      if (pais?.id) {
        // Update existing país
        const { error } = await supabase
          .from('paises')
          .update({
            nombre_es: values.nombre_es,
            nombre_en: values.nombre_en,
            iso2: values.iso2.toUpperCase(),
            iso3: values.iso3.toUpperCase(),
            codigo: values.codigo,
            estado: values.estado,
            updated_at: new Date().toISOString(),
          })
          .eq('id', pais.id);

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'País actualizado correctamente',
        });
      } else {
        // Create new país
        const { error } = await supabase
          .from('paises')
          .insert({
            nombre_es: values.nombre_es,
            nombre_en: values.nombre_en,
            iso2: values.iso2.toUpperCase(),
            iso3: values.iso3.toUpperCase(),
            codigo: values.codigo,
            estado: values.estado,
          });

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'País creado correctamente',
        });
      }

      form.reset();
      onSuccess?.();

    } catch (error: any) {
      console.error('Error saving país:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al guardar el país',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre_es"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre en Español*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Colombia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nombre_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre en Inglés*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Colombia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="iso2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código ISO2*</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ej: CO" 
                    {...field} 
                    maxLength={2}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="iso3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código ISO3*</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ej: COL" 
                    {...field} 
                    maxLength={3}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código telefónico*</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Ej: 57" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
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
              pais?.id ? 'Actualizar país' : 'Crear país'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaisForm;
