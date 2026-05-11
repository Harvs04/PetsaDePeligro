import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { globalStyles, colors } from "../styles/global";
import { formatCurrency, formatDate, formatTime } from "../utils/formats";
import { brands } from "../utils/logos";
import { isToday } from "../utils/comparisons";
import { EmptyPage } from "./Empty";

type TransactionProps = {
  id: number;
  name: string;
  transaction_type: string;
  amount: number;
  category: string;
  source: string;
  created_at: Date;
};

type Props = {
  preview: boolean;
  transactions: TransactionProps[];
};

type GroupedTransactions = {
  [key: string]: TransactionProps[];
};

function getGroup(date: Date): string {
  const now = new Date();
  const d = new Date(date);

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const todayStart = startOfDay(now);
  const dateStart = startOfDay(d);

  const diffDays = Math.floor(
    (todayStart.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Today";

  const startOfThisWeek = new Date(todayStart);
  startOfThisWeek.setDate(now.getDate() - now.getDay());

  // check this week before yesterday so yesterday falls under this week if it's in the same week
  if (d >= startOfThisWeek && d < todayStart) return "This Week";

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
  const endOfLastWeek = new Date(startOfThisWeek);
  endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
  if (d >= startOfLastWeek && d <= endOfLastWeek) return "Last Week";

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  if (d >= startOfLastMonth && d <= endOfLastMonth) return "Last Month";

  const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
  const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31);
  if (d >= startOfLastYear && d <= endOfLastYear) return "Last Year";

  return "Older";
}

const GROUP_ORDER = [
  "Today",
  "This Week",
  "Last Week",
  "Last Month",
  "Last Year",
  "Older",
];

function groupTransactions(
  transactions: TransactionProps[],
): GroupedTransactions {
  return transactions.reduce((groups, transaction) => {
    const group = getGroup(new Date(transaction.created_at));
    if (!groups[group]) groups[group] = [];
    groups[group].push(transaction);
    return groups;
  }, {} as GroupedTransactions);
}

function TransactionItem({ t }: { t: TransactionProps }) {
  return (
    <View key={t.id} style={styles.transactionCard}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image source={brands[t.source]} style={globalStyles.logo} />
        <View style={{ flexDirection: "column", gap: 2 }}>
          <Text
            style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}
          >
            {t.name}
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            {isToday(new Date(t.created_at))
              ? formatTime(new Date(t.created_at))
              : formatDate(new Date(t.created_at))}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color:
            t.transaction_type === "EXPENSE"
              ? colors.expense
              : t.transaction_type === "INCOME"
                ? colors.income
                : colors.text,
        }}
      >
        {t.transaction_type === "EXPENSE"
          ? "- "
          : t.transaction_type === "INCOME"
            ? "+ "
            : ""}
        {formatCurrency(t.amount)}
      </Text>
    </View>
  );
}

export default function TransactionCards({ preview, transactions }: Props) {
  const grouped = groupTransactions(transactions);
  const groupKeys = GROUP_ORDER.filter((key) => grouped[key]);

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <View
          style={[globalStyles.row, { marginBottom: 10, marginHorizontal: 2 }]}
        >
          {preview && (
            <Text style={[globalStyles.sectionTitle]}>Recent Transactions</Text>
          )}
          {preview && (
            <Link href="/transactions">
              <Text
                style={{
                  color: colors.textSecondary,
                  marginRight: 2,
                  textDecorationLine: "underline",
                }}
              >
                View All
              </Text>
            </Link>
          )}
        </View>

        {transactions.length > 0 ? (
          groupKeys.map((group) => (
            <View key={group} style={{ marginBottom: 16 }}>
              <Text style={styles.groupHeader}>{group}</Text>
              <View style={[globalStyles.card, { paddingVertical: 12 }]}>
                {grouped[group].map((t) => (
                  <TransactionItem key={t.id} t={t} />
                ))}
              </View>
            </View>
          ))
        ) : (
          <EmptyPage />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  groupHeader: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "capitalize",
    marginBottom: 8,
    marginLeft: 2,
  },
});
