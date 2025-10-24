import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

export default function NotificationScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.topBar}>
                <Text style={styles.titleText}>Notifications</Text>
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