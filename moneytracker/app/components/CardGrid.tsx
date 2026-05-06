import { StyleSheet, View } from "react-native";
import Card from "./Cards";
import NetWorthCard from "./NetWorthCard";
import { useCallback, useState } from "react";

export default function CardGrid() {
  const [showBalance, setShowBalance] = useState(true)

  const onPress = useCallback(() => {
    setShowBalance((prev) => !prev)
  }, [showBalance])

  return (
    <>
      <NetWorthCard balance={57485} showBalance={showBalance} onPress={onPress} />
      <View style={styles.grid}>
        <Card
          walletName="Ipon ni Harvs"
          balance={10000}
          source="Cash"
          category="Savings"
          showBalance={showBalance} 
        />
        <Card
          walletName="Pang Gastos"
          balance={2000}
          source="GCash"
          category="Wallet"
          showBalance={showBalance} 
        />
        <Card
          walletName="Ipon from Sahod"
          balance={4500}
          source="Maribank"
          category="Savings"
          showBalance={showBalance} 
        />
        <Card
          walletName="DOST Stipend"
          balance={1250}
          source="Landbank"
          category="Wallet"
          showBalance={showBalance} 
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
