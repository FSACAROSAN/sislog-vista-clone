
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

interface EstadoFieldProps {
  control: Control<TerceroFormValues>;
  loading?: boolean;
}

const EstadoField: React.FC<EstadoFieldProps> = ({
  control,
  loading,
}) => {
  return (
    <FormField
      control={control}
      name="estado"
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={loading}
            />
          </FormControl>
          <FormLabel className="cursor-pointer">Activo</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default EstadoField;
