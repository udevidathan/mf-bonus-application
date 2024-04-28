import { create } from "zustand";

interface SearchParams {
  searchType: string | null;
  transactionType: string | null;
  query: string | null;
  record: ResultsEntity | null;
  searchResults: searchResultResponse | null;
  modifiedRecod: saveNonPSL | savePSL | null;
  name: name | null;
  updateName: (newValue: name | null) => void;
  updateSearchType: (newValue: string | null) => void;
  updateTransactionType: (newValue: string | null) => void;
  updateQuery: (newValue: string | null) => void;
  updateRecord: (newValue: ResultsEntity | null) => void;
  saveModifiedRecord: (newValue: saveNonPSL | savePSL | null) => void;
  setSearchResults: (newValue: searchResultResponse | null) => void;
}

export const useSearchStore = create<SearchParams>((set) => ({
  searchType: "",
  transactionType: "",
  query: "",
  name: null,
  record: null,
  modifiedRecod: null,
  searchResults: null,
  updateName: (newValue: name | null) => set({ name: newValue }),
  updateSearchType: (newValue: string | null) => set({ searchType: newValue }),
  updateTransactionType: (newValue: string | null) =>
    set({ transactionType: newValue }),
  updateQuery: (newValue: string | null) => set({ query: newValue }),
  updateRecord: (newValue: ResultsEntity | null) => set({ record: newValue }),
  setSearchResults: (newValue: searchResultResponse | null) =>
    set({ searchResults: newValue }),
  saveModifiedRecord: (newValue: saveNonPSL | savePSL | null) =>
    set({ modifiedRecod: newValue }),
}));
