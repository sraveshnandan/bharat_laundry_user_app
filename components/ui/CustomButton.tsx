import { Colors } from "@/constants/Colors";
import React, { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const CustomButton: FC<
  {
    title: string;
    loading?: boolean;
    onPressAction: (data?: any) => void;
  } & TouchableOpacityProps
> = ({ title, loading, onPressAction, ...prop }) => {
  const bg = loading ? Colors.BackGround : Colors.Primary;
  return (
    <TouchableOpacity
      disabled={loading}
      {...prop}
      onPress={onPressAction}
      style={[styles.btn, { backgroundColor: bg }]}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={Colors.White} size={"small"} />
          <Text style={[styles.btnText]}>loading...</Text>
        </View>
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.Ascent1,
    elevation: 1.2,
    shadowOpacity: 0.8,
    shadowRadius: 12,
    borderRadius: 8,
    paddingVertical: RFValue(8),
  },
  btnText: {
    color: Colors.White,
    fontFamily: "Urbanist",
    fontWeight: "600",
    fontSize: RFValue(20),
    letterSpacing: 1.2,
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    opacity: 0.9,
  },
});
