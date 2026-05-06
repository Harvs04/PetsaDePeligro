import { ScrollView, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function AddMeals() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Add a Transaction</Text>
    </ScrollView>
  )
}