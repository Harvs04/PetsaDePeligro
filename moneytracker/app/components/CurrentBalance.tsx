import {
  StyleSheet,
  Text,
  Pressable,
  View,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, globalStyles } from "../styles/global";
import { formatCurrency } from "../utils/formats";

type Props = {
  balance: number;
  showBalance: boolean;
  inHomePage: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export default function CurrentBalance({
  balance,
  showBalance,
  inHomePage,
  onPress,
}: Props) {
  return (
    <View>
      <View style={styles.card}>
        <View style={globalStyles.row}>
          <Text style={globalStyles.label}>Current Balance</Text>
          <Pressable onPress={onPress}>
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
          {showBalance ? formatCurrency(balance) : "•••••••"}
        </Text>
        {inHomePage && (
          <View style={styles.buttonRow}>
            <View style={styles.buttonCol}>
              <Pressable style={styles.button}>
                <Ionicons
                  name="arrow-down-outline"
                  size={24}
                  color={colors.pressableIcon}
                />
              </Pressable>
              <Text style={styles.buttonText}>Income</Text>
            </View>
            <View style={styles.buttonCol}>
              <Pressable style={styles.button}>
                <Ionicons
                  name="pricetag-outline"
                  size={24}
                  color={colors.pressableIcon}
                />
              </Pressable>
              <Text style={styles.buttonText}>Expense</Text>
            </View>
            <View style={styles.buttonCol}>
              <Pressable style={styles.button}>
                <Ionicons
                  name="arrow-up-outline"
                  size={24}
                  color={colors.pressableIcon}
                />
              </Pressable>
              <Text style={styles.buttonText}>Transfer</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginBottom: 15,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
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
