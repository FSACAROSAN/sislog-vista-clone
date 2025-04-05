
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the form schema with validation
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  correo: z.string().email("Correo electrónico inválido").optional().or(z.literal("")),
  telefono: z.string().optional(),
  estado: z.string().default("Activo")
});

type FormValues = z.infer<typeof formSchema>;

interface EmpresaFormProps {
  empresa?: {
    id: string;
    nombre: string;
    correo: string | null;
    telefono: string | null;
    estado: string | null;
  } | null;
  onSubmitSuccess: () => void;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({ empresa, onSubmitSuccess }) => {
  const { toast } = useToast();
  
  // Initialize form with default values or existing company data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: empresa?.nombre || "",
      correo: empresa?.correo || "",
      telefono: empresa?.telefono || "",
      estado: empresa?.estado || "Activo"
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (empresa) {
        // Update existing company
        const { error } = await supabase
          .from('empresas')
          .update({
            nombre: values.nombre,
            correo: values.correo || null,
            telefono: values.telefono || null,
            estado: values.estado,
            updated_at: new Date().toISOString()
          })
          .eq('id', empresa.id);

        if (error) throw error;

        toast({
          title: "Empresa actualizada",
          description: "La empresa ha sido actualizada correctamente"
        });
      } else {
        // Create new company
        const { error } = await supabase
          .from('empresas')
          .insert({
            nombre: values.nombre,
            correo: values.correo || null,
            telefono: values.telefono || null,
            estado: values.estado,
            fecha_creacion: new Date().toISOString()
          });

        if (error) throw error;

        toast({
          title: "Empresa creada",
          description: "La empresa ha sido creada correctamente"
        });
      }

      // Reset form and notify parent component
      form.reset();
      onSubmitSuccess();
    } catch (error) {
      console.error('Error saving empresa:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la empresa",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="correo@empresa.com" {...field} value={field.value || ""} />
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
                <Input placeholder="Teléfono de contacto" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onSubmitSuccess}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {empresa ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmpresaForm;
