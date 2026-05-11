type DropdownItems = {
  label: string;
  value: string;
};

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