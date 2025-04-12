
import React, { memo, useCallback, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import { Building2, AlertCircle } from 'lucide-react';
import { useEmpresas } from '@/hooks/useEmpresas';
import EmpresaTable from '@/components/empresa/EmpresaTable';
import { EmpresaEditDialog, EmpresaNewDialog } from '@/components/empresa';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Optimize the component with memoization
const EmpresaPage = memo(() => {
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
    formatDate
  } = useEmpresas();

  const handleOpenNewDialog = useCallback(() => {
    setOpenNewDialog(true);
  }, [setOpenNewDialog]);

  // Memoize the content to prevent unnecessary re-renders
  const errorContent = useMemo(() => {
    if (!error) return null;
    
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }, [error]);

  const tableContent = useMemo(() => (
    <EmpresaTable 
      empresas={empresas} 
      isLoading={loading} 
      onEdit={handleEdit} 
      onDelete={handleDelete} 
      formatDate={formatDate} 
      onRefresh={handleFormSuccess} 
      openNewDialog={handleOpenNewDialog} 
    />
  ), [empresas, loading, handleEdit, handleDelete, formatDate, handleFormSuccess, handleOpenNewDialog]);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Empresa" subtitle="Gestión de información de la empresa" icon={<Building2 size={24} />} />
      
      <div className="container py-4">
        {errorContent}
        
        <Card className="mb-4 shadow-sm">
          <CardHeader className="py-3">
            <div></div>
          </CardHeader>
          <CardContent>
            {tableContent}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs - Only render when needed */}
      {openEditDialog && selectedEmpresa && (
        <EmpresaEditDialog 
          open={openEditDialog} 
          onOpenChange={setOpenEditDialog} 
          empresa={selectedEmpresa} 
          onSuccess={handleFormSuccess} 
        />
      )}

      {openNewDialog && (
        <EmpresaNewDialog 
          open={openNewDialog} 
          onOpenChange={setOpenNewDialog} 
          onSuccess={handleFormSuccess} 
        />
      )}
    </div>
  );
});

EmpresaPage.displayName = 'EmpresaPage';
export default EmpresaPage;
