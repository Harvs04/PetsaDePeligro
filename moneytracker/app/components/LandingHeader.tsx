import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { formatDate } from "../utils/formats";

export default function LandingHeader() {
  const now = new Date();

  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const hour = now.getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={globalStyles.title}>{greeting}, Harvey!</Text>
      <Text style={globalStyles.date}>{`${currentDate}, ${formatDate(new Date())}`}</Text>
    </View>
  );
}
