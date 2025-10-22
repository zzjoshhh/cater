import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="HomeScreen" options={{ tabBarIcon: ({ color,size }) => (
                <Ionicons name="log-in-outline" size={22} color="#fff"/>
            ),
            }}
            />
            <Tabs.Screen name="MessageScreen" options={{ tabBarIcon: ({ color,size }) => (
                <Ionicons name="person-add-outline" size={22} color="#fff" />
            ),
            }}
            />
            <Tabs.Screen name="PackagesScreen" />
            <Tabs.Screen name="ReservationScreen" />
        </Tabs>
    );
}