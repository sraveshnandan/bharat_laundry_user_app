import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarBackgroundColor: Colors.BG,
      }}
    >
      <Stack.Screen name="Profile" />
      <Stack.Screen name="EditProfile" />
    </Stack>
  );
};

export default AuthLayout;
