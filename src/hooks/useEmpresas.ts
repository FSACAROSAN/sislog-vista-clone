
import { useReducer, useEffect, useCallback, useRef, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/empresa';
import { useToast } from '@/hooks/use-toast';
import { debounce } from 'lodash';

// Define action types
type EmpresasAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Empresa[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SELECT_EMPRESA'; payload: Empresa }
  | { type: 'TOGGLE_EDIT_DIALOG'; payload?: boolean }
  | { type: 'TOGGLE_NEW_DIALOG'; payload?: boolean }
  | { type: 'OPTIMISTIC_DELETE'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Define state interface
interface EmpresasState {
  empresas: Empresa[];
  selectedEmpresa: Empresa | null;
  loading: boolean;
  error: string | null;
  openEditDialog: boolean;
  openNewDialog: boolean;
}

// Initial state
const initialState: EmpresasState = {
  empresas: [],
  selectedEmpresa: null,
  loading: true,
  error: null,
  openEditDialog: false,
  openNewDialog: false,
};

// Reducer function
const empresasReducer = (state: EmpresasState, action: EmpresasAction): EmpresasState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, empresas: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SELECT_EMPRESA':
      return { ...state, selectedEmpresa: action.payload };
    case 'TOGGLE_EDIT_DIALOG':
      return { ...state, openEditDialog: action.payload ?? !state.openEditDialog };
    case 'TOGGLE_NEW_DIALOG':
      return { ...state, openNewDialog: action.payload ?? !state.openNewDialog };
    case 'OPTIMISTIC_DELETE':
      return {
        ...state,
        empresas: state.empresas.filter(empresa => empresa.id !== action.payload),
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const useEmpresas = () => {
  const [state, dispatch] = useReducer(empresasReducer, initialState);
  const isMounted = useRef(true);
  const { toast } = useToast();
  const isProcessingRef = useRef(false);

  // Format date for display
  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Fetch empresas from the database
  const fetchEmpresas = useCallback(async () => {
    if (!isMounted.current || isProcessingRef.current) return;
    
    try {
      isProcessingRef.current = true;
      dispatch({ type: 'FETCH_START' });
      
      const { data, error } = await supabase
        .from('empresas')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) throw error;
      
      if (isMounted.current) {
        dispatch({ type: 'FETCH_SUCCESS', payload: data || [] });
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
      
      const { error } = await supabase
        .from('empresas')
        .delete()
        .eq('id', id);

      if (error) {
        // Revert on error by refetching
        fetchEmpresas();
        throw error;
      }

      toast({
        title: 'Éxito',
        description: 'Empresa eliminada correctamente',
      });
    } catch (error: any) {
      console.error('Error deleting empresa:', error);
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
