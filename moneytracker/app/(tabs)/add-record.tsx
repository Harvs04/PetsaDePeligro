import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack, useFocusEffect } from "expo-router";
import { TRANSACTION_ACTIONS } from "../utils/constants";
import { colors, globalStyles } from "../styles/global";
import HeaderText from "../components/Header";
import CreateForm from "../components/CreateForm";
import { Ionicons } from "@expo/vector-icons";
import CreateTransactionForm from "../pages/accounts/create/transaction";
import CreateAccountScreen from "../pages/accounts/create/account";

export default function TransactionButtonGroup() {
  const { type, isAccount } = useLocalSearchParams();
  const [transactionType, setTransactionType] = useState(
    (type as string) ?? "INCOME",
  );

  useFocusEffect(
    useCallback(() => {
      setTransactionType((type as string) ?? "INCOME");
    }, [type]),
  );

  return (
    <View style={globalStyles.container}>
      {isAccount === 'true' && <CreateAccountScreen />}
      {isAccount === 'false' && <CreateTransactionForm type={transactionType} setTransactionType={setTransactionType} />}
    </View>
  );
}
