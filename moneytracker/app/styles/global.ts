import { StyleSheet } from "react-native";

export const colors = {
  background: "#1a1a2e",
  header: "#242444",
  surface: "#16213e",
  primary: "#3b82f6",
  text: "#ffffff",
  textSecondary: "#a0a0b0",
  alert: "#ff5252",
  pressableIcon: "#fff",
  income: "#4ade80",
  expense: "#ef4444",
  badge: {
    border: "#3b82f6",
    background: "#1e3a5f"
  }
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4
  },
  label: {
    fontSize: 14,
    color: "#a0a0b0",
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});
