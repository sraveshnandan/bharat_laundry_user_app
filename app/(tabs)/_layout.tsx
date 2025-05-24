import FloatingTabButton from "@/components/ui/customTabButton";
import { Colors } from "@/constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          backgroundColor: "#fff",
          height: 70,
          elevation: 5,
          zIndex: 10,
        },
        tabBarLabelStyle: {
          fontSize: RFValue(12),
          fontWeight: "700",
        },
        
        tabBarActiveTintColor: Colors.Primary,
        tabBarInactiveTintColor: Colors.Grey,
      }}
    >
      <Tabs.Screen
        name="Laundry"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "shirt-sharp" : "shirt-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Temp"
        options={{
          popToTopOnBlur: true,
          tabBarButton: (props) => <FloatingTabButton onPress={() => {}} />,
        }}
      />

      <Tabs.Screen
        name="Booking"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6 name="clock-rotate-left" size={size} color={color} />
          ),
          tabBarItemStyle: {
            width: "30%",
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
