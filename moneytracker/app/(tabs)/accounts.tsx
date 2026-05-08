import { useState, useCallback, useEffect, useMemo } from "react";
import { RefreshControl, View, ScrollView, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import getAccounts from "../services/account.service";
import { colors, globalStyles } from "../styles/global";
import Accounts from "../components/Accounts";
import CurrentBalance from "../components/CurrentBalance";
import HeaderText from "../components/Header";
import { categories } from "../utils/constants";

type Account = {
  id: number;
  name: string;
  balance: number;
  category: string;
  source: string;
};

export default function AccountsPage() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectAccountCategory, setSelectAccountCategory] = useState<
    string | null
  >(null);

  const onPress = useCallback(() => {
    setShowBalance((prev) => !prev);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAccounts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      setAccounts([]);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  useMemo(() => {
    const balance = accounts.reduce(
      (accumulator, account) => accumulator + account.balance,
      0,
    );
    setBalance(balance);
  }, [accounts]);

  return (
    <View style={globalStyles.container}>
      <HeaderText>Accounts</HeaderText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
      >
        <CurrentBalance
          balance={balance}
          showBalance={showBalance}
          inHomePage={false}
          onPress={onPress}
        />
        <Picker
          selectedValue={selectAccountCategory}
          onValueChange={(itemValue) => setSelectAccountCategory(itemValue)}
          dropdownIconColor={colors.text}
          dropdownIconRippleColor={colors.textSecondary}
          style={{ color: colors.text }}
        >
          <Picker.Item label="Select category..." value={null} />
          {categories.map((cat, idx) => (
            <Picker.Item key={idx} label={cat.label} value={cat.value} />
          ))}
        </Picker>
        <Accounts
          preview={false}
          accounts={accounts}
          showBalance={showBalance}
        />
      </ScrollView>
    </View>
  );
}
