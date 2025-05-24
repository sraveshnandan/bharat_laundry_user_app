import { Stack } from "expo-router";
import React from "react";

const BookingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarAnimation: "slide",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default BookingLayout;
