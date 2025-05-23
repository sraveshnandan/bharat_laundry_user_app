import { Colors } from "@/constants/Colors";
import { hp } from "@/constants/Scaling";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";

const MainScreen = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const translateY = useSharedValue(400);
  useEffect(() => {
    setTimeout(() => {
      translateY.value = withTiming(0, { duration: 1500 });
    }, 800);

    setTimeout(() => {
      return router.replace("/(auth)");
    }, 3000);
  }, []);

  const animatedFooterStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bharat Laundry</Text>

      {/* Footer */}
      <Animated.View style={[styles.footerContainer1, animatedFooterStyle]}>
        <Text style={styles.footerText1}>Stay Fresh Stay Clean</Text>

        <View style={styles.footerContainer}>
          <View style={styles.line}></View>
          <Text style={styles.footerText2}>India</Text>
          <View style={styles.line}></View>
        </View>
      </Animated.View>

      {/* <View style={styles.copyContainer}>
        <Text style={styles.copyText}>Powered by Xecurecode Technologies</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary,
  },
  text: {
    color: Colors.White,
    fontSize: RFValue(36),
    fontWeight: "700",
    fontFamily: "Urbanist",
    fontStyle: "italic",
  },
  footerText1: {
    color: Colors.White,
    fontWeight: "800",
    fontSize: RFValue(18),
    fontFamily: "Urbanist",
    opacity: 0.7,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  footerText2: {
    color: Colors.White,
    opacity: 0.7,
    fontFamily: "Urbanist",
    fontWeight: "700",
  },
  line: {
    height: 2,
    backgroundColor: Colors.White,
    width: "7%",
  },
  footerContainer1: {
    alignItems: "center",
    marginTop: 4,
  },
  copyText: {
    opacity: 0.7,
    color: Colors.White,
    fontSize: RFValue(16),
  },
  copyContainer: {
    position: "absolute",
    bottom: hp * 0.02,
    opacity: 0.6,
  },
});

export default MainScreen;
