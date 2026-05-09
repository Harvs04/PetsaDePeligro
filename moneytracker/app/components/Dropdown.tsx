import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";
import { colors } from "../styles/global";

type Data = {
  label: string;
  value: string;
};

type Props = {
  selectedItem: string | null;
  setSelectedItem: (value: string | null) => void;
  data: Data[];
};

export function Dropdown({ selectedItem, setSelectedItem, data }: Props) {
  return (
    <View
      style={{
        width: 150,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.surface,
        overflow: "hidden",
        justifyContent: "center",
        paddingHorizontal: 4,
      }}
    >
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
        <Picker.Item label="All" value="ALL" />
        {data.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}
