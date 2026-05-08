import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";

type Props = {
  children: React.ReactNode;
};

export default function HeaderText({ children }: Props) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={globalStyles.title}>{children}</Text>
    </View>
  );
}