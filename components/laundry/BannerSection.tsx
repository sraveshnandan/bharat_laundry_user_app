import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import AutoScrollBannerSlider from "../ui/AppBanner";
import { AppBannerData } from "@/constants/Data";

const BannerSection = () => {
  return (
    <View style={styles.container}>
      <AutoScrollBannerSlider data={AppBannerData}/>
    </View>
  );
};

export default BannerSection;

const styles = StyleSheet.create({
  container: {
    padding: RFPercentage(3),
  },
});
