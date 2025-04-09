
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
import { Textarea } from "@/components/ui/textarea";
import { TerceroFormValues } from "../schema";

interface BasicInfoFieldsProps {
  control: Control<TerceroFormValues>;
  loading?: boolean;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  control,
  loading,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="dv"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Textarea disabled={loading} placeholder="Dirección" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoFields;
