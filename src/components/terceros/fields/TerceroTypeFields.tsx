
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { TerceroFormValues } from "../schema";

interface TerceroTypeFieldsProps {
  control: Control<TerceroFormValues>;
  loading?: boolean;
}

const TerceroTypeFields: React.FC<TerceroTypeFieldsProps> = ({
  control,
  loading,
}) => {
  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-lg font-medium mb-4">Tipo de Tercero</h3>

      <div className="flex flex-wrap gap-6">
        <FormField
          control={control}
          name="cliente"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={loading}
                />
              </FormControl>
              <FormLabel className="cursor-pointer">Cliente</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="transporte"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={loading}
                />
              </FormControl>
              <FormLabel className="cursor-pointer">Transporte</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="proveedor"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={loading}
                />
              </FormControl>
              <FormLabel className="cursor-pointer">Proveedor</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="conductor"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={loading}
                />
              </FormControl>
              <FormLabel className="cursor-pointer">Conductor</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TerceroTypeFields;
