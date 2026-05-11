import { createContext } from "react";

export type AccountContextType = {
  selectAccountCategory: string | null;
  handleSelect: (value: string | null) => void;
};

export const AccountContext =
  createContext<AccountContextType | null>(null);