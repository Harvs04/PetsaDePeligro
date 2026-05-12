import { colors, globalStyles } from "@/app/styles/global";
import { useLocalSearchParams, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function AccountScreen() {
  const { id, title } = useLocalSearchParams();

  return (
    <View style={globalStyles.container}>
      <Stack.Screen options={{ title: "Account Details" }} />
      <Text style={{ color: colors.text }}>Account Name: {title}</Text>
    </View>
  );
}
