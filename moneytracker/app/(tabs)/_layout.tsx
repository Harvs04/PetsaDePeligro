import { colors } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

export default function TabLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay + Sub Buttons */}
      {open && (
        <>
          <Pressable style={styles.overlay} onPress={() => setOpen(false)} />
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.subButton}
              onPress={() => {
                router.push({
                  pathname: `/(tabs)/add-record`,
                  params: { type: "", isAccount: "true" },
                });
                setOpen(false);
              }}
            >
              <Ionicons name="wallet-outline" size={20} color="#fff" />
              <Text style={styles.subButtonText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subButton}
              onPress={() => {
                router.push({
                  pathname: `/(tabs)/add-record`,
                  params: { type: "INCOME", isAccount: "false" },
                });
                setOpen(false);
              }}
            >
              <Ionicons name="receipt-outline" size={20} color="#fff" />
              <Text style={styles.subButtonText}>Transaction</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.surface,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Accounts",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add-record"
          options={{
            title: "",
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.tabButtonWrapper}
                activeOpacity={0.9}
                onPress={() => setOpen((prev) => !prev)}
              >
                <View style={styles.addButton}>
                  <Ionicons name="add" size={32} color="#fff" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "stats-chart" : "stats-chart-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  menuContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 90,
    alignSelf: "center",
    alignItems: "center",
    gap: 12,
    zIndex: 20,
  },
  subButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  subButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  tabButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    top: -10,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
