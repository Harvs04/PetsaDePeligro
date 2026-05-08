import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../styles/global";
import { formatCurrency, formatType } from "../utils/formats";
import { brands } from "../utils/logos";

type CardProps = {
  id: number;
  name: string;
  balance: number;
  source: string;
  category: string;
  showBalance: boolean;
};

export default function Card({
  id,
  name,
  balance,
  source,
  category,
  showBalance,
}: CardProps) {
  return (
    <View style={[styles.card]} key={String(id)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image
          source={brands[source]}
          style={[globalStyles.logo, { width: 30, height: 30 }]}
        />
        <Text style={[globalStyles.label, { flexShrink: 1 }]}>
          {name} - {`${formatType(category)}`}
        </Text>
      </View>
      <Text style={styles.balance}>
        {showBalance ? formatCurrency(balance) : "•••••••"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    width: "48%",
  },
  balance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },
  category: {
    fontSize: 14,
    color: "#a0a0b0",
  },
});
