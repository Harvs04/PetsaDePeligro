import { addTransaction } from "../storage/transaction";
import { colors, globalStyles } from "../styles/global";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CURRENCIES } from "../utils/constants";
import { Picker } from "@react-native-picker/picker";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

type Props = {
  type: string;
};

export default function CreateForm({ type }: Props) {
  const [selectedItem, setSelectedItem] = useState("Select an account");
  const [name, setName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  // useFocusEffect(
  //   useCallback(() => {
  //     setSelectedItem("Select an account");
  //   }, []),
  // );

  // const handleAddTransaction = async () => {
  //   if (!name || !amount || !category || !source) {
  //     Alert.alert("Error", "You are missing a required field!");
  //     return;
  //   }

  //   await addTransaction({
  //     name,
  //     transactionType,
  //     amount,
  //     category,
  //     source,
  //   });

  //   setName("");
  //   setTransactionType("");
  //   setAmount(0);
  //   setCategory("");
  //   setSource("");

  //   Alert.alert("Success", "Transaction created!");

  //   router.push("/");
  // };

  return (
    <View style={{ marginVertical: 20 }}>
      <TextInput
        style={styles.amountInput}
        caretHidden={true}
        placeholder={`${CURRENCIES[0]} 0`}
        placeholderTextColor={colors.textSecondary}
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={(text) => {
          if (/^\d*\.?\d*$/.test(text)) {
            setAmount(text);
          }
        }}
      />

      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue) => setSelectedItem(itemValue)}
        dropdownIconColor={colors.textSecondary}
        mode="dropdown"
        style={{
          color: colors.textSecondary,
          borderWidth: 2,
          borderColor: colors.surface,
          height: 60,
          marginVertical: -15,
        }}
      >
        <Picker.Item label="Select an account" value="" enabled={false} />
        <Picker.Item label="Maribank" value="MARIBANK" />
        <Picker.Item label="Landbank" value="LANDBANK" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Transaction name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="transactionType"
        placeholderTextColor={colors.textSecondary}
        value={transactionType}
        onChangeText={setTransactionType}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Category"
          placeholderTextColor={colors.textSecondary}
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Source"
          placeholderTextColor={colors.textSecondary}
          value={source}
          onChangeText={setSource}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Amount"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={amount.toString()}
          onChangeText={(text) => setAmount(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {} /*handleAddTransaction*/}
      >
        <Text style={styles.buttonText}>Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  amountInput: {
    fontSize: 64,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    width: "100%",
    borderWidth: 0,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
