
import React from "react";
import { Control } from "react-hook-form";
import {
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
import { TerceroFormValues } from "../schema";
import { TipoDocumento } from "@/types/tercero";

interface DocumentoFieldsProps {
  control: Control<TerceroFormValues>;
  tiposDocumento: TipoDocumento[];
  loading?: boolean;
}

const DocumentoFields: React.FC<DocumentoFieldsProps> = ({
  control,
  tiposDocumento,
  loading,
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="tipo_documento_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Documento *</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un tipo de documento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tiposDocumento.map((tipo) => (
                  <SelectItem
                    key={tipo.tipo_documento_id}
                    value={tipo.tipo_documento_id}
                  >
                    {tipo.nombre} ({tipo.sigla})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <FormField
            control={control}
            name="documento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento *</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-1">
          <FormField
            control={control}
            name="dv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DV</FormLabel>
                <FormControl>
                  <Input disabled={loading} maxLength={1} placeholder="DV" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentoFields;
