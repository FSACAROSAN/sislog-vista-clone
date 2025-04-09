
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

interface ContactPersonFieldsProps {
  control: Control<TerceroFormValues>;
  loading?: boolean;
  layout?: "default" | "contact-tab";
}

const ContactPersonFields: React.FC<ContactPersonFieldsProps> = ({
  control,
  loading,
  layout = "default",
}) => {
  if (layout === "contact-tab") {
    return (
      <div className="space-y-2.5">
        <h3 className="text-lg font-medium mb-2.5">Datos de Contacto</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="nombre_contacto"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel>Nombre del Contacto</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nombre del contacto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="telefono_contacto"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel>Teléfono del Contacto</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Teléfono del contacto"
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
          name="email_contacto"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Correo del Contacto</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="email"
                  placeholder="Correo del contacto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-lg font-medium mb-3">Datos de Contacto</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="nombre_contacto"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Nombre del Contacto</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Nombre del contacto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="telefono_contacto"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Teléfono del Contacto</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Teléfono del contacto"
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
        name="email_contacto"
        render={({ field }) => (
          <FormItem className="space-y-0.5">
            <FormLabel>Correo del Contacto</FormLabel>
            <FormControl>
              <Input
                disabled={loading}
                type="email"
                placeholder="Correo del contacto"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactPersonFields;
