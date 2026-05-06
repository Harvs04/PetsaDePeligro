import { globalStyles } from '../styles/global';
import { View } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import LandingCards from '../components/LandingCards';

export default function HomeScreen() {

  return (
    <View style={globalStyles.container}>
      <LandingHeader />
      <LandingCards />
    </View>
  );
}