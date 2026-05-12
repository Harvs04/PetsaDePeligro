import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack, useFocusEffect } from "expo-router";
import { TRANSACTION_ACTIONS } from "@/app/utils/constants"; 
import { colors, globalStyles } from "@/app/styles/global"; 
import HeaderText from "@/app/components/Header";
import CreateForm from "@/app/components/CreateForm";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  type: string;
  setTransactionType: (action: string) => void;
}

export default function CreateTransactionForm({ type, setTransactionType }: Props) {

  return (
    <View>
      <HeaderText style={{ marginBottom: 15 }}>Create Transaction</HeaderText>
      <View style={styles.buttonGroup}>
        {TRANSACTION_ACTIONS.map((action, index) => {
          const isSelected = type === action.value;
          const isFirst = index === 0;
          const isLast = index === TRANSACTION_ACTIONS.length - 1;

          return (
            <TouchableOpacity
              key={action.value}
              activeOpacity={0.7}
              onPress={() => setTransactionType(action.value)}
              style={[
                styles.button,
                isFirst && styles.firstButton,
                isLast && styles.lastButton,
                isSelected && styles.selectedButton,
              ]}
            >
              <View
                style={[globalStyles.row, { gap: 4, alignItems: "center" }]}
              >
                <Ionicons
                  name={action.icon as any}
                  size={14}
                  color={colors.pressableIcon}
                />
                <Text
                  style={[styles.label, isSelected && styles.selectedLabel]}
                >
                  {action.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <CreateForm type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    overflow: "hidden",
    alignSelf: "stretch",
    backgroundColor: "#f8fafc",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.textSecondary,
  },
  firstButton: {
    borderLeftWidth: 0,
  },
  lastButton: {
    borderRightWidth: 0,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  selectedLabel: {
    color: colors.text,
    fontWeight: "600",
  },
});
