import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="Booking"
        options={{
          tabBarIcon: () => (
            <Ionicons name="book-outline" size={28} color={"red"} />
          ),
          tabBarIconStyle: {
            backgroundColor: "rgba(0,0,0,0.4)",
            width: 60,
            height: 60,
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
