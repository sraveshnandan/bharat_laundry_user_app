import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  placeholderList: string[];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  onLeftPress?: () => void;
  style?: object;
  inputStyle?: object;
  iconContainerStyle?: object;
  onFocus?: () => void;
}

export default function AnimatedSearchBar({
  placeholderList,
  leftIcon,
  rightIcon,
  onRightPress,
  onLeftPress,
  style,
  inputStyle,
  iconContainerStyle,
  onFocus,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(translateY, {
        toValue: -RFValue(20),
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        translateY.setValue(RFValue(20));
        setCurrentIndex((prev) => (prev + 1) % placeholderList.length);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholderList.length]);

  return (
    <View style={[styles.container, style]}>
      {leftIcon && (
        <TouchableOpacity
          onPress={onLeftPress}
          style={[styles.iconContainer, iconContainerStyle]}
        >
          {leftIcon}
        </TouchableOpacity>
      )}

      <View style={styles.inputWrapper}>
        <Animated.Text
          onPress={onFocus}
          numberOfLines={1}
          style={[styles.placeholderText, { transform: [{ translateY }] }]}
        >
          Search "{placeholderList[currentIndex]}"
        </Animated.Text>
        {/* <TextInput
          onFocus={onFocus}
          style={[styles.input, inputStyle]}
          placeholder=" "
          placeholderTextColor="#999"
        /> */}
      </View>

      {rightIcon && (
        <TouchableOpacity
          onPress={onRightPress}
          style={[
            styles.iconContainer,
            iconContainerStyle,
            { flexDirection: "row" },
          ]}
        >
          <View style={styles.separator} />
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 10,
    height: RFValue(50),
    elevation: 2,
  },
  iconContainer: {
    padding: 8,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    overflow: "hidden",
    height: RFValue(20),
  },
  placeholderText: {
    position: "absolute",
    color: "#999",
    left: 0,
    fontSize: RFValue(14),
    flex:1
  },
  input: {
    fontSize: RFValue(14),
    color: "#000",
    paddingVertical: 0,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    width: 1,
    height: RFValue(20),
    backgroundColor: "#999",
    marginHorizontal: 8,
  },
});
