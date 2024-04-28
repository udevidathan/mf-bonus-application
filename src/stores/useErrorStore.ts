import { create } from "zustand";

export interface ErrorStore {
  errorResult: errorObj[] | [];
  updateErrorResults: (errors: errorObj[] | []) => void;
  resetError: () => void;
  apisErrorResult: errorObj[] | [];
  updateApisErrorResults: (errors: errorObj[] | []) => void;
  resetApiError: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  errorResult: [],
  resetError: () => set((state) => ({ ...state, errorResult: [] })),
  updateErrorResults: (errors) =>
    set((state) => ({
      ...state,
      errorResult: [...state.errorResult, ...errors],
    })),
  apisErrorResult: [],
  resetApiError: () => set((state) => ({ ...state, apisErrorResult: [] })),
  updateApisErrorResults: (errors) =>
    set((state) => ({
      ...state,
      apisErrorResult: [...state.apisErrorResult, ...errors],
    })),
}));
