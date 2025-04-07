
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { terceroFormSchema, TerceroFormValues } from "./schema";
import { Tercero } from "@/types/tercero";

type UseTerceroFormProps = {
  onSuccess: () => void;
  initialData?: Tercero | null;
};

export const useTerceroForm = ({ onSuccess, initialData }: UseTerceroFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<TerceroFormValues>({
    resolver: zodResolver(terceroFormSchema),
    defaultValues: initialData 
      ? {
          ...initialData,
          tipo_documento_id: initialData.tipo_documento_id || "",
          cliente: initialData.cliente || false,
          transporte: initialData.transporte || false,
          proveedor: initialData.proveedor || false,
          estado: initialData.estado !== false,
        }
      : {
          nombre: "",
          documento: "",
          dv: "",
          direccion: "",
          email_tercero: "",
          telefono_1_tercero: "",
          telefono_2_tercero: "",
          nombre_contacto: "",
          telefono_contacto: "",
          email_contacto: "",
          cliente: false,
          transporte: false,
          proveedor: false,
          estado: true,
          tipo_documento_id: "",
        },
  });

  const onSubmit = async (data: TerceroFormValues) => {
    try {
      setLoading(true);

      if (initialData?.id) {
        // Update existing tercero
        const { error } = await supabase
          .from("ge_tercero")
          .update({
            nombre: data.nombre,
            documento: data.documento,
            dv: data.dv || null,
            direccion: data.direccion || null,
            email_tercero: data.email_tercero || null,
            telefono_1_tercero: data.telefono_1_tercero || null,
            telefono_2_tercero: data.telefono_2_tercero || null,
            nombre_contacto: data.nombre_contacto || null,
            telefono_contacto: data.telefono_contacto || null,
            email_contacto: data.email_contacto || null,
            cliente: data.cliente,
            transporte: data.transporte,
            proveedor: data.proveedor,
            estado: data.estado,
            tipo_documento_id: data.tipo_documento_id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", initialData.id);

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Tercero actualizado correctamente",
        });
      } else {
        // Create new tercero
        const { error } = await supabase.from("ge_tercero").insert({
          nombre: data.nombre,
          documento: data.documento,
          dv: data.dv || null,
          direccion: data.direccion || null,
          email_tercero: data.email_tercero || null,
          telefono_1_tercero: data.telefono_1_tercero || null,
          telefono_2_tercero: data.telefono_2_tercero || null,
          nombre_contacto: data.nombre_contacto || null,
          telefono_contacto: data.telefono_contacto || null,
          email_contacto: data.email_contacto || null,
          cliente: data.cliente,
          transporte: data.transporte,
          proveedor: data.proveedor,
          estado: data.estado,
          tipo_documento_id: data.tipo_documento_id,
        });

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Tercero creado correctamente",
        });
      }

      onSuccess();
      form.reset();
    } catch (error: any) {
      console.error("Error saving tercero:", error);
      toast({
        title: "Error",
        description: error.message || "Error al guardar el tercero",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    loading,
  };
};
