
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EquipoClase, EquipoClaseFormValues } from "@/types/equipoClase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEquiposClase = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchEquiposClase = async (): Promise<EquipoClase[]> => {
    const { data, error } = await supabase
      .from("log_equipos_clase")
      .select("*")
      .order("nombre");

    if (error) {
      console.error("Error fetching equipment classes:", error);
      throw new Error(error.message);
    }

    return data;
  };

  const { data: equiposClase, isLoading, error } = useQuery({
    queryKey: ["equipos-clase"],
    queryFn: fetchEquiposClase,
  });

  const createEquipoClase = useMutation({
    mutationFn: async (values: EquipoClaseFormValues) => {
      const { data, error } = await supabase
        .from("log_equipos_clase")
        .insert([values])
        .select()
        .single();

      if (error) {
        console.error("Error creating equipment class:", error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos-clase"] });
      toast({
        title: "Clase de equipo creada",
        description: "La clase de equipo se ha creado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al crear la clase de equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateEquipoClase = useMutation({
    mutationFn: async ({ id, ...values }: EquipoClase) => {
      const { data, error } = await supabase
        .from("log_equipos_clase")
        .update(values)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating equipment class:", error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos-clase"] });
      toast({
        title: "Clase de equipo actualizada",
        description: "La clase de equipo se ha actualizado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar la clase de equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteEquipoClase = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("log_equipos_clase")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting equipment class:", error);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos-clase"] });
      toast({
        title: "Clase de equipo eliminada",
        description: "La clase de equipo se ha eliminado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar la clase de equipo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    equiposClase,
    isLoading,
    error,
    createEquipoClase,
    updateEquipoClase,
    deleteEquipoClase,
  };
};
