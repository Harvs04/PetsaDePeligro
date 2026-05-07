import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import formatCurrency from "../utils/formats";

type CardProps = {
  id: number;
  name: string;
  balance: number;
  source?: string;
  category?: string;
  showBalance: boolean;
}

export default function Card({ id, name, balance, source, category, showBalance }: CardProps) {

  return (
    <View style={[styles.card]} key={String(id)}>
      <Text style={globalStyles.label}>{name}</Text>
      <Text style={styles.balance}>{(showBalance) ? formatCurrency(balance) : '•••••••'}</Text>
      <Text style={styles.category}>{`${category} (${source})`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    width: '48%',
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
