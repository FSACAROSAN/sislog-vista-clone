
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EquipoTipo, EquipoTipoFormValues } from "@/types/equipoTipo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEquiposTipo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchEquiposTipo = async (): Promise<EquipoTipo[]> => {
    const { data, error } = await supabase
      .from("log_equipos_tipo")
      .select("*")
      .order("nombre");

    if (error) {
      console.error("Error fetching equipment types:", error);
      throw new Error(error.message);
    }

    return data as unknown as EquipoTipo[];
  };

  const { data: equiposTipo, isLoading, error } = useQuery({
    queryKey: ["equipos-tipo"],
    queryFn: fetchEquiposTipo,
  });

  const createEquipoTipo = useMutation({
    mutationFn: async (values: EquipoTipoFormValues) => {
      const { data, error } = await supabase
        .from("log_equipos_tipo")
        .insert([values])
        .select()
        .single();

      if (error) {
        console.error("Error creating equipment type:", error);
        throw new Error(error.message);
      }

      return data as unknown as EquipoTipo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos-tipo"] });
      toast({
        title: "Tipo de equipo creado",
        description: "El tipo de equipo se ha creado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al crear el tipo de equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateEquipoTipo = useMutation({
    mutationFn: async ({ id, ...values }: EquipoTipo) => {
      const { data, error } = await supabase
        .from("log_equipos_tipo")
        .update(values)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating equipment type:", error);
        throw new Error(error.message);
      }

      return data as unknown as EquipoTipo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos-tipo"] });
      toast({
        title: "Tipo de equipo actualizado",
        description: "El tipo de equipo se ha actualizado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar el tipo de equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteEquipoTipo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("log_equipos_tipo")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting equipment type:", error);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos-tipo"] });
      toast({
        title: "Tipo de equipo eliminado",
        description: "El tipo de equipo se ha eliminado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar el tipo de equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    equiposTipo,
    isLoading,
    error,
    createEquipoTipo,
    updateEquipoTipo,
    deleteEquipoTipo,
  };
};
