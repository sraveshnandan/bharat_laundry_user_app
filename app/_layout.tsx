import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // loading the fonts
  const [loaded] = useFonts({
    Inter: require("@/assets/fonts/Inter.ttf"),
  });

  // checking for font load
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // condition for font loading

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
        statusBarAnimation: "slide",
        statusBarStyle: "dark",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          navigationBarHidden: true,
        }}
      />
      <Stack.Screen name="(auth)" />
      <Stack.Screen
        name="(tabs)"
        options={{ statusBarBackgroundColor: Colors.Ascent1 }}
      />
      <Stack.Screen name="(screens)" />
    </Stack>
  );
}
