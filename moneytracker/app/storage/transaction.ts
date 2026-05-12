import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../utils/constants';
import { TRANSACTION_KEY } from '../utils/constants';

export const getTransactions = async (): Promise<Transaction[]> => {
  const data = await AsyncStorage.getItem(TRANSACTION_KEY);
  return data ? JSON.parse(data) : [];
};

export const addTransaction = async (
  transaction: Omit<Transaction, 'id' | 'createdAt'>,
): Promise<Transaction> => {
  const transactions = await getTransactions();
  const newTransaction: Transaction = {
    ...transaction,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  await AsyncStorage.setItem(TRANSACTION_KEY, JSON.stringify([newTransaction, ...transactions]));
  return newTransaction;
};