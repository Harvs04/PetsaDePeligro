import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles, colors } from "../styles/global";
import { Link } from "expo-router";
import { formatCurrency, formatTime } from "../utils/formats";

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
  transactions: TransactionProps[];
};

export default function TransactionCards({ transactions }: Props) {
  const imgName = 'maribank';

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <View
          style={[globalStyles.row, { marginBottom: 10, marginHorizontal: 2 }]}
        >
          <Text style={[globalStyles.sectionTitle]}>Recent Transactions</Text>
          <Link href="/">
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

        <View style={styles.card}>
          {transactions.map((t) => (
            <View key={t.id} style={styles.transactionCard}>
              <View style={{ flexDirection: "row",  alignItems: 'flex-start', gap: 10 }}>
                <Image
                  source={require(`../../assets/accounts/${imgName}.png`)}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
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
                      ? "#ef4444"
                      : t.transaction_type === "INCOME"
                        ? "#4ade80"
                        : "#fff",
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
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
});
