
import { Empresa } from '@/types/empresa';

// Define action types
export type EmpresasAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Empresa[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SELECT_EMPRESA'; payload: Empresa }
  | { type: 'TOGGLE_EDIT_DIALOG'; payload?: boolean }
  | { type: 'TOGGLE_NEW_DIALOG'; payload?: boolean }
  | { type: 'OPTIMISTIC_DELETE'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Define state interface
export interface EmpresasState {
  empresas: Empresa[];
  selectedEmpresa: Empresa | null;
  loading: boolean;
  error: string | null;
  openEditDialog: boolean;
  openNewDialog: boolean;
}

// Initial state
export const initialState: EmpresasState = {
  empresas: [],
  selectedEmpresa: null,
  loading: true,
  error: null,
  openEditDialog: false,
  openNewDialog: false,
};

// Reducer function
export const empresasReducer = (state: EmpresasState, action: EmpresasAction): EmpresasState => {
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
