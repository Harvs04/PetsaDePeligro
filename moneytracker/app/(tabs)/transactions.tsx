import { useState, useCallback, useEffect, createContext } from "react";
import { RefreshControl, View, ScrollView } from "react-native";
import getTransactions from "../services/transaction.service";
import { globalStyles } from "../styles/global";
import HeaderText from "../components/Header";
import TransactionCards from "../components/TransactionCards";
import { Dropdown } from "../components/Dropdown";
import { timePeriod } from "../utils/constants";
import { withinPeriod } from "../utils/comparisons";
import { TransactionContext } from "../contexts/transaction";

type Transaction = {
  id: number;
  name: string;
  transaction_type: string;
  amount: number;
  category: string;
  source: string;
  created_at: Date;
};

export default function TransactionsPage() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterTransactions, setFilterTransactions] = useState<Transaction[]>(
    [],
  );
  const [selectTransactionPeriod, setSelectTransactionPeriod] =
    useState<string>("ALL");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTransactions();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSelect = (itemValue: string | null) => {
    setSelectTransactionPeriod(itemValue ?? "ALL");
    setFilterTransactions(
      !itemValue || itemValue === "ALL"
        ? transactions
        : transactions.filter((item: Transaction) =>
            withinPeriod(new Date(item.created_at), itemValue),
          ),
    );
  };

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions({ timeFrame: "all" });
      setTransactions(data);
      setFilterTransactions(data);
    } catch (error) {
      setTransactions([]);
      setFilterTransactions([]);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <View style={[globalStyles.container]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <HeaderText>Transactions</HeaderText>
        <Dropdown
          selectedItem={selectTransactionPeriod}
          setSelectedItem={handleSelect}
          data={timePeriod}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
      >
        <TransactionContext.Provider
          value={{
            selectTransactionPeriod,
            handleSelect,
          }}
        >
          <TransactionCards preview={false} transactions={filterTransactions} />
        </TransactionContext.Provider>
      </ScrollView>
    </View>
  );
}
