import { Colors } from "@/constants/Colors";
import { hairLineWidth } from "@/constants/Scaling";
import React, { FC } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const CustomSeparator: FC<{ title: string; titleStyle?: TextStyle }> = ({
  title = "or",
  titleStyle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={[styles.text, titleStyle]}>{title}</Text>
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
