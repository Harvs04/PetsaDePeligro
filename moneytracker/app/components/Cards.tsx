import { StyleSheet, View, Text } from "react-native";

type CardProps = {
  walletName: string;
  balance: number;
  source?: string;
  category?: string;
  showBalance: boolean;
}

export const moneySources = {
  wallet: {
    label: "Wallet",
    color: "#22c55e", // green
    items: [
      "Cash",
      "GCash",
      "Maya",
      "GrabPay",
      "ShopeePay",
      "Lazada Wallet",
      "Remittance (Cebuana, Palawan, Western Union)",
    ],
  },

  savings: {
    label: "Savings",
    color: "#3b82f6", // blue
    items: [
      "Bank Savings (BDO, BPI, Landbank)",
      "Digital Banks (Tonik, GoTyme, CIMB, SeaBank)",
      "Time Deposit",
      "Cooperative Savings",
      "Emergency Fund",
    ],
  },

  credit: {
    label: "Credit",
    color: "#f59e0b", // amber
    items: [
      "Credit Cards",
      "Buy Now Pay Later (Billease, Atome, SPayLater)",
      "Installment Plans",
      "Overdraft",
    ],
  },

  loans: {
    label: "Loans",
    color: "#ef4444", // red
    items: [
      "Personal Loan",
      "SSS Loan",
      "Pag-IBIG Loan",
      "Microfinance",
      "Salary Loan",
      "Utang (Friends/Family)",
    ],
  },

  investments: {
    label: "Investments",
    color: "#8b5cf6", // purple
    items: [
      "Stocks (PSE)",
      "Mutual Funds / UITF",
      "Cryptocurrency",
      "Real Estate",
      "Business Investment",
      "Pag-IBIG MP2",
    ],
  },

  income: {
    label: "Income",
    color: "#14b8a6", // teal
    items: [
      "Salary",
      "Freelance",
      "Business Income",
      "Allowance",
      "Remittance (OFW)",
    ],
  },
};

const getColorByWalletType = (walletType: string) => {
  const group = Object.values(moneySources).find((source) =>
    source.items.some((item) =>
      item.toLowerCase().includes(walletType.toLowerCase())
    )
  );

  return group?.color || "#000";
};

export default function Card({ walletName, balance, source, category, showBalance }: CardProps) {
  const borderColor = getColorByWalletType(category ?? 'wallet');

  return (
    <View style={[styles.card, { borderLeftColor: borderColor }]}>
      <Text style={styles.label}>{walletName}</Text>
      <Text style={styles.balance}>{(showBalance) ? balance : '•••••••'}</Text>
      <Text style={styles.category}>{`${category} (${source})`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    color: '#a0a0b0',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  category: {
    fontSize: 14,
    color: '#a0a0b0',
    marginTop: 2,
  },
});
