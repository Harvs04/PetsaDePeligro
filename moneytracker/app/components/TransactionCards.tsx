import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { globalStyles, colors } from "../styles/global";
import { formatCurrency, formatTime } from "../utils/formats";
import { brands } from "../utils/logos";

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

export default function TransactionCards({ preview, transactions }: Props) {
  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <View
          style={[globalStyles.row, { marginBottom: 10, marginHorizontal: 2 }]}
        >
          <Text style={[globalStyles.sectionTitle]}>{preview ? 'Recent Transactions' : ''}</Text>
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
        </View>

        <View style={[globalStyles.card, { paddingVertical: 12, }]}>
          {transactions.map((t) => (
            <View key={t.id} style={styles.transactionCard}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image source={brands[t.source]} style={globalStyles.logo} />
                <View style={{ flexDirection: "column", gap: 2 }}>
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {t.name}
                  </Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                    {formatTime(new Date(t.created_at))}
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
          ))}
        </View>
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
});
