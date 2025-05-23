import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // loading the fonts
  const [loaded] = useFonts({
    Urbanist: require("@/assets/fonts/Urbanist.ttf"),
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
        statusBarBackgroundColor: Colors.Primary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          navigationBarHidden: true,
        }}
      />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
