import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account } from '../utils/constants';
import { ACCOUNT_KEY } from '../utils/constants';

export const getAccounts = async (): Promise<Account[]> => {
  const data = await AsyncStorage.getItem(ACCOUNT_KEY);
  return data ? JSON.parse(data) : [];
};

export const addAccount = async (
  account: Omit<Account, 'id' | 'createdAt'>,
): Promise<Account> => {
  const accounts = await getAccounts();
  const newAccount: Account = {
    ...account,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify([newAccount, ...accounts]));
  return newAccount;
};