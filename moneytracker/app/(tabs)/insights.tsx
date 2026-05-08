import { globalStyles } from '../styles/global';
import { Text, ScrollView } from 'react-native';

export default function MealsScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Insights</Text>
    </ScrollView>
  );
}