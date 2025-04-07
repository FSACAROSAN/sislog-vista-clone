
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TerceroFormValues } from "./schema";
import { TipoDocumento } from "@/types/tercero";

interface TerceroFormFieldsProps {
  control: Control<TerceroFormValues>;
  tiposDocumento: TipoDocumento[];
  loading?: boolean;
}

const TerceroFormFields: React.FC<TerceroFormFieldsProps> = ({
  control,
  tiposDocumento,
  loading,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-4">Datos de Contacto</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="nombre_contacto"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
            <FormItem>
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

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-4">Tipo de Tercero</h3>

        <div className="flex space-x-6">
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
        </div>
      </div>

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
    </div>
  );
};

export default TerceroFormFields;
