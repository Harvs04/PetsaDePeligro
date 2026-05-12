import { useCallback, useState, useMemo, useEffect } from "react";
import { ScrollView, View, RefreshControl, Text } from "react-native";
import getAccounts from "../services/account.service";
// import getTransactions from "../services/transaction.service";
import Accounts from "../components/Accounts";
import TransactionCards from "../components/TransactionCards";
import LandingHeader from "../components/LandingHeader";
import CurrentBalance from "../components/CurrentBalance";
import { globalStyles } from "../styles/global";
import { Account, Transaction } from "../utils/constants";
import { useFocusEffect } from '@react-navigation/native';

//TODO: Remove
import { getTransactions } from "../storage/transaction";

export default function HomePage() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //TODO: Remove later
  // const [meals, setMeals] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
    console.log("Loaded meals:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAccounts();
    // fetchTransactions();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onPress = useCallback(() => {
    setShowBalance((prev) => !prev);
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      setAccounts([]);
    }
  };

  // const fetchTransactions = async () => {
  //   try {
  //     const data = await getTransactions({ timeFrame: "recent" });
  //     setTransactions(data);
  //   } catch (error) {
  //     setTransactions([]);
  //   }
  // };

  useEffect(() => {
    fetchAccounts();
    // fetchTransactions();
  }, []);

  // useMemo(() => {
  //   const balance = accounts.reduce(
  //     (accumulator, account) => accumulator + account.balance,
  //     0,
  //   );
  //   setBalance(balance);
  // }, [accounts]);

  return (
    <View style={globalStyles.container}>
      <LandingHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CurrentBalance
          balance={balance}
          showBalance={showBalance}
          inHomePage={true}
          onPress={onPress}
        />
        {/* <Accounts
          preview={true}
          accounts={accounts}
          showBalance={showBalance}
        /> */}
        <TransactionCards preview={true} transactions={transactions} />
      </ScrollView>
    </View>
  );
}
