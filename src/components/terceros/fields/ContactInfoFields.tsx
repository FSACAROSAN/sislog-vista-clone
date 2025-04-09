
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
import { TerceroFormValues } from "../schema";

interface ContactInfoFieldsProps {
  control: Control<TerceroFormValues>;
  loading?: boolean;
  layout?: "default" | "side-by-side";
}

const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({
  control,
  loading,
  layout = "default",
}) => {
  if (layout === "side-by-side") {
    return (
      <>
        <FormField
          control={control}
          name="email_tercero"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="email"
                  placeholder="Correo electrónico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="telefono_1_tercero"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Teléfono 1</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Teléfono 1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="telefono_2_tercero"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Teléfono 2</FormLabel>
                <FormControl>
                  <Input 
                    disabled={loading} 
                    placeholder="Teléfono 2" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="email_tercero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="email"
                  placeholder="Correo electrónico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="telefono_1_tercero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono 1</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Teléfono 1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="telefono_2_tercero"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teléfono 2</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Teléfono 2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactInfoFields;
