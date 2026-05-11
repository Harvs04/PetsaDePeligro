import { createContext } from "react";

export type TransactionContextType = {
  selectTransactionPeriod: string | null;
  handleSelect: (value: string | null) => void;
};

export const TransactionContext =
  createContext<TransactionContextType | null>(null);