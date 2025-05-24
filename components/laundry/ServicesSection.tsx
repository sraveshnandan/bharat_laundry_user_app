import { Colors } from "@/constants/Colors";
import { DummyServices } from "@/constants/Data";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomSeparator from "../ui/CustomSeperator";
import ServiceSection from "../ui/ServicesSlider";

const ServicesSection = () => {
  return (
    <View style={styles.container}>
      <CustomSeparator
        titleStyle={styles.separatorStyle}
        title="WHAT'S ON YOUR MIND ?"
      />

      <View>
        <ServiceSection services={DummyServices.slice(4, 8).reverse()} />
        <ServiceSection services={DummyServices.slice(0, 4).reverse()} />
      </View>
    </View>
  );
};

export default ServicesSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFPercentage(3),
    marginBottom: RFPercentage(15),
  },
  separatorStyle: {
    color: Colors.Grey,
  },
});
