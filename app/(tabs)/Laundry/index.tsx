import BannerSection from "@/components/laundry/BannerSection";
import HomeHeader from "@/components/laundry/HomeHeader";
import ServicesSection from "@/components/laundry/ServicesSection";
import { Colors } from "@/constants/Colors";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MainHomeScreen = () => {
  useLayoutEffect(() => {
    setStatusBarBackgroundColor(Colors.Ascent1);
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <HomeHeader />
        <BannerSection />
        <ServicesSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainHomeScreen;

const styles = StyleSheet.create({});
