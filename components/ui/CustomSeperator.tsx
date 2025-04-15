import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/constants/Colors";
import { hairLineWidth } from "@/constants/Scaling";

const CustomSeparator: FC<{ title: string }> = ({ title = "or" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.line}></View>
    </View>
  );
};

export default CustomSeparator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",

    justifyContent: "center",
    gap: RFValue(4),
  },
  line: {
    height: hairLineWidth,
    flexGrow: 1,
    backgroundColor: Colors.Grey,
  },
  text: {
    fontFamily: "Urbanist",
    fontSize: RFValue(14),
    fontWeight: "700",
    opacity: 0.7,
  },
});
