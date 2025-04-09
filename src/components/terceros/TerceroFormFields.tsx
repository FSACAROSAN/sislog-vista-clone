
import React, { useEffect, useRef } from "react";
import { Control } from "react-hook-form";
import { TerceroFormValues } from "./schema";
import { TipoDocumento } from "@/types/tercero";
import DocumentoFields from "./fields/DocumentoFields";
import BasicInfoFields from "./fields/BasicInfoFields";
import ContactInfoFields from "./fields/ContactInfoFields";
import ContactPersonFields from "./fields/ContactPersonFields";
import TerceroTypeFields from "./fields/TerceroTypeFields";
import EstadoField from "./fields/EstadoField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Phone } from "lucide-react";

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
  // Reference to the select element
  const tipoDocumentoRef = useRef<HTMLButtonElement>(null);

  // Set focus on the tipo_documento select when component mounts
  useEffect(() => {
    // Short timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      if (tipoDocumentoRef.current) {
        tipoDocumentoRef.current.focus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Tabs defaultValue="datos-generales" className="w-full">
      <TabsList className="mb-4 w-full">
        <TabsTrigger value="datos-generales" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Datos Generales
        </TabsTrigger>
        <TabsTrigger value="datos-contacto" className="flex items-center">
          <Phone className="mr-2 h-4 w-4" />
          Datos de Contacto
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="datos-generales" className="space-y-4">
        {/* Documento fields in one line */}
        <DocumentoFields 
          control={control} 
          tiposDocumento={tiposDocumento} 
          loading={loading} 
          tipoDocumentoRef={tipoDocumentoRef}
        />
        
        {/* Modified layout for basic info */}
        <div className="grid grid-cols-1 gap-4">
          {/* Nombre in single line */}
          <div className="col-span-1">
            <BasicInfoFields 
              control={control} 
              loading={loading} 
              layout="single-line"
            />
          </div>
          
          {/* Contact info with telefono_1 and telefono_2 side by side */}
          <div className="col-span-1">
            <ContactInfoFields 
              control={control} 
              loading={loading} 
              layout="side-by-side"
            />
          </div>
        </div>
        
        {/* Tipo tercero and Estado */}
        <div className="border-t pt-4 mt-2">
          <TerceroTypeFields control={control} loading={loading} />
          <EstadoField control={control} loading={loading} />
        </div>
      </TabsContent>
      
      <TabsContent value="datos-contacto" className="space-y-4">
        <ContactPersonFields 
          control={control} 
          loading={loading}
          layout="contact-tab"
        />
      </TabsContent>
    </Tabs>
  );
};

export default TerceroFormFields;
