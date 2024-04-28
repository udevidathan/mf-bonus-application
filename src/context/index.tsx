import React, { createContext, useEffect, useState } from "react";
import { useMedia } from "react-use";

import { ENV, URLS } from "../utils/constant";

interface AdminContextProviderProps {
  children: React.ReactNode;
}

interface contextProps {
  firstName: string;
  userRoles: string[];
  currentENV: string;
  isUserTeamLead: boolean;
  isRenderedInShell: boolean;
  errorResult: errorObj[] | [];
  setErrorResult: React.Dispatch<React.SetStateAction<errorObj[]>>;
  getErrorResults: (errors: errorObj[] | []) => void;
  setSelectedUser: React.Dispatch<React.SetStateAction<number | string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedUsers?: Array<number | string>;
  setSelectedUsers?: React.Dispatch<
    React.SetStateAction<Array<number | string>>
  >;
  setIsRenderedInShell: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileView: boolean;
  setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

export const AdminContext = createContext<Partial<contextProps>>({});

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({
  children,
}) => {
  const isMobile = useMedia("(max-width: 990px)");
  const [currentENV, setCurrentENV] = useState<string>(ENV.DEV);
  const [firstName] = useState("John");
  const [isMobileView, setIsMobileView] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<Array<number | string>>(
    []
  );

  const [isRenderedInShell, setIsRenderedInShell] = useState<boolean>(false);
  const [errorResult, setErrorResult] = useState<errorObj[] | []>([]);

  const getErrorResults = (errors: errorObj[] | []): void => {
    setErrorResult((prevState) => [...prevState, ...errors]);
  };

  useEffect(() => {
    setCurrentENV(URLS[window.location.origin] || ENV.DEV);
  }, []);

  const value = {
    currentENV,
    firstName,
    isRenderedInShell,
    errorResult,
    setErrorResult,
    getErrorResults,
    setIsRenderedInShell,
    selectedUsers,
    setSelectedUsers,
    isMobileView,
    setIsMobileView,
    isMobile,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
