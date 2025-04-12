
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
import { Textarea } from "@/components/ui/textarea";
import { TerceroFormValues } from "../schema";

interface BasicInfoFieldsProps {
  control: Control<TerceroFormValues>;
  loading?: boolean;
  layout?: "default" | "single-line";
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = memo(({
  control,
  loading,
  layout = "default",
}) => {
  if (layout === "single-line") {
    return (
      <>
        <FormField
          control={control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="direccion"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Textarea 
                  disabled={loading} 
                  placeholder="Dirección" 
                  {...field} 
                  className="min-h-[36px]" 
                  rows={1} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={control}
          name="dv"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Dígito de Verificación</FormLabel>
              <FormControl>
                <Input disabled={loading} maxLength={1} placeholder="DV" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="direccion"
        render={({ field }) => (
          <FormItem className="space-y-0.5">
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Textarea 
                disabled={loading} 
                placeholder="Dirección" 
                {...field} 
                className="min-h-[36px]" 
                rows={1}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
});

BasicInfoFields.displayName = "BasicInfoFields";

export default BasicInfoFields;
