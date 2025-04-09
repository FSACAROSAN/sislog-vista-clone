
import React from "react";
import { Control } from "react-hook-form";
import { TerceroFormValues } from "./schema";
import { TipoDocumento } from "@/types/tercero";
import DocumentoFields from "./fields/DocumentoFields";
import BasicInfoFields from "./fields/BasicInfoFields";
import ContactInfoFields from "./fields/ContactInfoFields";
import ContactPersonFields from "./fields/ContactPersonFields";
import TerceroTypeFields from "./fields/TerceroTypeFields";
import EstadoField from "./fields/EstadoField";

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
      <DocumentoFields 
        control={control} 
        tiposDocumento={tiposDocumento} 
        loading={loading} 
      />
      
      <BasicInfoFields control={control} loading={loading} />
      
      <ContactInfoFields control={control} loading={loading} />
      
      <ContactPersonFields control={control} loading={loading} />
      
      <TerceroTypeFields control={control} loading={loading} />
      
      <EstadoField control={control} loading={loading} />
    </div>
  );
};

export default TerceroFormFields;
