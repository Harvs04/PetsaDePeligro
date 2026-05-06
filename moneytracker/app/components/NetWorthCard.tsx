import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View, Text, Pressable, GestureResponderEvent } from "react-native";

type CardProps = {
  balance: number;
  showBalance: boolean;
  onPress: (event:GestureResponderEvent) => void;
};

export default function NetWorthCard({ balance, showBalance, onPress }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Total Net Worth</Text>
        <Pressable onPress={onPress}>
          {(showBalance) ? <Ionicons name="eye" size={24} color="#fff" /> : <Ionicons name="eye-off" size={24} color="#fff" />}
        </Pressable>
      </View>
      <Text style={styles.balance}>{(showBalance) ? balance : '•••••••'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    width: "98%",
    marginBottom: 20,
    borderLeftWidth: 6,
    borderLeftColor: "#fbbf24",
  },
  label: {
    fontSize: 18,
    color: "#a0a0b0",
  },
  balance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
