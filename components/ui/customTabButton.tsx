import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function FloatingTabButton({
  onPress,
}: {
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // Animate scale + rotation in parallel
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: rotateAnim.__getValue() + 360,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();

    onPress(); // Trigger the parent action
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.button}>
          <Animated.Image
            style={[
              styles.btnImage,
              { transform: [{ rotate: rotateInterpolate }] },
            ]}
            source={require("@/assets/images/icon.png")}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: RFValue(65),
    height: RFValue(65),
    borderRadius: 100,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btnImage: {
    width: "100%",
    height: "100%",
    borderRadius: 32.5,
    resizeMode: "contain",
  },
});
