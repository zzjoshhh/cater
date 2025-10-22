import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Simulate loading time (e.g., fetching user/session data)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
      setReady(true);
    };
    load();
  }, []);

  // 🔹 Show splash screen while loading
  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#3B141C",
        }}
      >
        <Image
          source={require("../assets/images/splash-iconic.png")}
          style={{
            width: 220,
            height: 237,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  }

  // 🔹 When ready, render your main navigation
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide headers globally
        tabBarStyle: { display: "none" }, // Hide tab bar globally
      }}
    >
      {/* If you still want stack-based navigation, use this instead: */}
      {/* <Stack screenOptions={{ headerShown: false }} /> */}
    </Tabs>
  );
}
