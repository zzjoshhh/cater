import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import packages from "../data/data1.json"; // JSON data

// Define the structure of a package item
interface Package {
  name: string;
  prices: string[];
}

export default function PackagesScreen() {
  const renderPackage = ({ item }: { item: Package }) => (
    <View style={styles.packageCard}>
      <Text style={styles.packageCategoryTitle}>{item.name}</Text>
      <View style={styles.divider} />
      {item.prices.map((price, i) => (
        <Text key={i} style={styles.packagePriceText}>
          {price}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.topBar}>
        <Text style={styles.packagesTitle}>Packages & Price List</Text>
      </View>

      <View style={styles.scrollWrapper}>
        <FlatList
          data={packages}
          renderItem={renderPackage}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B141C",
  },
  topBar: {
    paddingVertical: 40,
    alignItems: "center",
  },
  packagesTitle: {
    color: "#FFB200",
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
  packageCard: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 8,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageCategoryTitle: {
    color: "#4a0d0d",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  divider: {
    height: 2,
    backgroundColor: "#FFB200",
    marginVertical: 8,
    width: "40%",
    alignSelf: "center",
    borderRadius: 2,
  },
  packagePriceText: {
    color: "#4a0d0d",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 2,
  },
});
