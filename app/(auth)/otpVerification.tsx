import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const OTPVerificationScreen = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [phone, setPhone] = useState(params?.phone);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.replace(`/(auth)`)}>
          <Text style={styles.title}>Skip</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>We have sent a verification code to</Text>
        <Text style={styles.title}>+91 {phone}</Text>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: RFPercentage(8),
  },
  title: {
    fontSize: RFValue(16),
    color: Colors.Text,
    fontWeight: "700",
    opacity: 0.7,
    textAlign: "center",
  },
});
