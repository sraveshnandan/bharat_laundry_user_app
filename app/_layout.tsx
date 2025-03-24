import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="MapScreen" options={{}} />
      </Stack>
    </SafeAreaProvider>
  );
}
