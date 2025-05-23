import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

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
      <Stack.Screen
        name="emailVerification"
        options={{
          headerShown: true,
          headerTitle: "Verify Email address",
        }}
      />
      <Stack.Screen
        name="profileDetails"
        options={{
          headerShown: true,
          headerTitle: "Personal Details",
        }}
      />

      <Stack.Screen
        name="AddressScreen"
        options={{
          headerShown: true,
          headerTitle: "Confirm Delivery Address",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
