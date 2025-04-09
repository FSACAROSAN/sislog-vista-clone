
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Equipo, EquipoFormValues } from "@/types/equipo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEquipos = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchEquipos = async (): Promise<Equipo[]> => {
    const { data, error } = await supabase
      .from("log_equipos")
      .select(`
        *,
        clase:clase_id(id, nombre),
        tipo:tipo_id(id, nombre)
      `)
      .order("codigo");

    if (error) {
      console.error("Error fetching equipos:", error);
      throw new Error(error.message);
    }

    return data as unknown as Equipo[];
  };

  const { data: equipos, isLoading, error } = useQuery({
    queryKey: ["equipos"],
    queryFn: fetchEquipos,
  });

  const createEquipo = useMutation({
    mutationFn: async (values: EquipoFormValues) => {
      const { data, error } = await supabase
        .from("log_equipos")
        .insert([values])
        .select()
        .single();

      if (error) {
        console.error("Error creating equipo:", error);
        throw new Error(error.message);
      }

      return data as unknown as Equipo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
      toast({
        title: "Equipo creado",
        description: "El equipo se ha creado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al crear el equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateEquipo = useMutation({
    mutationFn: async ({ id, ...values }: Equipo) => {
      const { data, error } = await supabase
        .from("log_equipos")
        .update(values)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating equipo:", error);
        throw new Error(error.message);
      }

      return data as unknown as Equipo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
      toast({
        title: "Equipo actualizado",
        description: "El equipo se ha actualizado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar el equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteEquipo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("log_equipos")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting equipo:", error);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
      toast({
        title: "Equipo eliminado",
        description: "El equipo se ha eliminado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar el equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    equipos,
    isLoading,
    error,
    createEquipo,
    updateEquipo,
    deleteEquipo,
  };
};
