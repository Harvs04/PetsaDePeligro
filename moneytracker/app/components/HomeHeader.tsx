import { Text, View } from 'react-native';
import { colors, globalStyles } from '../styles/global';

export default function HomeHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={{}}>
      <Text style={globalStyles.title}>Good Morning, Name!</Text>
      <Text style={globalStyles.date}>{currentDate}</Text>
    </View>
  );
}