import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { globalStyles, colors } from "../styles/global";
import { GROUP_ORDER } from "../utils/constants";
import { EmptyPage } from "./Empty";
import { TransactionItem } from "./TransactionItem";
import { getGroup } from "../utils/comparisons";
import { Transaction } from "../utils/constants";

type Props = {
  preview: boolean;
  transactions: Transaction[];
};

type GroupedTransactions = {
  [key: string]: Transaction[];
};

function groupTransactions(
  transactions: Transaction[],
): GroupedTransactions {
  return transactions.reduce((groups, transaction) => {
    const group = getGroup(new Date(transaction.createdAt));
    if (!groups[group]) groups[group] = [];
    groups[group].push(transaction);
    return groups;
  }, {} as GroupedTransactions);
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
                See more
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
  groupHeader: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
    textTransform: "capitalize",
    marginBottom: 8,
    marginLeft: 2,
  },
});
