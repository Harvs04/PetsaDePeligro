import { View, Image, Text, StyleSheet } from "react-native";
import { brands } from "../utils/logos";
import { isToday } from "../utils/comparisons";
import { formatCurrency, formatDate, formatTime } from "../utils/formats";
import { colors, globalStyles } from "../styles/global";
import { Transaction } from "../utils/constants";

export function TransactionItem({ t }: { t: Transaction }) {
  return (
    <View key={t.id} style={styles.transactionCard}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image source={brands[t.source.toLowerCase()]} style={globalStyles.logo} />
        <View style={{ flexDirection: "column", gap: 2 }}>
          <Text
            style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}
          >
            {t.name}
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            {isToday(new Date(t.createdAt))
              ? formatTime(new Date(t.createdAt))
              : formatDate(new Date(t.createdAt))}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color:
            t.transactionType === "EXPENSE"
              ? colors.expense
              : t.transactionType === "INCOME"
                ? colors.income
                : colors.text,
        }}
      >
        {t.transactionType === "EXPENSE"
          ? "- "
          : t.transactionType === "INCOME"
            ? "+ "
            : ""}
        {formatCurrency(t.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
})