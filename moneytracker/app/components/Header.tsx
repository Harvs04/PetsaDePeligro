import { Text, View, ViewStyle } from "react-native";
import { globalStyles } from "../styles/global";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function HeaderText({ children, style }: Props) {
  return (
    <View style={style}>
      <Text style={globalStyles.title}>{children}</Text>
    </View>
  );
}