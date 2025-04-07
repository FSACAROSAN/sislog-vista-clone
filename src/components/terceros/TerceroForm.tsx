
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTerceroForm } from "./useTerceroForm";
import TerceroFormFields from "./TerceroFormFields";
import { Tercero } from "@/types/tercero";
import { useTiposDocumento } from "@/hooks/useTiposDocumento";

interface TerceroFormProps {
  onSuccess: () => void;
  initialData?: Tercero | null;
}

const TerceroForm: React.FC<TerceroFormProps> = ({
  onSuccess,
  initialData,
}) => {
  const { form, onSubmit, loading } = useTerceroForm({
    onSuccess,
    initialData,
  });

  const { tiposDocumento, loading: loadingTiposDocumento } = useTiposDocumento();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <TerceroFormFields 
            control={form.control} 
            tiposDocumento={tiposDocumento} 
            loading={loading || loadingTiposDocumento} 
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TerceroForm;
