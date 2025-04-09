
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tercero } from '@/types/tercero';
import TerceroArticulosTable from './TerceroArticulosTable';
import { useTerceroArticulos } from '@/hooks/useTerceroArticulos';
import TerceroArticulosHeader from './TerceroArticulosHeader';

interface TerceroArticulosDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tercero: Tercero | null;
}

const TerceroArticulosDialog: React.FC<TerceroArticulosDialogProps> = ({
  isOpen,
  onClose,
  tercero
}) => {
  const {
    articulos,
    loading,
    selectedArticulo,
    setSelectedArticulo,
    isDialogOpen,
    setIsDialogOpen,
    fetchArticulos,
    handleDelete,
    totalItems,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = useTerceroArticulos(tercero?.id || '');

  // Close article form dialog when main dialog closes
  useEffect(() => {
    if (!isOpen) {
      setIsDialogOpen(false);
    }
  }, [isOpen, setIsDialogOpen]);

  if (!tercero) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Productos de {tercero.nombre}
          </DialogTitle>
          <DialogDescription>
            Administre los productos o artículos asociados a este tercero.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <TerceroArticulosHeader
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            selectedArticulo={selectedArticulo}
            setSelectedArticulo={setSelectedArticulo}
            onSuccess={fetchArticulos}
            terceroId={tercero.id}
          />

          <TerceroArticulosTable
            articulos={articulos}
            loading={loading}
            onEdit={(articulo) => {
              setSelectedArticulo(articulo);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
            totalItems={totalItems}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerceroArticulosDialog;
