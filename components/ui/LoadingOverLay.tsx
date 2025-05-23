import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type LoadingOverlayProps = {
  visible: boolean;
  message?: string;
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = "Verifying OTP...",
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={Colors.Primary} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBox: {
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
    flexDirection: "row",
    gap: RFValue(15),
    padding: RFValue(20),
  },
  message: {
    fontSize: RFValue(16),
    color: Colors.Grey,
    fontWeight: "600",
  },
});
