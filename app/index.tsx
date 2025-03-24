import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

const MainScreen = () => {
  return (
    <View>
      <Text onPress={() => router.navigate(`/test`)}>MainScreen</Text>
    </View>
  );
};

export default MainScreen;
