import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import { RefreshControl, View, ScrollView, Text } from "react-native";
import getAccounts from "../services/account.service";
import { globalStyles } from "../styles/global";
import Accounts from "../components/Accounts";
import CurrentBalance from "../components/CurrentBalance";
import HeaderText from "../components/Header";

type Account = {
  id: number;
  name: string;
  balance: number;
  category: string;
  source: string;
};

type AccountContextType = {
  selectAccountCategory: string | null;
  handleSelect: (value: string | null) => void;
};

export const AccountContext = createContext<AccountContextType | null>(null);

export default function AccountsPage() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filterAccounts, setFilterAccounts] = useState<Account[]>([]);
  const [selectAccountCategory, setSelectAccountCategory] =
    useState<string>("ALL");

  const onPress = useCallback(() => {
    setShowBalance((prev) => !prev);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSelectAccountCategory("ALL");
    fetchAccounts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSelect = (itemValue: string | null) => {
    setSelectAccountCategory(itemValue ?? "ALL");
    setFilterAccounts(
      !itemValue || itemValue === "ALL"
        ? accounts
        : accounts.filter((item: Account) => item.category === itemValue),
    );
  };

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
      setFilterAccounts(data);
    } catch (error) {
      setAccounts([]);
      setFilterAccounts([]);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const balance = useMemo(
    () =>
      filterAccounts.reduce(
        (accumulator, account) => accumulator + account.balance,
        0,
      ),
    [filterAccounts],
  );

  return (
    <View style={globalStyles.container}>
      <HeaderText>Accounts</HeaderText>
      <Text style={{ color: "#fff" }}>{selectAccountCategory}</Text>
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
        <AccountContext.Provider
          value={{
            selectAccountCategory,
            handleSelect,
          }}
        >
          <Accounts
            preview={false}
            accounts={filterAccounts}
            showBalance={showBalance}
          />
        </AccountContext.Provider>
      </ScrollView>
    </View>
  );
}
