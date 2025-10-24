import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function OccasionScreen() {
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

  const occasions: string[] = [
    "Kiddie Party",
    "Christening",
    "Adult Birthday",
    "Debut",
    "Wedding",
    "Corporate Gathering",
    "House Blessing",
  ];

  const handleSelect = (occasion: string) => {
    if (selectedOccasions.includes(occasion)) {
      setSelectedOccasions(selectedOccasions.filter((o) => o !== occasion));
    } else {
      setSelectedOccasions([...selectedOccasions, occasion]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <MaterialCommunityIcons name="calendar-check" size={22} color="#FFB200" />
        <Text style={styles.occasionTitle}>Occasion</Text>
      </View>

      <LinearGradient
        colors={["#FF9A3C", "#FF6F61", "#A1374C", "#3B141C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gridContainer}
      >
        <Text style={styles.cardTitle}>
          Choose the Occasion You Want to Celebrate with Us!
        </Text>

        <View style={styles.grid}>
          {occasions.map((occasion, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.occasionCard,
                selectedOccasions.includes(occasion) && styles.selectedCard,
              ]}
              onPress={() => handleSelect(occasion)}
            >
              <LinearGradient
                colors={
                  selectedOccasions.includes(occasion)
                    ? ["#fff", "#A1374C"]
                    : ["#A1374C", "#A1374C"]
                }
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0}}
                style={styles.gradientBackground}
              />
              <Text
                style={[
                  styles.occasionText,
                  selectedOccasions.includes(occasion) && styles.selectedText,
                ]}
              >
                {occasion}
              </Text>
              {selectedOccasions.includes(occasion) && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={18}
                  color="green"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B141C",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 8,
  },
  occasionTitle: {
    color: "#FFB200",
    fontWeight: "bold",
    fontSize: 20,
  },
  gridContainer: {
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  occasionCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 14,
    paddingVertical: 20,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  selectedCard: {
    borderColor: "#FFD580",
    shadowColor: "#FFD580",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  occasionText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    textAlign: "center",
  },
  selectedText: {
    color: "#000",
    fontWeight: "bold",
  },
  checkIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  nextButton: {
    marginTop: 80,
    backgroundColor: "#DA8D00",
    padding: 12,
    width: 130,
    borderRadius: 16,
    alignSelf: "flex-end",
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});