import { useState, useEffect } from "react";
import getTransactions from '../services/transaction.service';
import { FlatList, View, Text } from "react-native";

type User = {
  id: number;
  name: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      setTransactions([]);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <View>
        <FlatList
          data={transactions}
          renderItem={({item}) => <Text key={item.id} style={{ color: '#fff' }}>{item.name}</Text>}
        >
        </FlatList>
      </View>
    </>
  )
}