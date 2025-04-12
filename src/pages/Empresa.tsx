
import React, { memo, useCallback, useMemo, Suspense, lazy } from 'react';
import PageHeader from '@/components/PageHeader';
import { Building2, AlertCircle } from 'lucide-react';
import { useEmpresas } from '@/hooks/useEmpresas';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Lazy load components to reduce initial bundle size
const EmpresaTable = lazy(() => import('@/components/empresa/EmpresaTable'));
const EmpresaEditDialog = lazy(() => import('@/components/empresa/EmpresaEditDialog'));
const EmpresaNewDialog = lazy(() => import('@/components/empresa/EmpresaNewDialog'));

// Fallback loading component for suspense
const TableLoadingFallback = () => (
  <div className="flex justify-center p-8">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

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

  // Memoize the error content to prevent unnecessary re-renders
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

  // Memoize table props to prevent unnecessary re-renders
  const tableProps = useMemo(() => ({
    empresas,
    isLoading: loading,
    onEdit: handleEdit,
    onDelete: handleDelete,
    formatDate,
    onRefresh: handleFormSuccess,
    openNewDialog: handleOpenNewDialog
  }), [empresas, loading, handleEdit, handleDelete, formatDate, handleFormSuccess, handleOpenNewDialog]);

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
            <Suspense fallback={<TableLoadingFallback />}>
              <EmpresaTable {...tableProps} />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Only mount dialogs when needed using Suspense */}
      {openEditDialog && selectedEmpresa && (
        <Suspense fallback={null}>
          <EmpresaEditDialog 
            open={openEditDialog} 
            onOpenChange={setOpenEditDialog} 
            empresa={selectedEmpresa} 
            onSuccess={handleFormSuccess} 
          />
        </Suspense>
      )}

      {openNewDialog && (
        <Suspense fallback={null}>
          <EmpresaNewDialog 
            open={openNewDialog} 
            onOpenChange={setOpenNewDialog} 
            onSuccess={handleFormSuccess} 
          />
        </Suspense>
      )}
    </div>
  );
});

EmpresaPage.displayName = 'EmpresaPage';
export default EmpresaPage;
