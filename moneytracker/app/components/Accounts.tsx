import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { colors, globalStyles } from "../styles/global";
import Card from "./Cards";
import { categories } from "../utils/constants";
import { Dropdown } from "./Dropdown";
import { AccountContext } from "../contexts/account";
import { EmptyPage } from "./Empty";

type Account = {
  id: number;
  name: string;
  balance: number;
  category: string;
  source: string;
};

type Props = {
  preview: boolean;
  showBalance: boolean;
  accounts: Account[];
};

export default function Accounts({ preview, showBalance, accounts }: Props) {
  const context = useContext(AccountContext);
  const selectAccountCategory = preview
    ? null
    : (context?.selectAccountCategory ?? null);
  const handleSelect = preview
    ? () => {}
    : (context?.handleSelect ?? (() => {}));

  return (
    <View>
      <View
        style={[globalStyles.row, { marginBottom: 10, marginHorizontal: 2 }]}
      >
        <Text style={[globalStyles.sectionTitle]}>
          {preview ? "Your Accounts" : ""}
        </Text>
        {preview ? (
          <Link href="/accounts">
            <Text
              style={{
                color: colors.textSecondary,
                marginRight: 2,
                textDecorationLine: "underline",
              }}
            >
              View All
            </Text>
          </Link>
        ) : (
          <Dropdown
            selectedItem={selectAccountCategory}
            setSelectedItem={handleSelect}
            data={categories}
          />
        )}
      </View>

      <View style={[styles.grid, { marginBottom: 10 }]}>
        {accounts.length > 0 ? (
          accounts.slice(0, !preview ? accounts.length : 4).map((account) => (
            <TouchableOpacity
              key={account.id}
              activeOpacity={0.5}
              style={{ width: "48%" }}
            >
              <Card
                id={account.id}
                name={account.name}
                balance={account.balance}
                source={account.source}
                category={account.category}
                showBalance={showBalance}
              />
            </TouchableOpacity>
          ))
        ) : (
          <EmptyPage />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
