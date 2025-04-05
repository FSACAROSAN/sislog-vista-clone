
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Building2, AlertCircle } from 'lucide-react';
import { useEmpresas } from '@/hooks/useEmpresas';
import EmpresaTable from '@/components/empresa/EmpresaTable';
import { EmpresaEditDialog, EmpresaNewDialog } from '@/components/empresa';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog } from '@/components/ui/dialog';

const EmpresaPage = () => {
  const {
    empresas,
    loading,
    error,
    selectedEmpresa,
    openEditDialog,
    openNewDialog,
    setOpenEditDialog,
    setOpenNewDialog,
    handleDelete,
    handleEdit,
    handleFormSuccess,
    formatDate,
  } = useEmpresas();

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Empresa" 
        subtitle="Gestión de información de la empresa"
        icon={<Building2 size={24} />}
      />
      
      <div className="container py-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Empresas Registradas</CardTitle>
              <CardDescription>
                Lista de empresas en el sistema
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <EmpresaTable 
              empresas={empresas}
              isLoading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              formatDate={formatDate}
              onRefresh={handleFormSuccess}
              openNewDialog={() => setOpenNewDialog(true)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <EmpresaEditDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        empresa={selectedEmpresa}
        onSuccess={handleFormSuccess}
      />

      <EmpresaNewDialog
        open={openNewDialog}
        onOpenChange={setOpenNewDialog}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default EmpresaPage;
