// TYPES
type DropdownItems = {
  label: string;
  value: string;
};

export type Account = {
  id: string;
  type: string;
  source: string;
  name: string;
  balance: number;
  color: string;
  createdAt: Date;
};

export type Transaction = {
  id: string;
  name: string;
  transactionType: string;
  amount: number;
  category: string;
  source: string;
  // transactionDate: string;
  // transactionTime: string
  createdAt: Date;
};

export type TransactionAction = {
  action: "expense" | "income" | "transfer";
}

// KEYS
export const TRANSACTION_KEY = 'transactions';
export const ACCOUNT_KEY = 'accounts';

// ARRAYS
export const categories: DropdownItems[] = [
  { value: "CASH", label: "Cash" },
  { value: "SAVINGS", label: "Savings" },
  { value: "CHECKING", label: "Checking" },
  { value: "CREDIT", label: "Credit" },
  { value: "WALLET", label: "E-Wallet" },
  { value: "INVESTMENT", label: "Investment" },
  { value: "LOAN", label: "Loan" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "PENSION", label: "Pension" },
  { value: "CRYPTOCURRENCY", label: "Cryptocurrency" },
];

export const timePeriod: DropdownItems[] = [
  { value: "TODAY", label: "Today" },
  { value: "THIS_WEEK", label: "This Week" },
  { value: "LAST_WEEK", label: "Last Week" },
  { value: "LAST_MONTH", label: "Last Month" },
  { value: "LAST_YEAR", label: "Last Year" },
]

export const GROUP_ORDER = [
  "Today",
  "This Week",
  "Last Week",
  "Last Month",
  "Last Year",
  "Older",
];

export const TRANSACTION_ACTIONS = [
  { value: "INCOME", label: "Income", icon: 'arrow-down-outline' },
  { value: "EXPENSE", label: "Expense", icon: "wallet-outline" },
  { value: "TRANSFER", label: "Transfer", icon: 'arrow-up-outline' },
]

// ACCOUNT 
export const ACCOUNT_TYPES = [
  {
    id: "wallet",
    label: "Wallet",
    icon: "wallet-outline",
    description: "Everyday cash & spending",
    color: "#4ECDC4",
    bg: "#E8FAF8",
    accent: "#1A9E95",
  },
  {
    id: "savings",
    label: "Savings",
    icon: "cash-outline",
    description: "Goals & emergency funds",
    color: "#6C63FF",
    bg: "#EFEDFF",
    accent: "#4A42CC",
  },
  {
    id: "credit",
    label: "Credit",
    icon: "card-outline",
    description: "Cards & credit lines",
    color: "#FF6B6B",
    bg: "#FFEDED",
    accent: "#CC4444",
  },
  {
    id: "loans",
    label: "Loans",
    icon: "clipboard-outline",
    description: "Mortgages & personal loans",
    color: "#F7B731",
    bg: "#FFF8E1",
    accent: "#C88E00",
  },
];

export const COLORS = [
  "#4ECDC4",
  "#6C63FF",
  "#FF6B6B",
  "#F7B731",
  "#26C281",
  "#E74C3C",
  "#2980B9",
  "#8E44AD",
  "#F8BBD0"
];

export const CURRENCIES = ["PHP", "USD", "EUR", "GBP", "JPY"];

