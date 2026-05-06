import { globalStyles } from '../styles/global';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardGrid from '../components/CardGrid';
import TransactionList from '../components/TransactionList';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={globalStyles.container}>
      <HomeHeader />
      <CardGrid />
      <TransactionList />
    </View>
  );
}