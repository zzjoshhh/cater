import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
      setReady(true);
    };
    load();
  }, []);

  if (!ready) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3B141C",
      }}>
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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(screens)/package" />
      <Stack.Screen name="(screens)/occasion" />
      <Stack.Screen name="(screens)/reservation" /> 
    </Stack>
  );
}
