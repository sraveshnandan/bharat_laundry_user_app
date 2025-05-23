import { Colors } from "@/constants/Colors";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const BookingScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor={Colors.Ascent1} />
      <Text>BookingScreen</Text>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
