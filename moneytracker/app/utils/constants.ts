// TYPES
type DropdownItems = {
  label: string;
  value: string;
};

export type Account = {
  id: number;
  name: string;
  balance: number;
  category: string;
  source: string;
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

export const CURRENCIES = [
  { value: "PHP", label: "Php" },
]