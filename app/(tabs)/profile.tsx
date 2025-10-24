import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.topBar}>
                <Text style={styles.titleText}>Profile</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        alignItems: "center",
        paddingVertical: 40,
    },
    titleText: {
        fontWeight: "bold",
        color: "#FFB200",
        fontSize: 20,
    },
})