import { useState, useCallback, useEffect } from "react";
import { RefreshControl, View, ScrollView } from "react-native";
import getTransactions from "../services/transaction.service";
import { globalStyles } from "../styles/global";
import HeaderText from "../components/Header";
import TransactionCards from "../components/TransactionCards";
import { Dropdown } from "../components/Dropdown";
import { timePeriod } from "../utils/constants";
import { withinPeriod } from "../utils/comparisons";
import { Transaction } from "../utils/constants";

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
            withinPeriod(new Date(item.createdAt), itemValue),
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
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
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
        <TransactionCards preview={false} transactions={filterTransactions} />
      </ScrollView>
    </View>
  );
}
