import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors, globalStyles } from "@/app/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { ACCOUNT_TYPES, COLORS, CURRENCIES } from "@/app/utils/constants";

export default function CreateAccountScreen() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("PHP");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const chosen = ACCOUNT_TYPES.find((t) => t.id === selectedType);

  return (
    <View>
      {/* HEADER */}
      <View style={{ gap: 20, marginBottom: 10 }}>
        <View style={[styles.header]}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.title}>
              {step === 1 ? "Create Account" : "Account Details"}
            </Text>

            <Text style={[globalStyles.label]}>
              {step === 1
                ? "Choose account type"
                : `Setting Up ${chosen?.label} Account`}
            </Text>
          </View>

          <View style={styles.stepPill}>
            <Text style={{ color: colors.textSecondary }}>{step}</Text>
            <Text style={{ color: colors.textSecondary }}>/2</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <View style={styles.content}>
            <View style={styles.grid}>
              {ACCOUNT_TYPES.map((type) => {
                const active = selectedType === type.id;

                return (
                  <TouchableOpacity
                    key={type.id}
                    onPress={() => setSelectedType(type.id)}
                    style={[
                      styles.card,
                      {
                        backgroundColor: active
                          ? colors.primary
                          : colors.surface,
                        borderColor: active ? colors.primary : colors.header,
                        opacity: active ? 0.85 : 1,
                        gap: 2,
                      },
                    ]}
                  >
                    <Ionicons
                      name={type.icon as any}
                      size={24}
                      style={{ color: colors.pressableIcon }}
                    />

                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                      {type.label}
                    </Text>

                    <Text style={[styles.cardDesc, { color: colors.text }]}>
                      {type.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              disabled={!selectedType}
              onPress={() => setStep(2)}
              style={[
                styles.button,
                {
                  backgroundColor: selectedType ? colors.primary : colors.primary + "50",
                  marginTop: 15,
                },
              ]}
              
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: selectedType ? colors.text : "#aaa",
                  },
                ]}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <View style={styles.content}>
            <View
              style={[
                styles.badge,
              ]}
            >
              <Ionicons
                name={chosen?.icon as any}
                size={16}
                color={colors.primary}
              />

              <Text
                style={{
                  color: colors.primary,
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {chosen?.label}
              </Text>
            </View>

            <Text style={styles.sectionLabel}>Account Name</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. BDO Savings"
              placeholderTextColor={colors.textSecondary}
              value={accountName}
              onChangeText={setAccountName}
            />

            <Text style={styles.sectionLabel}>Initial Balance</Text>

            <View style={styles.row}>
              <View style={styles.currencyPicker}>
                <Picker
                  selectedValue={currency}
                  onValueChange={(v) => setCurrency(v)}
                  style={{ color: colors.textSecondary }}
                  dropdownIconColor={colors.textSecondary}
                >
                  {CURRENCIES.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                </Picker>
              </View>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholderTextColor={colors.textSecondary}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={balance}
                onChangeText={(text) => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    setBalance(text);
                  }
                }}
              />
            </View>

            <Text style={styles.sectionLabel}>Card Color</Text>

            <View style={styles.colorRow}>
              {COLORS.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setSelectedColor(c)}
                  style={[
                    styles.colorDot,
                    {
                      backgroundColor: c,
                      borderColor:
                        selectedColor === c ? colors.text : colors.surface,
                    },
                  ]}
                />
              ))}
            </View>

            {/* PREVIEW CARD */}
            <View
              style={[styles.previewCard, { backgroundColor: selectedColor }]}
            >
              <View style={styles.previewTop}>
                <View>
                  <Text style={styles.previewLabel}>{chosen?.label}</Text>

                  <Text style={styles.previewName}>
                    {accountName || "Account Name"}
                  </Text>
                </View>

                <Ionicons name={chosen?.icon as any} size={28} color={colors.pressableIcon} />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.previewBalanceLabel}>Balance</Text>

                <Text style={styles.previewBalance}>
                  {currency}{" "}
                  {parseFloat(balance || "0").toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 15, width: '100%' }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#F5F5FA", width: '48%', }]}
                onPress={() => setStep(1)}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, { color: "#1A1A2E" }]}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: '48%',
                    backgroundColor: accountName.trim()
                      ? colors.primary
                      : colors.primary + "50",
                  },
                ]}
                onPress={() => {}}
                disabled={!accountName.trim()}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: accountName.trim() ? "#fff" : "#aaa",
                    },
                  ]}
                >
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  stepPill: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  content: {
    marginVertical: 10,
  },
  sectionLabel: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    textTransform: "capitalize",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    position: "relative",
    backgroundColor: colors.surface,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  cardDesc: {
    marginTop: 2,
    fontSize: 11,
    color: "#aaa",
    lineHeight: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.badge.background,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.header,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  currencyPicker: {
    width: 100,
    backgroundColor: colors.surface,
    borderColor: colors.header,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: "center",
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 3,
  },
  previewCard: {
    marginTop: 20,
    borderRadius: 22,
    padding: 22,
  },
  previewTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    textTransform: "uppercase",
  },
  previewName: {
    marginTop: 2,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  previewBalanceLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
  },
  previewBalance: {
    marginTop: 2,
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
});
