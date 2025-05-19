
import { useReducer, useEffect, useCallback, useRef, useMemo } from 'react';
import { debounce } from 'lodash';
import { useToast } from '@/hooks/use-toast';
import { Empresa } from '@/types/empresa';
import { empresasReducer, initialState } from './empresa/empresaReducer';
import { fetchEmpresasFromDb, deleteEmpresaFromDb } from './empresa/empresaApi';
import { formatDate } from './empresa/empresaUtils';

export const useEmpresas = () => {
  const [state, dispatch] = useReducer(empresasReducer, initialState);
  const isMounted = useRef(true);
  const { toast } = useToast();
  const isProcessingRef = useRef(false);

  // Fetch empresas from the database
  const fetchEmpresas = useCallback(async () => {
    if (!isMounted.current || isProcessingRef.current) return;
    
    try {
      isProcessingRef.current = true;
      dispatch({ type: 'FETCH_START' });
      
      const data = await fetchEmpresasFromDb();
      
      if (isMounted.current) {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      }
    } catch (error: any) {
      console.error('Error fetching empresas:', error);
      if (isMounted.current) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Error al cargar las empresas. Por favor, intente de nuevo.' });
        toast({
          title: 'Error',
          description: 'Error al cargar las empresas',
          variant: 'destructive',
        });
      }
    } finally {
      if (isMounted.current) {
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 300);
      }
    }
  }, [toast]);

  // Delete empresa with optimistic update
  const handleDelete = useCallback(async (id: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    
    try {
      // Optimistic update - remove from UI immediately
      dispatch({ type: 'OPTIMISTIC_DELETE', payload: id });
      
      await deleteEmpresaFromDb(id);

      toast({
        title: 'Éxito',
        description: 'Empresa eliminada correctamente',
      });
    } catch (error: any) {
      console.error('Error deleting empresa:', error);
      // Revert on error by refetching
      fetchEmpresas();
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar la empresa',
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 300);
    }
  }, [fetchEmpresas, toast]);

  // Set up action dispatcher helpers
  const setOpenEditDialog = useCallback((value: boolean) => {
    dispatch({ type: 'TOGGLE_EDIT_DIALOG', payload: value });
  }, []);

  const setOpenNewDialog = useCallback((value: boolean) => {
    dispatch({ type: 'TOGGLE_NEW_DIALOG', payload: value });
  }, []);

  // Handle success after form submission with debouncing
  const handleFormSuccess = useCallback(debounce(() => {
    if (isMounted.current && !isProcessingRef.current) {
      setOpenEditDialog(false);
      setOpenNewDialog(false);
      fetchEmpresas();
    }
  }, 300), [fetchEmpresas, setOpenEditDialog, setOpenNewDialog]);

  // Edit empresa with debouncing to prevent double clicks
  const handleEdit = useCallback((empresa: Empresa) => {
    if (isProcessingRef.current) return;
    dispatch({ type: 'SELECT_EMPRESA', payload: empresa });
    dispatch({ type: 'TOGGLE_EDIT_DIALOG', payload: true });
  }, []);

  // Load data on component mount and cleanup on unmount
  useEffect(() => {
    isMounted.current = true;
    fetchEmpresas();
    
    return () => {
      isMounted.current = false;
    };
  }, [fetchEmpresas]);

  // Memoize the empresas to prevent unnecessary re-renders
  const memoizedEmpresas = useMemo(() => state.empresas, [state.empresas]);

  return {
    empresas: memoizedEmpresas,
    loading: state.loading,
    error: state.error,
    selectedEmpresa: state.selectedEmpresa,
    openEditDialog: state.openEditDialog,
    openNewDialog: state.openNewDialog,
    setOpenEditDialog,
    setOpenNewDialog,
    handleDelete,
    handleEdit,
    handleFormSuccess,
    formatDate,
    fetchEmpresas,
  };
};
