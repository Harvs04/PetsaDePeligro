import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function LandingHeader() {
  const now = new Date();

  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hour = now.getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <View>
      <Text style={globalStyles.title}>{greeting}, Harvey!</Text>
      <Text style={globalStyles.date}>{currentDate}</Text>
    </View>
  );
}
