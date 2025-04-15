import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Text, TouchableOpacity } from "react-native";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          statusBarBackgroundColor: Colors.Primary,
          statusBarStyle: "inverted",
        }}
      />
      <Stack.Screen
        name="otpVerification"
        options={{
          headerShown: true,
          headerTitle: "OTP Verification",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
