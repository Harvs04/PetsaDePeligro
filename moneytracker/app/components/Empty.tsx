import { View, Text, StyleSheet } from "react-native";
import { colors, globalStyles } from "../styles/global";
import { Link } from "expo-router";

export function EmptyPage() {
  return (
    <View
      style={
        ([globalStyles.card,
        {
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 100,
        }])
      }
    >
      <Text
        style={[
          globalStyles.sectionTitle,
          { color: colors.textSecondary, fontSize: 16 },
        ]}
      >
        Nothing to show here.{" "}
        <Link
          href="../(tabs)/add-record"
          style={{ textDecorationLine: "underline" }}
        >
          Create one!
        </Link>
      </Text>
    </View>
  );
}