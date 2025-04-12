
import React, { memo } from "react";
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
  tipoDocumentoRef?: React.RefObject<HTMLButtonElement>;
}

const DocumentoFields: React.FC<DocumentoFieldsProps> = memo(({
  control,
  tiposDocumento,
  loading,
  tipoDocumentoRef,
}) => {
  return (
    <div className="space-y-1">
      <FormField
        control={control}
        name="tipo_documento_id"
        render={({ field }) => (
          <FormItem className="space-y-0.5">
            <FormLabel className="text-xs">Tipo de Documento *</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger ref={tipoDocumentoRef} className="h-7 text-xs">
                  <SelectValue placeholder="Seleccione un tipo de documento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tiposDocumento.map((tipo) => (
                  <SelectItem
                    key={tipo.tipo_documento_id}
                    value={tipo.tipo_documento_id}
                    className="text-xs h-7"
                  >
                    {tipo.nombre} ({tipo.sigla})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="col-span-2">
          <FormField
            control={control}
            name="documento"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel className="text-xs">Documento *</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Documento" {...field} className="h-7 text-xs" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-1">
          <FormField
            control={control}
            name="dv"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel className="text-xs">DV</FormLabel>
                <FormControl>
                  <Input disabled={loading} maxLength={1} placeholder="DV" {...field} className="h-7 text-xs" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
});

DocumentoFields.displayName = "DocumentoFields";

export default DocumentoFields;
