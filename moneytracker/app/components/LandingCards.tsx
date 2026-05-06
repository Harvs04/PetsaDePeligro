import { useState, useEffect, useMemo } from "react";
import getAccounts from "../services/account.service";
import { StyleSheet, ScrollView, Text, Pressable, View } from "react-native";
import Card from "./Cards";
import { colors, globalStyles } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";
import { formatCurrency } from "../utils/formats";

type Account = {
  id: number;
  name: string;
  balance: number;
  category: string;
  source: string;
};

export default function LandingCards() {
  const [showBalance, setShowBalance] = useState(true);
  const [totalNetWorth, setTotalNetWorth] = useState(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showAllAccounts, setShowAllAccounts] = useState(false);

  const onPress = (type: string) => {
    switch (type) {
      case "balance":
        setShowBalance((prev) => !prev);
        break;
      case "account":
        setShowAllAccounts((prev) => !prev);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (error) {
        setAccounts([]);
      }
    };

    fetchAccounts();
  }, []);

  useMemo(() => {
    const networth = accounts.reduce(
      (accumulator, wallet) => accumulator + wallet.balance,
      0,
    );
    setTotalNetWorth(networth);
  }, [accounts]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={globalStyles.label}>Total Net Worth</Text>
          <Pressable onPress={() => onPress("balance")}>
            {showBalance ? (
              <Ionicons
                name="eye-outline"
                size={24}
                color={colors.pressableIcon}
              />
            ) : (
              <Ionicons name="eye-off-outline" size={24} color="#fff" />
            )}
          </Pressable>
        </View>
        <Text style={styles.balance}>
          {showBalance ? formatCurrency(totalNetWorth) : "•••••••"}
        </Text>
        <View style={styles.buttonRow}>
          <View style={styles.buttonCol}>
            <Pressable style={styles.button}>
              <Ionicons
                name="wallet-outline"
                size={24}
                color={colors.pressableIcon}
              />
            </Pressable>
            <Text style={styles.buttonText}>Income</Text>
          </View>
          <View style={styles.buttonCol}>
            <Pressable style={styles.button}>
              <Ionicons
                name="cart-outline"
                size={24}
                color={colors.pressableIcon}
              />
            </Pressable>
            <Text style={styles.buttonText}>Expense</Text>
          </View>
          <View style={styles.buttonCol}>
            <Pressable style={styles.button}>
              <Ionicons
                name="arrow-redo-outline"
                size={24}
                color={colors.pressableIcon}
              />
            </Pressable>
            <Text style={styles.buttonText}>Transfer</Text>
          </View>
        </View>
      </View>

      <View style={[styles.row, { marginBottom: 10, marginHorizontal: 4 }]}>
        <Text style={[globalStyles.sectionTitle]}>
          Your Accounts ({accounts.length})
        </Text>
        <View style={styles.row}>
          <Text style={{ color: colors.textSecondary, marginRight: 2 }}>{showAllAccounts ? "Less" : "More"}</Text>
          <Pressable onPress={() => onPress("account")}>
            <Ionicons
              name={showAllAccounts ? "chevron-up" : "chevron-down"}
              size={20}
              style={{ color: colors.textSecondary }}
            />
          </Pressable>
        </View>
      </View>

      <View style={[styles.grid, { marginBottom: 10 }]}>
        {accounts
          .slice(0, showAllAccounts ? accounts.length : 4)
          .map((account) => (
            <Card
              key={account.id}
              id={account.id}
              name={account.name}
              balance={account.balance}
              source={account.source}
              category={account.category}
              showBalance={showBalance}
            />
          ))}
      </View>

      <ScrollView>
        <Text style={[globalStyles.sectionTitle, { marginBottom: 10 }]}>
          Recent Transactions
        </Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
        <Text style={{ color: "#fff" }}>Hello</Text>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    width: "98%",
    marginBottom: 15,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    borderRadius: 27,
  },
  buttonCol: {
    alignItems: "center",
    gap: 6,
    width: 70,
  },
  buttonText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
